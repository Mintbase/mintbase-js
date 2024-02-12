import { mbjs } from '../config/config';
import {  GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES, NearContractCall, BatchChangeCreatorsArgs, BatchChangeMintersArgsResponse } from '../types';

/**
 * Add or remove minting access of various ids of a contract you own.
 * @param batchChangeMintersArgs {@link BatchChangeCreatorsArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const batchChangeMinters = (
  args: BatchChangeCreatorsArgs,
): NearContractCall<BatchChangeMintersArgsResponse> => {
  const { addCreators = [], removeCreators = [], contractAddress = mbjs.keys.contractAddress } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (addCreators.length === 0 && removeCreators.length === 0) {
    throw new Error(ERROR_MESSAGES.BATCH_CHANGE_CREATORS_NO_CHANGE);
  }

  return {
    contractAddress: contractAddress,
    args: {
      grant: addCreators.length > 0 ? addCreators : undefined,
      revoke: removeCreators.length > 0 ? removeCreators : undefined,
    },
    methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_CREATORS,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
