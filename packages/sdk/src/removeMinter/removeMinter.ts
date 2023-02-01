import { mbjs } from '../config/config';
import { NearContractCall, RemoveMinterArgs, BatchChangeMintersArgsResponse, TOKEN_METHOD_NAMES } from '../types';
import { batchChangeMinters } from '../batchChangeMinters/batchChangeMinters';


/**
 * Remove minting access of a provided id for a contract you own.
 * @param removeMinterArgs {@link RemoveMinterArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const removeMinter = (
  args: RemoveMinterArgs,
): NearContractCall<BatchChangeMintersArgsResponse> => {
  const { minterId, contractAddress = mbjs.keys.contractAddress } = args;
  return batchChangeMinters({ removeMinters: [minterId], contractAddress });
};
