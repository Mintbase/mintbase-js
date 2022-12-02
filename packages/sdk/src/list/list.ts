/* eslint-disable @typescript-eslint/camelcase */
import { GAS, LISTING_DEPOSIT, MARKET_METHOD_NAMES, MB_TESTNET_MARKET_CONTRACT_ADDRESS, ONE_YOCTO } from '../constants';
import { NearContractCall } from '../execute';

export type ListArgs = {
    nftContractId: string;
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
  const { nftContractId, tokenId, marketAddress = MB_TESTNET_MARKET_CONTRACT_ADDRESS, price } = args;
  
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
