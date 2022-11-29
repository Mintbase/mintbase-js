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
    royalties?: Splits;
    splits?: Splits;
    amount?: number;
    royaltyPercentage?: number;
}

export type Splits = Record<string, number>;


export const mint = (
  args: MintArgs,
): NearContractCall => {
  const { nftContractId, reference, ownerId, options = {}  } = args;

  const { royalties, splits, amount, royaltyPercentage } = options;
  
  return {
    contractAddress: nftContractId,
    args: {
      owner_id: ownerId,
      metadata: {
        reference: reference,
      },
      num_to_mint: amount || 1,
      royalty_args: !royalties ? null : { split_between: royalties, percentage: royaltyPercentage },
      split_owners: splits || null,
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
