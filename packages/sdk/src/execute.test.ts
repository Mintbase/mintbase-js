import {
  BrowserWalletSignAndSendTransactionParams,
} from '@near-wallet-selector/core/lib/wallet';
import { FunctionCallOptions } from 'near-api-js/lib/account';
import { execute, NearContractCall } from './execute';

import { MAX_GAS, ONE_YOCTO } from './constants';
import { NoSigningMethodPassedError } from './errors';

describe('contract method calls (execute)', () => {
  const testSigner = 'mb_alice.testnet';
  const testContract = 'mb_store.mintspace2.testnet';
  const testMethod = 'nft_transfer';
  const testCallbackUrl = 'ftp://mintbase.testnet';
  const testArgs = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    token_id: 'fake.token.id',
    // eslint-disable-next-line @typescript-eslint/camelcase
    receiver_id: 'mb_bob.testnet',
  };
  const testContractCall: NearContractCall = {
    signerId: testSigner,
    contractAddress: testContract,
    methodName: testMethod,
    args: testArgs,
    gas: MAX_GAS,
    deposit: ONE_YOCTO,
    callbackUrl: testCallbackUrl,
  };

  const mockNearSelectorWallet = {
    signAndSendTransaction: jest.fn(),
    signAndSendTransactions: jest.fn(),
  };

  const mockNearAccount = {
    signAndSendTransaction: jest.fn(),
    functionCall: jest.fn(),
  };

  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
  });

  afterEach(() => jest.resetAllMocks());

  test('execute should throw without a valid signing method ', () => {
    expect(execute(testContractCall, {}))
      .rejects
      .toThrow(NoSigningMethodPassedError);
  });

  const transformedSignAndSendCallArgs = {
    signerId: testSigner,
    receiverId: testContract,
    callbackUrl: testCallbackUrl,
    actions:[{
      type: 'FunctionCall',
      params: {
        methodName: testMethod,
        args: testArgs,
        gas: MAX_GAS,
        deposit: ONE_YOCTO,
      },
    }],
  };

  test('execute calls through to browser wallet selector method', async () => {
    await execute(
      testContractCall,
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wallet: mockNearSelectorWallet as any,
      },
    );

    expect(mockNearSelectorWallet.signAndSendTransaction)
      .toHaveBeenCalledWith(transformedSignAndSendCallArgs);
  });

  test('passing multiple calls invokes batch execute', async () => {
    await execute(
      [testContractCall, testContractCall],
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wallet: mockNearSelectorWallet as any,
      },
    );

    expect(
      mockNearSelectorWallet
        .signAndSendTransactions
        .mock
        .calls[0][0]
        .transactions
        .length,
    ).toBe(2);
  });

  test('execute calls through to account (near api) method', async () => {
    await execute(
      testContractCall,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { account: mockNearAccount as any },
    );

    expect(mockNearAccount.signAndSendTransaction)
      .toHaveBeenCalledWith(transformedSignAndSendCallArgs);
  });

  test('multiple calls batch executes with account', async () => {
    await execute(
      [testContractCall, testContractCall],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { account: mockNearAccount as any },
    );

    expect(mockNearAccount.functionCall).toBeCalledTimes(2);
  });

  test('should warn in multiple call failure situation', async () => {
    mockNearAccount.functionCall.mockRejectedValue('thud');
    await execute(
      [testContractCall, testContractCall],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { account: mockNearAccount as any },
    );
    expect(console.error).toBeCalledTimes(2);
  });

  // TODO:
  //  - more signing options?
  //  - inversion of control to passed method?
});
