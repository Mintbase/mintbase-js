import { mbjs } from '../config/config';
import {  GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall } from '../execute';
import { TOKEN_METHOD_NAMES } from '../types';


export type MintArgs =  {
  contractAddress?: string;
  ownerId: string;
  reference?: string;
  metadata: TokenMetadata;
  options?: MintOptions;
  noMedia?: boolean;     // explicit opt-in to NFT without media, breaks wallets
  noReference?: boolean; // explicit opt-in to NFT without reference
};

export type TokenMetadata = {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  issued_at?: string;  // Stringified unix timestamp, according to
  expires_at?: string; // standards this is milliseconds since epoch, but
  starts_at?: string;  // since `env::block_timestamp` is in nanoseconds
  updated_at?: string; // most timestamps in the ecosystem are nanoseconds
  extra?: string;
  reference?: string;
  reference_hash?: string;
}

export type MintOptions = {
    splits?: Splits;
    amount?: number;
    royaltyPercentage?: number;
}

export type Splits = Record<string, number>;

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const mint = (
  args: MintArgs,
): NearContractCall => {
  const {
    contractAddress = DEFAULT_CONTRACT_ADDRESS,
    reference,
    metadata,
    ownerId,
    options = {},
    noMedia = false,
    noReference = false,
  } = args;

  const { splits, amount, royaltyPercentage } = options;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  // Either both references are the same or only one must be given
  if (reference && metadata.reference && metadata.reference !== reference) {
    throw new Error('Conflicting references');
  }
  // If reference not in metadata, insert
  if (!metadata.reference) {
    metadata.reference = reference;
  }

  // Reference and media need to be present or explictly opted out of
  if (!noReference && !metadata.reference && !reference) {
    throw new Error('You must provide reference in your metadata or explicitly opt out of using reference');
  }
  if (!noMedia && !metadata.media) {
    throw new Error('You must provide media in your metadata or explicitly opt out of using media');
  }

  if (splits) {
    //0.5 -> 5000
    adjustSplitsForContract(splits);
  }

  if (splits && Object.keys(splits).length > 50) {
    throw new Error(ERROR_MESSAGES.MAX_SPLITS);
  }

  if (splits && Object.keys(splits).length < 2) {
    throw new Error(ERROR_MESSAGES.SPLITS);
  }

  if (amount && amount > 125) {
    throw  new Error(ERROR_MESSAGES.MAX_AMOUT);
  }

  if (royaltyPercentage && royaltyPercentage < 0 || royaltyPercentage > 0.5) {
    throw new Error(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      owner_id: ownerId,
      metadata: metadata,
      num_to_mint: amount || 1,
      // 10000 = 100%
      royalty_args: !splits ? null : { split_between: splits, percentage: royaltyPercentage * 10000 },
      split_owners: splits || null,
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};

function adjustSplitsForContract(splits: Record<string, number> ): void {
  let counter = 0;
  Object.keys(splits).forEach(key => {
    counter += splits[key];
    splits[key] *= 10000;
  });
  if (counter != 1) {
    throw new Error (ERROR_MESSAGES.SPLITS_PERCENTAGE);
  }
}
