import { ftTransfer } from './ftTransfer';
import { FT_METHOD_NAMES } from '../types';
import { GAS_CONSTANTS, ONE_YOCTO } from '../constants';


describe('transfer token unit tests', () => {
  const ftContractAddress = 'test.ft.contract';
  const receiverId = 'test.account';
  const amount = '1000000';

  test('transfer one token', () => {
    const args = ftTransfer({
      ftContractAddress,
      receiverId,
      amount,
    });

    expect(args).toEqual({
      contractAddress: ftContractAddress,
      methodName: FT_METHOD_NAMES.FT_TRANSFER,
      args: {
        receiver_id: receiverId,
        amount,
        memo: null,
      },
      deposit: ONE_YOCTO,
      gas: GAS_CONSTANTS.FT_TRANSFER,
    });
  });
});
