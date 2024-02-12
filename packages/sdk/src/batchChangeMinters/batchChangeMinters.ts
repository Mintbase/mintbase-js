import { mbjs } from '../config/config';
import {  GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES, NearContractCall, BatchChangeMintersArgs, BatchChangeMintersArgsResponse } from '../types';
import { isStoreV1 } from '../utils';

/**
 * Add or remove minting access of various ids of a contract you own.
 * @param batchChangeMintersArgs {@link BatchChangeMintersArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const batchChangeMinters = (
  args: BatchChangeMintersArgs,
): NearContractCall<BatchChangeMintersArgsResponse> => {
  const { addMinters = [], removeMinters = [], contractAddress = mbjs.keys.contractAddress } = args;

  if (!isStoreV1(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V1);
  }

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (addMinters.length === 0 && removeMinters.length === 0) {
    throw new Error(ERROR_MESSAGES.BATCH_CHANGE_MINTERS_NO_CHANGE);
  }

  return {
    contractAddress: contractAddress,
    args: {
      grant: addMinters.length > 0 ? addMinters : undefined,
      revoke: removeMinters.length > 0 ? removeMinters : undefined,
    },
    methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
