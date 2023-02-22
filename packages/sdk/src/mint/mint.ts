import BN from 'bn.js';
import { mbjs } from '../config/config';
import { DEPOSIT_CONSTANTS, GAS, YOCTO_PER_BYTE, MINTING_FEE } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { MintArgs, MintOptions, MintArgsResponse, NearContractCall, TokenMetadata, TOKEN_METHOD_NAMES } from '../types';

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
    options = {},
    noMedia = false,
    noReference = false,
    tokenIdsToMint,
  } = args;

  const {
    splits,
    amount,
    royaltyPercentage,
    royalties,
    nRoyalties,
    nSplits,
  } = processOptions(options);

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

  if (amount && amount > 125) {
    throw  new Error(ERROR_MESSAGES.MAX_AMOUT);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      owner_id: ownerId,
      metadata: metadata,
      num_to_mint: amount || 1,
      // 10_000 = 100% (see above note)
      royalty_args: royalties
        ? { split_between: royalties, percentage: royaltyPercentage * 100 }
        : null,
      split_owners: splits || null,
      token_ids_to_mint: tokenIdsToMint,
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: mintingDeposit({
      nTokens: amount,
      nRoyalties,
      nSplits,
      metadata,
    }),
  };
};

function processOptions(options: MintOptions) {
  let { splits, amount, royaltyPercentage, royalties } = options;

  if (royaltyPercentage && splits && !royalties) royalties = splits;
  if (royaltyPercentage && !splits && !royalties) {
    throw new Error(ERROR_MESSAGES.ROYALTY_PERCENTAGE_WITHOUT_RECIPIENTS);
  }
  if (royalties && !royalties) {
    throw new Error(ERROR_MESSAGES.ROYALTY_RECIPIENTS_WITHOUT_PERCENTAGE);
  }

  const nRoyalties = royalties ? Object.keys(royalties).length : 0;
  const nSplits = royalties ? Object.keys(royalties).length : 0;

  if (nSplits < 2) {
    throw new Error(ERROR_MESSAGES.MIN_SPLITS);
  }
  if (nRoyalties < 1) {
    throw new Error(ERROR_MESSAGES.MIN_ROYALTIES);
  }
  if (nRoyalties + nSplits > 50) {
    throw new Error(ERROR_MESSAGES.MAX_ROYALTIES_SPLITS);
  }

  if (royaltyPercentage && royaltyPercentage < 0 || royaltyPercentage > 50) {
    throw new Error(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }

  if (splits) {
    adjustSplitsForContract(splits);
  }

  if (royalties) {
    adjustSplitsForContract(royalties);
  }

  return {splits, amount, royaltyPercentage, royalties, nRoyalties, nSplits}
}

function adjustSplitsForContract(splits: Record<string, number> ): void {
  let counter = 0;
  Object.keys(splits).forEach(key => {
    counter += splits[key];
    splits[key] *= 100;
  });
  if (counter != 100) {
    throw new Error (ERROR_MESSAGES.SPLITS_PERCENTAGE);
  }
}

function mintingDeposit({
  nTokens,
  nSplits,
  nRoyalties,
  metadata,
}: {
  nTokens: number;
  nSplits: number;
  nRoyalties: number;
  metadata: TokenMetadata;
}): string {
  const commonDeposit = new BN(DEPOSIT_CONSTANTS.STORE_COMMON);
  const royaltiesDeposit = commonDeposit.mul(new BN(nRoyalties));
  const splitsDeposit = commonDeposit.mul(new BN(nSplits));
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
