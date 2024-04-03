import { mbjs } from '../config/config';
import { GAS, STORAGE_BYTES, STORAGE_PRICE_PER_BYTE_EXPONENT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { SetSplitsArgs, SetSplitsArgsResponse, TOKEN_METHOD_NAMES, NearContractCall } from '../types';


/**
 * Set splits for a token
 * @param setSplitsArguments {@link SetSplitsArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const setSplits = (args: SetSplitsArgs): NearContractCall<SetSplitsArgsResponse> => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    tokenIds,
    splitOwners,
  } = args;

  if (!contractAddress) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (tokenIds.length < 1) {
    throw new Error(ERROR_MESSAGES.SET_SPLITS_NO_TOKEN_IDS);
  }

  const requiredBytes = Object.keys(splitOwners).length * tokenIds.length * STORAGE_BYTES.COMMON;
  const deposit = `${requiredBytes.toString()}${'0'.repeat(STORAGE_PRICE_PER_BYTE_EXPONENT)}`;

  let sum = 0;
  const intSplitOwners = {};
  Object.entries(splitOwners).forEach(([account, split]) => {
    const intSplit = split * 10000;
    intSplitOwners[account] = intSplit;
    sum += intSplit;
  });

  if (sum !== 10000) {
    throw new Error(ERROR_MESSAGES.SPLITS_NOT_HUNDERT_PERCENT);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      token_ids: tokenIds,
      split_between: intSplitOwners,
    },
    methodName: TOKEN_METHOD_NAMES.SET_SPLITS,
    deposit,
    gas: GAS,
  };
};
