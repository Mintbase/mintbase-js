/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { delist } from './delist';

describe('delist account', () => {

  const nftContractId = 'test';
  const tokenId= 'test';
  const marketId = 'test';

  test('delist with all args', () =>{
    const args = delist({
      nftContractId: nftContractId,
      tokenId: tokenId,
      marketId: marketId,
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        token_id: tokenId,
        account_id: marketId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('delist without marketId uses all method', () =>{
    const args = delist({
      nftContractId: nftContractId,
      tokenId: tokenId,
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
      args: {
        token_id: tokenId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
    expect.not.objectContaining(args);
  });
});
