/* eslint-disable @typescript-eslint/camelcase */
import { GAS, LISTING_DEPOSIT, MARKET_METHOD_NAMES, MB_TESTNET_MARKET_CONTRACT_ADDRESS, ONE_YOCTO } from '../constants';
import { NearContractCall } from '../execute';

export type ListArgs = {
    nftContractId: string;
    marketContractId?: string;
    price: string;
    tokenId: string;
  }


export const list = (args: ListArgs): NearContractCall => {
  const { nftContractId, tokenId, marketContractId = MB_TESTNET_MARKET_CONTRACT_ADDRESS, price } = args;
  
  return {
    contractAddress: nftContractId,
    args: {
      token_id: tokenId,
      account_id: marketContractId,
      msg: JSON.stringify({
        price: price,
      }),
    },
    methodName: MARKET_METHOD_NAMES.LIST,
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  };
};
