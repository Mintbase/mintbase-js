/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { unlist } from './unlist';

describe('unlist account', () => {

  const nftContractId = 'test';
  const tokenId= 'test';
  const marketAddress = 'test';

  test('unlist with all args', () =>{
    const args = unlist({
      nftContractId: nftContractId,
      tokenId: tokenId,
      marketAddress: marketAddress,
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        token_id: tokenId,
        account_id: marketAddress,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('unlist without marketAddress uses all method', () =>{
    const args = unlist({
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
