// Mintbase marketplace contract JS implementation

import { utils } from 'near-api-js';
import { NearContractCall } from '../execute';
import {
  DEPOSIT_CONSTANTS,
  GAS_CONSTANTS,
  MARKET_METHOD_NAMES,
} from './constants';
import { BuyArgs, DepositStorageArgs, ListArgs } from './market.types';

export const buy = (
  args: BuyArgs,
): NearContractCall => {
  const { nftContractId, tokenId, referrerId, marketAddress, price } = args;
  return {
    contractAddress: marketAddress,
    args: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      nft_contract_id: nftContractId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_id: tokenId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      referrer_id: referrerId,
    },
    methodName: MARKET_METHOD_NAMES.BUY,
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: price.amount,
  };
};

export const list = (
  args: ListArgs,
): NearContractCall => {
  const { nftContractId, tokenId, approvedAccountId, price } = args;

  return {
    contractAddress: nftContractId,
    args: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_id: tokenId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      account_id: approvedAccountId,
      msg: JSON.stringify({
        price: price.amount,
      }),
    },
    methodName: MARKET_METHOD_NAMES.LIST,
    deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
    gas: GAS_CONSTANTS.DEFAULT_GAS,
  };
};

export const depositStorage = (
  args: DepositStorageArgs,
): NearContractCall => {
  const { marketAddress, listAmount = 1 } = args;

  const deposit = (0.01 * listAmount).toString();
  return {
    contractAddress: marketAddress,
    args: {},
    methodName: MARKET_METHOD_NAMES.DEPOSIT_STORAGE,
    deposit: utils.format.parseNearAmount(deposit),
    gas: GAS_CONSTANTS.DEFAULT_GAS,
  };
};
