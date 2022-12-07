import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type BatchChangeMintersArgs =  {
    addMinters?: string[];
    removeMinters?: string[];
    nftContractId?: string;
  };


/**
 * Add or remove minting access of various ids of a contract you own.
 * @param batchChangeMintersArgs {@link BatchChangeMintersArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */    
export const batchChangeMinters = (
  args: BatchChangeMintersArgs,
): NearContractCall => {
  const { addMinters = [], removeMinters = [], nftContractId = DEFAULT_CONTRACT_ADDRESS } = args;

  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID enviroment variable to default to');
  }

  if (addMinters.length === 0 && removeMinters.length === 0) {
    throw new Error('There are no minters being provided to the batchChangeMinters method to be changed');
  }
  
  return {
    contractAddress: nftContractId,
    args: {
      grant: addMinters.length > 0 ? addMinters : undefined,
      revoke: removeMinters.length > 0 ? removeMinters : undefined,
    },
    methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
