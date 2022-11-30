/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';


export type MintArgs =  {
  nftContractId: string;
  reference: string;
  ownerId: string;
  options?: MintOptions;
};

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
  const { nftContractId, reference, ownerId, options = {}  } = args;

  const { splits, amount, royaltyPercentage } = options;
  //0.5 -> 5000
  adjustSplitsForContract(splits);

  if (splits && Object.keys(splits).length > 50) {
    console.error('Splits cannnot have more than 50 entries');
  }

  if (splits && Object.keys(splits).length < 2) {
    console.error('There must be at least 2 accounts in splits');
  }

  if (amount && amount > 99) {
    console.error('It is not possible to mint more than 99 copies of this token using this method');
  }

  if (royaltyPercentage && royaltyPercentage < 0 || royaltyPercentage > 0.5) {
    console.error('Invalid royalty percentage');
  }
  
  return {
    contractAddress: nftContractId,
    args: {
      owner_id: ownerId,
      metadata: {
        reference: reference,
      },
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
  let counter: number;
  Object.keys(splits).forEach(key => {
    counter += splits[key];
    splits[key] *= 10000;
  });
  if (counter != 1) {
    console.error('Splits percentages must add up to 1');
  }
}