/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config';
import { GAS, LISTING_DEPOSIT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall } from '../execute';
import { MARKET_METHOD_NAMES } from '../types';

export type ListArgs = {
    contractAddress?: string;
    marketAddress?: string;
    price: string;
    tokenId: string;
  }

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
