/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { GAS, LISTING_DEPOSIT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { ListArgs, MARKET_METHOD_NAMES, NearContractCall } from '../types';


/**
 * Lists a token on mintbase market contract 
 * @param listArguments {@link ListArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const list = (args: ListArgs): NearContractCall => {
  const { contractAddress = mbjs.keys.contractAddress, tokenId, marketAddress = mbjs.keys.marketAddress, price } = args;
  
  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }
  
  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      token_id: tokenId,
      account_id: marketAddress,
      msg: JSON.stringify({
        price: price,
      }),
    },
    methodName: MARKET_METHOD_NAMES.LIST,
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  };
};
