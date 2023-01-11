import { mbjs } from '../config/config';
import { GAS } from '../constants';
import { MARKET_METHOD_NAMES } from '../types';
import { buy } from './buy';


const contractAddress = 'testContract';
const tokenId = 'testToken';
const referrerId = 'testReferrerId';
const price = '1';

test('buy a token', () => {
  const args = buy({
    contractAddress: contractAddress,
    tokenId: tokenId,
    referrerId: referrerId,
    price: price,
  });

  expect(args).toEqual({
    contractAddress: mbjs.keys.marketAddress,
    methodName: MARKET_METHOD_NAMES.BUY,
    args: {
      CONTRACT_ADDRESS: contractAddress,
      token_id: tokenId,
      referrer_id: referrerId,
    },
    deposit: price,
    gas: GAS,
  });
});
