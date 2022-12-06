/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_CONTRACT_ADDRESS, GAS, LISTING_DEPOSIT, MARKET_METHOD_NAMES, MB_MARKET_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

export type ListArgs = {
    nftContractId?: string;
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
  const { nftContractId = DEFAULT_CONTRACT_ADDRESS, tokenId, marketAddress = MB_MARKET_ADDRESS, price } = args;
  
  if (nftContractId == null) {
    throw ('You must provide a nftContractId or define a TOKEN_CONTRACT enviroment variable to default to');
  }
  
  return {
    contractAddress: nftContractId,
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
