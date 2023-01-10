import { utils } from 'near-api-js';
import { mbjs } from '../config';
import { GAS } from '../constants';
import { NearContractCall } from '../execute';
import { MARKET_METHOD_NAMES } from '../types';

export type DepositStorageArgs = {
    listAmount?: number;
    marketAddress?: string;
  };


/**
 * Deposits 0.01 * listAmount of near to the market contract to be consumed for listing purposes
 * @param depositStorageArguments {@link DepositStorageArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const depositStorage = (args: DepositStorageArgs): NearContractCall => {
    
  const { marketAddress = mbjs.keys.marketAddress, listAmount = 1 } = args;
  
  const deposit = (0.01 * listAmount).toString();
  
  return {
    contractAddress: marketAddress,
    args: {},
    methodName: MARKET_METHOD_NAMES.DEPOSIT_STORAGE,
    deposit: utils.format.parseNearAmount(deposit),
    gas: GAS,
  };
};
