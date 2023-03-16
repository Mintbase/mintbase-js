/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { GAS, LISTING_DEPOSIT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { ListArgs, ListArgsResponse, MARKET_METHOD_NAMES, NearContractCall } from '../types';


/**
 * Lists a token on mintbase market contract
 * @param listArguments {@link ListArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const list = (args: ListArgs): NearContractCall<ListArgsResponse> => {
  const { contractAddress = mbjs.keys.contractAddress, tokenId, marketAddress = mbjs.keys.marketAddress, price } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  const msg: { price: string, ft_contract?: string } = { price: price };
  if (args.ft) {
    const ftContractId = mbjs.keys.ftAddresses[args.ft];
    msg.ft_contract = ftContractId;
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      token_id: tokenId,
      account_id: marketAddress,
      msg: JSON.stringify(msg),
    },
    methodName: MARKET_METHOD_NAMES.LIST,
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  };
};
