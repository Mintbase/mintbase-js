/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type AddMinterArgs =  {
    minterId: string;
    nftContractId: string;
  };

export const addMinter = (
  args: AddMinterArgs,
): NearContractCall=> {
  const { minterId, nftContractId } = args;
  
  return {
    contractAddress: nftContractId,
    args: {
      account_id: minterId,
    },
    methodName: TOKEN_METHOD_NAMES.ADD_MINTER,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
