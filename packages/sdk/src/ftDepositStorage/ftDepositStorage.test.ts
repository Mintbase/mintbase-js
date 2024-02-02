import { ftDepositStorage } from './ftDepositStorage';
import { FT_METHOD_NAMES } from '../types';
import { FT_STORAGE_DEPOSIT, GAS_CONSTANTS } from '../constants';


describe('transfer token unit tests', () => {
  const ftContractAddress = 'test.ft.contract';
  const accountId = 'test.account';

  test('transfer one token', () => {
    const args = ftDepositStorage({
      ftContractAddress,
      accountId,
    });

    expect(args).toEqual({
      contractAddress: ftContractAddress,
      methodName: FT_METHOD_NAMES.STORAGE_DEPOSIT,
      args: { account_id: accountId },
      deposit: FT_STORAGE_DEPOSIT,
      gas: GAS_CONSTANTS.DEFAULT_GAS,
    });
  });
});
