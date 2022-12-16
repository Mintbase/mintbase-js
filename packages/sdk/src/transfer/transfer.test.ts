import { transfer, DEPOSIT_FOR_TRANSFER, GAS_FOR_TRANSFER } from './transfer';
import { DEFAULT_CONTRACT_ADDRESS, TOKEN_METHOD_NAMES } from '../constants';
import { ContractCall } from '../execute';

describe('transfer token unit tests', () => {
  const nftContractId = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('transfer one token', () => {
    const args = transfer({
      nftContractId: nftContractId,
      transfers: [{ receiverId: receiverId, tokenId: tokenId1 }],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        receiver_id: receiverId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    });
  });

  test('uses contract from env', () => {
    const transferCall = transfer({
      transfers: [{ receiverId: receiverId, tokenId: tokenId1 }],
    }) as ContractCall;
    expect(transferCall.contractAddress).toBe(DEFAULT_CONTRACT_ADDRESS);
  });

  test('transfer two tokens', () => {
    const args = transfer({
      nftContractId: nftContractId,
      transfers: [
        { receiverId: receiverId, tokenId: tokenId1 },
        { receiverId: receiverId, tokenId: tokenId2 },
      ],
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: [
          [receiverId, tokenId1],
          [receiverId, tokenId2],
        ],
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    });
  });
});
