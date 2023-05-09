import { mbjs } from '../config/config';
import { GAS, LISTING_DEPOSIT } from '../constants';
import { MARKET_METHOD_NAMES, FungibleToken } from '../types';
import { list } from './list';

test('list a token', () => {
  const contractAddress = 'contract';
  const tokenId = 'token';
  const marketAddress = 'account';
  const price = '1';
  const args = list({
    contractAddress: contractAddress,
    tokenId: tokenId,
    marketAddress: marketAddress,
    price: price,
  });

  expect(args).toEqual({
    contractAddress: contractAddress,
    methodName: MARKET_METHOD_NAMES.LIST,
    args: {
      token_id: tokenId,
      account_id: marketAddress,
      msg: JSON.stringify({
        price: price,
      }),
    },
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  });
});

test('list a token for USDC', () => {
  const contractAddress = 'contract';
  const tokenId = 'token';
  const marketAddress = 'account';
  const price = '1';
  const args = list({
    contractAddress: contractAddress,
    tokenId: tokenId,
    marketAddress: marketAddress,
    price: price,
    ft: FungibleToken.USDC,
  });

  expect(args).toEqual({
    contractAddress: contractAddress,
    methodName: MARKET_METHOD_NAMES.LIST,
    args: {
      token_id: tokenId,
      account_id: marketAddress,
      msg: JSON.stringify({
        price: price,
        ft_contract: mbjs.keys.ftAddresses[FungibleToken.USDC],
      }),
    },
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  });
});

test('list a token for USDT', () => {
  const contractAddress = 'contract';
  const tokenId = 'token';
  const marketAddress = 'account';
  const price = '1';
  const args = list({
    contractAddress: contractAddress,
    tokenId: tokenId,
    marketAddress: marketAddress,
    price: price,
    ft: FungibleToken.USDT,
  });

  expect(args).toEqual({
    contractAddress: contractAddress,
    methodName: MARKET_METHOD_NAMES.LIST,
    args: {
      token_id: tokenId,
      account_id: marketAddress,
      msg: JSON.stringify({
        price: price,
        ft_contract: mbjs.keys.ftAddresses[FungibleToken.USDT],
      }),
    },
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  });
});
