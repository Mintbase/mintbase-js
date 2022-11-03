import { MB_CALLS } from './constants';
import { burn, transfer } from './token';

describe('token method calls', () => {
  const nftContractId = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('transfer one token', () => {
    const args = transfer({
      nftContractId: nftContractId,
      transfer: [{ receiverId: receiverId, tokenId: tokenId1 }],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: MB_CALLS.TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        receiver_id: receiverId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
      },
    });
  });

  test('transfer two tokens', () => {
    const args = transfer({
      nftContractId: nftContractId,
      transfer: [
        { receiverId: receiverId, tokenId: tokenId1 },
        { receiverId: receiverId, tokenId: tokenId2 },
      ],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: MB_CALLS.BATCH_TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [
          [receiverId, tokenId1],
          [receiverId, tokenId2],
        ],
      },
    });
  });

  test('burn one token', () => {
    const args = burn({
      nftContractId: nftContractId,
      tokenIds: [tokenId1],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: MB_CALLS.BATCH_BURN,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [tokenId1],
      },
    });
  });

  test('burn two tokens', () => {
    const args = burn({
      nftContractId: nftContractId,
      tokenIds: [tokenId1, tokenId2],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: MB_CALLS.BATCH_BURN,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [tokenId1, tokenId2],
      },
    });
  });
});
