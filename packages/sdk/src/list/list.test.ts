/* eslint-disable @typescript-eslint/camelcase */
import { GAS, LISTING_DEPOSIT, MARKET_METHOD_NAMES } from '../constants';
import { list } from './list';

test('list a token', () => {
  const nftContractId = 'contract';
  const tokenId = 'token';
  const marketId = 'account';
  const price = '1';
  const args = list({
    nftContractId: nftContractId,
    tokenId: tokenId,
    marketId: marketId,
    price: price,
  });

  expect(args).toEqual({
    contractAddress: nftContractId,
    methodName: MARKET_METHOD_NAMES.LIST,
    args: {
      token_id: tokenId,
      account_id: marketId,
      msg: JSON.stringify({
        price: price,
      }),
    },
    deposit: LISTING_DEPOSIT,
    gas: GAS,
  });
});
