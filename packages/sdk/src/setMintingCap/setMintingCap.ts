import { mbjs } from '../config/config';
import { GAS, ONE_YOCTO } from '../constants';
import { SetMintingCapArgs, NearContractCall, TOKEN_METHOD_NAMES, SetMintingCapArgsResponse } from '../types';
import { isStoreV2 } from '../utils';
import { ERROR_MESSAGES } from '../errorMessages';


/**
 * Deposits 0.01 * listAmount of near to the market contract to be consumed for listing purposes
 * @param args {@link SetMintingCapArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const setMintingCap = (args: SetMintingCapArgs): NearContractCall<SetMintingCapArgsResponse> => {

  const { contractAddress = mbjs.keys.contractAddress, mintingCap } = args;

  if (!isStoreV2(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V2);
  }

  return {
    contractAddress,
    args: { minting_cap: mintingCap },
    methodName: TOKEN_METHOD_NAMES.SET_MINTING_CAP,
    deposit: ONE_YOCTO,
    gas: GAS,
  };
};
