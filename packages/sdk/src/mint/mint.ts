/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';


export type MintArgs =  {
  nftContractId?: string;
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
    nftContractId = DEFAULT_CONTRACT_ADDRESS,
    reference,
    metadata,
    ownerId,
    options = {},
    noMedia = false,
    noReference = false,
  } = args;

  const { splits, amount, royaltyPercentage } = options;

  if (nftContractId === null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID environment variable to default to');
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
    throw ('Splits cannnot have more than 50 entries');
  }

  if (splits && Object.keys(splits).length < 2) {
    throw ('There must be at least 2 accounts in splits');
  }

  if (amount && amount > 125) {
    throw ('It is not possible to mint more than 99 copies of this token using this method');
  }

  if (royaltyPercentage && royaltyPercentage < 0 || royaltyPercentage > 0.5) {
    throw ('Invalid royalty percentage');
  }

  return {
    contractAddress: nftContractId,
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
    throw ('Splits percentages must add up to 1');
  }
}
