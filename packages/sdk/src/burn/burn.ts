import { DEPOSIT_FOR_BURN, GAS_FOR_BURN } from '../constants';
import { mbjs } from '../config/config';
import { TOKEN_METHOD_NAMES, NearContractCall, BurnArgs, BurnArgsResponse } from '../types';
import { ERROR_MESSAGES } from '../errorMessages';


/**
 * Burns one or more tokens from a given contract.
 * @param burnArguments {@link BurnArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const burn = ({ tokenIds, contractAddress = mbjs.keys.contractAddress }: BurnArgs): NearContractCall<BurnArgsResponse> => {

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (tokenIds.length === 0) {
    throw new Error(ERROR_MESSAGES.BURN_TOKEN_IDS);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
    args: {
      token_ids: tokenIds,
    },
    deposit: DEPOSIT_FOR_BURN,
    gas: GAS_FOR_BURN,
  };
};
