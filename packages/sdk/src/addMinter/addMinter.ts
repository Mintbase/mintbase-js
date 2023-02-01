import { mbjs } from '../config/config';
import { NearContractCall, AddMinterArgs, BatchChangeMintersArgsResponse } from '../types';
import { batchChangeMinters } from '../batchChangeMinters/batchChangeMinters';

/**
 * Add minting access for one id to a contract you own.
 * @param addMinterArgs {@link AddMinterArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const addMinter = (
  args: AddMinterArgs,
): NearContractCall<BatchChangeMintersArgsResponse>=> {
  const { minterId, contractAddress = mbjs.keys.contractAddress } = args;
  return batchChangeMinters({ addMinters: [minterId], contractAddress });
};
