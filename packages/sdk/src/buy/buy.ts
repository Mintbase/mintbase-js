/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { MAX_GAS, ONE_YOCTO  } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { BuyArgs, BuyArgsFtResponse, BuyArgsResponse, MARKET_METHOD_NAMES, NearContractCall } from '../types';

//todo make a buy at listed price method

/**
 * Buys a listed token for a specified price as long as its above the price for which is was listed
 * @param buyArguments {@link BuyArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const buy = (args: BuyArgs): NearContractCall<BuyArgsResponse | BuyArgsFtResponse> => {
  const { contractAddress = mbjs.keys.contractAddress, tokenId, referrerId = null, marketId = mbjs.keys.marketAddress, price, affiliateAccount } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (args.ftAddress) {
    // TODO: validate that FT is a valid address and that MB is registered with them!

    return {
      contractAddress: args.ftAddress,
      args: {
        receiver_id: marketId || mbjs.keys.marketAddress,
        amount: price,
        msg: JSON.stringify({
          nft_contract_id: contractAddress || mbjs.keys.contractAddress,
          token_id: tokenId,
        })
      },
      methodName: "ft_transfer_call", // TODO: use enum?
      gas: MAX_GAS,
      deposit: ONE_YOCTO,
    }
  }

  return {
    contractAddress: marketId || mbjs.keys.marketAddress,
    args: {
      nft_contract_id: contractAddress || mbjs.keys.contractAddress,
      token_id: tokenId,
      referrer_id: affiliateAccount || referrerId,
    },
    methodName: MARKET_METHOD_NAMES.BUY,
    gas: MAX_GAS,
    deposit: price,
  };
};
