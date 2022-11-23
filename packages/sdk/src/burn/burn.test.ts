import { TOKEN_METHOD_NAMES } from '../constants';
import { burn, DEPOSIT_FOR_BURN, GAS_FOR_BURN } from './burn';

describe('burn method calls', () => {
  const nftContractId = 'test.nft.contract';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('burn one token', () => {
    const args = burn({
      nftContractId: nftContractId,
      tokenIds: [tokenId1],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [tokenId1],
      },
      deposit: DEPOSIT_FOR_BURN,
      gas: GAS_FOR_BURN,
    });
  });

  test('burn two tokens', () => {
    const args = burn({
      nftContractId: nftContractId,
      tokenIds: [tokenId1, tokenId2],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [tokenId1, tokenId2],
      },
      deposit: DEPOSIT_FOR_BURN,
      gas: GAS_FOR_BURN,
    });
  });

  test('burn empty array of tokens', () => {
    jest.spyOn(global.console, 'error');
    burn({
      nftContractId: nftContractId,
      tokenIds: [],
    });

    expect(console.error).toBeCalled();
  });
});
