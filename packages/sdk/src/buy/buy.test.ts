import { mbjs } from '../config/config';
import { MAX_GAS } from '../constants';
import { MARKET_METHOD_NAMES } from '../types';
import { buy } from './buy';


const contractAddress = 'testContract';
const tokenId = 'testToken';
const affiliateAccount = 'testaffiliateAccount';
const price = '1';

test('buy a token', () => {
  const args = buy({
    contractAddress: contractAddress,
    tokenId: tokenId,
    affiliateAccount: affiliateAccount,
    price: price,
  });

  expect(args).toEqual({
    contractAddress: mbjs.keys.marketAddress,
    methodName: MARKET_METHOD_NAMES.BUY,
    args: {
      nft_contract_id: contractAddress,
      token_id: tokenId,
      referrer_id: affiliateAccount,
    },
    deposit: price,
    gas: MAX_GAS,
  });
});
