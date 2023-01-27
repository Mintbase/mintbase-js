import { DEPOSIT_FOR_BURN, GAS_FOR_BURN } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { burn  } from './burn';

describe('burn method calls', () => {
  const contractAddress = 'test.nft.contract';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('burn one token', () => {
    const args = burn({
      contractAddress: contractAddress,
      tokenIds: [tokenId1],
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
      args: {
        token_ids: [tokenId1],
      },
      deposit: DEPOSIT_FOR_BURN,
      gas: GAS_FOR_BURN,
    });
  });

  test('burn two tokens', () => {
    const args = burn({
      contractAddress: contractAddress,
      tokenIds: [tokenId1, tokenId2],
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
      args: {
        token_ids: [tokenId1, tokenId2],
      },
      deposit: DEPOSIT_FOR_BURN,
      gas: GAS_FOR_BURN,
    });
  });

  test('burn empty array of tokens', () => {

    expect(() => burn({
      contractAddress: contractAddress,
      tokenIds: [],
    })).toThrow;
  });
});
