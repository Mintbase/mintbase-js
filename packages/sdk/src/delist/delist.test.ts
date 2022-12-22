/* eslint-disable @typescript-eslint/camelcase */
import { GAS, MARKET_METHOD_NAMES, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { delist } from './delist';

describe('delist account', () => {

  const nftContractId = 'test';
  const tokenId= 'test';
  const marketId = 'test';

  test('delist with all args', () =>{
    const args = delist({
      nftContractId: nftContractId,
      tokenIds: [tokenId],
      marketId: marketId,
    });

    expect(args[0]).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        token_id: tokenId,
        account_id: marketId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });

    expect(args[1]).toEqual({
      contractAddress: marketId,
      methodName: 'unlist',
      args: {
        token_ids: [tokenId],
        nft_contract_id: nftContractId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('delisting without marketId (uses revokeAll method)', () =>{
    const args = delist({
      nftContractId: nftContractId,
      tokenIds: [tokenId],
    });

    expect(args[0]).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        account_id: 'market-v2-beta.mintspace2.testnet',
        token_id: tokenId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
    expect.not.objectContaining(args);
  });
});
