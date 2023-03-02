import BN from 'bn.js';
import { mbjs } from '../config/config';
import { DEPOSIT_CONSTANTS, GAS, YOCTO_PER_BYTE, MINTING_FEE } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { MintArgs, MintArgsResponse, NearContractCall, TokenMetadata, TOKEN_METHOD_NAMES, Splits } from '../types';

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const mint = (
  args: MintArgs,
): NearContractCall<MintArgsResponse> => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    metadata,
    ownerId,
    royalties,
    amount = 1,
    tokenIdsToMint,
    noMedia = false,
    noReference = false,
  } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  // Reference and media need to be present or explicitly opted out of
  if (!noReference && !metadata.reference) {
    throw new Error(ERROR_MESSAGES.NO_REFERENCE);
  }
  if (!noMedia && !metadata.media) {
    throw new Error(ERROR_MESSAGES.NO_MEDIA);
  }

  let adjustedRoyalties: Splits;
  let royaltyTotal: number;
  let roundedRoyalties: Splits;

  //royalties adjustments to make devx better
  if (royalties) {
    royaltyTotal = getRoyaltyTotal(royalties);
    adjustedRoyalties = adjustRoyaltiesForContract(royalties, royaltyTotal);
    roundedRoyalties = roundRoyalties(adjustedRoyalties);
  }

  //if royalties exist they need to be populated
  if (royalties && Object.keys(royalties).length < 1) {
    throw new Error(ERROR_MESSAGES.MIN_ROYALTIES);
  }

  if (amount && amount > 125) {
    throw  new Error(ERROR_MESSAGES.MAX_AMOUT);
  }

  //if specifying tokenIdsToMint these must be populated
  if (tokenIdsToMint && tokenIdsToMint.length == 0) {
    throw  new Error(ERROR_MESSAGES.EMPTY_TOKEN_IDS);
  }

  if (tokenIdsToMint && tokenIdsToMint.length > 0 && amount > 1) {
    console.warn('When defining tokenIdsToMint defining amount is not necessary as it will be defined by the array len');
  }

  const adjustedTokenCount = tokenIdsToMint?.length > amount? tokenIdsToMint.length : amount;

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      owner_id: ownerId,
      metadata: metadata,
      num_to_mint: adjustedTokenCount,
      // 10_000 = 100% (see above note)
      royalty_args: royaltyTotal < 0 || !royaltyTotal ? null : { split_between: roundedRoyalties, percentage: Math.floor(royaltyTotal * 10000) },
      token_ids_to_mint: !tokenIdsToMint ? null : tokenIdsToMint,
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: mintingDeposit({
      nTokens: adjustedTokenCount,
      nRoyalties: !royalties ? 0 : Object.keys(royalties).length,
      metadata,
    }),
  };
};

function getRoyaltyTotal(royalties: Record<string, number> ): number {
  let royaltyTotal = 0;
  Object.values(royalties).forEach(value => {
    royaltyTotal += value;
  });

  if (royaltyTotal <= 0 || royaltyTotal > 0.5) {
    throw new Error (ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }
  return royaltyTotal;  
}

function adjustRoyaltiesForContract(royalties: Record<string, number>, royaltyTotal ): Splits {
  let counter = 0;
  const result: Splits = {};
  Object.keys(royalties).forEach(key => {
    if (royalties[key] <= 0) {
      throw new Error (ERROR_MESSAGES.NEGATIVE_ROYALTIES);
    }
    const adjustedAmount = royalties[key]/ royaltyTotal * 10000;
    result[key] = adjustedAmount;
    counter += adjustedAmount;
  });
  if (counter != 10000) {
    throw new Error (ERROR_MESSAGES.SPLITS_PERCENTAGE);
  }
 
  return result;
}

function roundRoyalties(royalties: Record<string, number>): Record<string, number> {
  let roundedCounter = 0;
  const result: Splits = {};
  const firstKey = Object.keys(royalties)[0];
  Object.keys(royalties).forEach((key)=> {
    const roundedVal = Math.round(royalties[key]);
    result[key] = roundedVal;
    roundedCounter += roundedVal;
  });

  if (roundedCounter != 10000) {
    result[firstKey] += 10000 - roundedCounter;
  }
  return result;
}

function mintingDeposit({
  nTokens,
  nRoyalties,
  metadata,
}: {
  nTokens: number;
  nRoyalties: number;
  metadata: TokenMetadata;
}): string {
  const commonDeposit = new BN(DEPOSIT_CONSTANTS.STORE_COMMON);
  const royaltiesDeposit = commonDeposit.mul(new BN(nRoyalties));
  const splitsDeposit = commonDeposit.mul(new BN(nRoyalties));
  const mintingFee = new BN(MINTING_FEE);

  // JSON serialization should give us an estimate that's always higher than
  // borsh serialization
  const metadataDeposit = new BN(YOCTO_PER_BYTE).mul(new BN(JSON.stringify(metadata).length));
  const depositPerToken = new BN(DEPOSIT_CONSTANTS.STORE_TOKEN).add(splitsDeposit);

  const total = commonDeposit
    .add(mintingFee)
    .add(royaltiesDeposit)
    .add(metadataDeposit)
    .add(new BN(nTokens).mul(depositPerToken));
  return total.toString();
}
