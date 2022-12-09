/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type RemoveMinterArgs =  {
    minterId: string;
    nftContractId?: string;
  };

/**
 * Remove minting access of a provided id for a contract you own.
 * @param removeMinterArgs {@link RemoveMinterArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */     
export const removeMinter = (
  args: RemoveMinterArgs,
): NearContractCall=> {
  const { minterId, nftContractId = DEFAULT_CONTRACT_ADDRESS } = args;

  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID environment variable to default to');
  }
  
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
