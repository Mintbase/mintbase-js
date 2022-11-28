/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type RemoveMinterArgs =  {
    minterId: string;
    nftContractId: string;
  };

export const removeMinter = (
  args: RemoveMinterArgs,
): NearContractCall=> {
  const { minterId, nftContractId } = args;
  
  return {
    contractAddress: nftContractId,
    args: {
      account_id: minterId,
    },
    methodName: TOKEN_METHOD_NAMES.REMOVE_MINTER,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
