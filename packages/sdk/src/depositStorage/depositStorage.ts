import { utils } from 'near-api-js';
import { GAS, MARKET_METHOD_NAMES, MB_MARKET_ADDRESS, MB_TESTNET_MARKET_CONTRACT_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

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
    
  const { marketAddress = MB_MARKET_ADDRESS, listAmount = 1 } = args;
  
  const deposit = (0.01 * listAmount).toString();
  return {
    contractAddress: marketAddress,
    args: {},
    methodName: MARKET_METHOD_NAMES.DEPOSIT_STORAGE,
    deposit: utils.format.parseNearAmount(deposit),
    gas: GAS,
  };
};
