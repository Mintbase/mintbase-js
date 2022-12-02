/* eslint-disable @typescript-eslint/camelcase */
import { GAS, MARKET_METHOD_NAMES, MB_TESTNET_MARKET_CONTRACT_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

export type BuyArgs = {
    price: string;
    nftContractId: string;
    tokenId: string;
    referrerId: string;
    marketAddress?: string;
  };


export const buy = (args: BuyArgs): NearContractCall => {
  const { nftContractId, tokenId, referrerId, marketAddress = MB_TESTNET_MARKET_CONTRACT_ADDRESS, price } = args;
  return {
    contractAddress: marketAddress,
    args: {
      nft_contract_id: nftContractId,
      token_id: tokenId,
      referrer_id: referrerId,
    },
    methodName: MARKET_METHOD_NAMES.BUY,
    gas: GAS,
    deposit: price,
  };
};
