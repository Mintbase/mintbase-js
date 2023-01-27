/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { GAS  } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { BuyArgs, MARKET_METHOD_NAMES, NearContractCall } from '../types';

//todo make a buy at listed price method

/**
 * Buys a listed token for a specified price as long as its above the price for which is was listed
 * @param buyArguments {@link BuyArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const buy = (args: BuyArgs): NearContractCall=> {
  const { contractAddress = mbjs.keys.contractAddress, tokenId, referrerId = null, marketId = mbjs.keys.marketAddress, price } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  return {
    contractAddress: marketId || mbjs.keys.marketAddress,
    args: {
      CONTRACT_ADDRESS: contractAddress || mbjs.keys.contractAddress,
      token_id: tokenId,
      referrer_id: referrerId,
    },
    methodName: MARKET_METHOD_NAMES.BUY,
    gas: GAS,
    deposit: price,
  };
};
