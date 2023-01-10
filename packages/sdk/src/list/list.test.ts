import { GAS, LISTING_DEPOSIT } from '../constants';
import { MARKET_METHOD_NAMES } from '../types';
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
