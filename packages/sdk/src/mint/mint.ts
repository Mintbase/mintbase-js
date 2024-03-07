import { mbjs } from '../config/config';
import { GAS, STORAGE_BYTES, STORAGE_PRICE_PER_BYTE_EXPONENT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { MintArgsV1, MintArgsV1Response, NearContractCall, TokenMetadata, TOKEN_METHOD_NAMES, Splits } from '../types';
import { isStoreV1 } from '../utils';

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const mint = (
  args: MintArgsV1,
): NearContractCall<MintArgsV1Response> => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    metadata,
    ownerId,
    royalties,
    amount,
    noMedia = false,
    noReference = false,
  } = args;
  
  if (!contractAddress) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (!isStoreV1(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V1);
  }

  // Reference and media need to be present or explicitly opted out of
  if (!noReference && !metadata.reference) {
    throw new Error(ERROR_MESSAGES.NO_REFERENCE);
  }
  if (!noMedia && !metadata.media) {
    throw new Error(ERROR_MESSAGES.NO_MEDIA);
  }

  // FIXME: extracted to utils
  let adjustedRoyalties: Splits;
  let royaltyTotal: number;
  let roundedRoyalties: Splits;

  // royalties adjustments to make devx better
  if (royalties) {
    royaltyTotal = getRoyaltyTotal(royalties);
    adjustedRoyalties = adjustRoyaltiesForContract(royalties, royaltyTotal);
    roundedRoyalties = roundRoyalties(adjustedRoyalties);
  }

  // if royalties exist they need to be populated
  if (royalties && Object.keys(royalties).length < 1) {
    throw new Error(ERROR_MESSAGES.MIN_ROYALTIES);
  }

  // must not have more than 50 royalty owners
  if (royalties && Object.keys(royalties).length > 50) {
    throw new Error(ERROR_MESSAGES.MAX_ROYALTIES);
  }

  const adjustedAmount = amount || 1;

  if (adjustedAmount > 125 || adjustedAmount < 1) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      owner_id: ownerId,
      metadata: metadata,
      num_to_mint: adjustedAmount,
      // 10_000 = 100% (see above note)
      royalty_args: !royaltyTotal ? null : { split_between: roundedRoyalties, percentage: Math.round(royaltyTotal * 10000) },
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: mintingDeposit({
      nSplits: 0,
      nTokens: adjustedAmount,
      nRoyalties: !royalties ? 0 : Object.keys(royalties)?.length,
      metadata,
    }),
  };
};

function getRoyaltyTotal(royalties: Record<string, number>): number {
  let royaltyTotal = 0;
  Object.values(royalties).forEach(value => {
    royaltyTotal += value;
  });

  if (royaltyTotal <= 0 || royaltyTotal > 0.5) {
    throw new Error(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }
  return royaltyTotal;
}

function adjustRoyaltiesForContract(royalties: Record<string, number>, royaltyTotal): Splits {
  let counter = 0;
  const result: Splits = {};
  Object.keys(royalties).forEach(key => {
    if (royalties[key] <= 0) {
      throw new Error(ERROR_MESSAGES.NEGATIVE_ROYALTIES);
    }
    const adjustedAmount = royalties[key] / royaltyTotal * 10000;
    result[key] = adjustedAmount;
    counter += adjustedAmount;
  });
  if (counter != 10000) {
    throw new Error(ERROR_MESSAGES.ROYALTIES_PERCENTAGE);
  }

  return result;
}

function roundRoyalties(royalties: Record<string, number>): Record<string, number> {
  let roundedCounter = 0;
  const result: Splits = {};
  const firstKey = Object.keys(royalties)[0];
  Object.keys(royalties).forEach((key) => {
    const roundedVal = Math.round(royalties[key]);
    result[key] = roundedVal;
    roundedCounter += roundedVal;
  });

  if (roundedCounter != 10000) {
    result[firstKey] += 10000 - roundedCounter;
  }
  return result;
}

export function mintingDeposit({
  nTokens,
  nRoyalties,
  nSplits,
  metadata,
}: {
  nSplits: number;
  nTokens: number;
  nRoyalties: number;
  metadata: TokenMetadata;
}): string {
  const nSplitsAdj = nSplits < 1 ?  0 : nSplits - 1;
  const bytesPerToken = STORAGE_BYTES.TOKEN_BASE + nSplitsAdj * STORAGE_BYTES.COMMON + STORAGE_BYTES.COMMON;
  const metadataBytesEstimate = JSON.stringify(metadata).length;

  const totalBytes = STORAGE_BYTES.MINTING_BASE +
    STORAGE_BYTES.MINTING_FEE +
    metadataBytesEstimate +
    bytesPerToken * nTokens +
    STORAGE_BYTES.COMMON * nRoyalties;

  return `${Math.ceil(totalBytes)}${'0'.repeat(STORAGE_PRICE_PER_BYTE_EXPONENT)}`;
}
