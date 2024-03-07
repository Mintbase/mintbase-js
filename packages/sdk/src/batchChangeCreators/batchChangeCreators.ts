import { mbjs } from '../config/config';
import {  GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES, NearContractCall, BatchChangeCreatorsArgs, BatchChangeMintersArgsResponse } from '../types';
import { isStoreV2 } from '../utils';

/**
 * Add or remove creator access of various ids of a contract you own.
 * @param batchChangeCreatorsArgs {@link BatchChangeCreatorsArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const batchChangeCreators = (
  args: BatchChangeCreatorsArgs,
): NearContractCall<BatchChangeMintersArgsResponse> => {
  const { addCreators = [], removeCreators = [], contractAddress = mbjs.keys.contractAddress } = args;
  
  if (!contractAddress) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (!isStoreV2(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V2);
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
