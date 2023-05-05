import { mbjs } from '../config/config';
import { MAX_GAS, ONE_YOCTO } from '../constants';
import { MARKET_METHOD_NAMES, FT_METHOD_NAMES, FungibleToken } from '../types';
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

test('buy a token using USDC', () => {
  const args = buy({
    contractAddress: contractAddress,
    tokenId: tokenId,
    affiliateAccount: affiliateAccount,
    price: price,
    ftAddress: mbjs.keys.ftAddresses[FungibleToken.USDC],
  });

  expect(args).toEqual({
    contractAddress: mbjs.keys.ftAddresses[FungibleToken.USDC],
    args: {
      receiver_id: mbjs.keys.marketAddress,
      amount: price,
      msg: JSON.stringify({
        nft_contract_id: contractAddress,
        token_id: tokenId,
      }),
    },
    methodName: FT_METHOD_NAMES.FT_TRANSFER_CALL,
    gas: MAX_GAS,
    deposit: ONE_YOCTO,
  });
});
