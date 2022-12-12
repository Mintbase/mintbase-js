/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type AddMinterArgs =  {
    minterId: string;
    nftContractId?: string;
  };

/**
 * Add minting access for one id to a contract you own.
 * @param addMinterArgs {@link AddMinterArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */  
export const addMinter = (
  args: AddMinterArgs,
): NearContractCall=> {
  const { minterId, nftContractId = DEFAULT_CONTRACT_ADDRESS } = args;

  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID enviroment variable to default to');
  }
  
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
