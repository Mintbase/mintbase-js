import { transfer } from './transfer';
import { ContractCall, TOKEN_METHOD_NAMES, TransferArgsResponse } from '../types';
import { mbjs } from '../config/config';
import { DEPOSIT_FOR_TRANSFER, GAS_FOR_TRANSFER } from '../constants';


describe('transfer token unit tests', () => {
  const contractAddress = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('transfer one token', () => {
    const args = transfer({
      contractAddress: contractAddress,
      transfers: [{ receiverId: receiverId, tokenId: tokenId1 }],
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.TRANSFER,
      args: {
        receiver_id: receiverId,
        token_id: tokenId1,
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    });
  });

  test('uses contract from env', () => {
    const transferCall = transfer({
      transfers: [{ receiverId: receiverId, tokenId: tokenId1 }],
    }) as ContractCall<TransferArgsResponse>;
    expect(transferCall.contractAddress).toBe(mbjs.keys.contractAddress);
  });

  test('transfer two tokens', () => {
    const args = transfer({
      contractAddress: contractAddress,
      transfers: [
        { receiverId: receiverId, tokenId: tokenId1 },
        { receiverId: receiverId, tokenId: tokenId2 },
      ],
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_TRANSFER,
      args: {
        token_ids: [
          [tokenId1, receiverId],
          [tokenId2, receiverId],
        ],
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    });
  });
});
