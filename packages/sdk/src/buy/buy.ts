/* eslint-disable @typescript-eslint/camelcase */
import { DEFAULT_CONTRACT_ADDRESS, GAS, MARKET_METHOD_NAMES, MB_MARKET_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

export type BuyArgs = {
    price: string;
    nftContractId?: string;
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
  const { nftContractId = DEFAULT_CONTRACT_ADDRESS, tokenId, referrerId = null, marketAddress = MB_MARKET_ADDRESS, price } = args;

  if (nftContractId == null) {
    throw ('You must provide a nftContractId or define a TOKEN_CONTRACT enviroment variable to default to');
  }
  
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
