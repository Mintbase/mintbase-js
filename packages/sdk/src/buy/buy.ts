/* eslint-disable @typescript-eslint/camelcase */
import { GAS, MARKET_METHOD_NAMES, MB_TESTNET_MARKET_CONTRACT_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

export type BuyArgs = {
    price: string;
    nftContractId: string;
    tokenId: string;
    referrerId?: string;
    marketAddress?: string;
  };

//todo make a buy at listed price method

/**
 * Buys a listed token for a specified price as long as its above the price for which is was listed
 * @param buyArguments {@link BuyArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */  
export const buy = (args: BuyArgs): NearContractCall => {
  const { nftContractId, tokenId, referrerId = null, marketAddress = MB_TESTNET_MARKET_CONTRACT_ADDRESS, price } = args;
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
