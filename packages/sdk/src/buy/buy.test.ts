/* eslint-disable @typescript-eslint/camelcase */
import { GAS, MARKET_METHOD_NAMES, MB_TESTNET_MARKET_CONTRACT_ADDRESS } from '../constants';
import { buy } from './buy';


const nftContractId = 'testContract';
const tokenId = 'testToken';
const referrerId = 'testReferrerId';
const price = '1';

test('buy a token', () => {
  const args = buy({
    nftContractId: nftContractId,
    tokenId: tokenId,
    referrerId: referrerId,
    price: price,
  });

  expect(args).toEqual({
    contractAddress: MB_TESTNET_MARKET_CONTRACT_ADDRESS,
    methodName: MARKET_METHOD_NAMES.BUY,
    args: {
      nft_contract_id: nftContractId,
      token_id: tokenId,
      referrer_id: referrerId,
    },
    deposit: price,
    gas: GAS,
  });
});
