import { mbjs } from '../config/config';
import { GAS, ONE_YOCTO  } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { delist } from './delist';

describe('delist account', () => {

  const contractAddress = 'test';
  const tokenId= 'test';
  const marketAddress = 'test';

  test('delist with all args', () =>{
    const args = delist({
      contractAddress: contractAddress,
      tokenIds: [tokenId],
      marketAddress: marketAddress,
    });

    expect(args[0]).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        token_id: tokenId,
        account_id: marketAddress,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });

    expect(args[1]).toEqual({
      contractAddress: marketAddress,
      methodName: 'unlist',
      args: {
        token_ids: [tokenId],
        CONTRACT_ADDRESS: contractAddress,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('delisting without marketId (uses revokeAll method)', () =>{
    const args = delist({
      contractAddress: contractAddress,
      tokenIds: [tokenId],
    });

    expect(args[0]).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        account_id: mbjs.keys.marketAddress,
        token_id: tokenId,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
    expect.not.objectContaining(args);
  });
});
