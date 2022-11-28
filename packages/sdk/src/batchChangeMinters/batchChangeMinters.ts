import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type BatchChangeMintersArgs =  {
    addMinters?: string[];
    removeMinters?: string[];
    nftContractId: string;
  };


export const batchChangeMinters = (
  args: BatchChangeMintersArgs,
): NearContractCall => {
  const { addMinters = [], removeMinters = [], nftContractId } = args;

  if (addMinters.length === 0 && removeMinters.length === 0) {
    console.warn('There are no minters being provided to the batchChangeMinters method to be changed');
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
