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

    token_id: 'fake.token.id',

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
    functionCall: jest.fn(),
  };

  beforeAll(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('execute should throw without a valid signing method ', () => {
    expect(execute({}, testContractCall ))
      .rejects
      .toThrow(NoSigningMethodPassedError);
  });

  test('execute calls through to browser wallet selector method', async () => {
    await execute(
      {
        wallet: mockNearSelectorWallet as any,
      },
      testContractCall,
    );

    const expectedCallArgs: BrowserWalletSignAndSendTransactionParams = {
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
    expect(mockNearSelectorWallet.signAndSendTransaction)
      .toHaveBeenCalledWith(expectedCallArgs);
  });

  test('passing multiple calls invokes batch execute', async () => {
    await execute(
      {
        wallet: mockNearSelectorWallet as any,
      },
      [testContractCall, testContractCall], testContractCall,
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
      { account: mockNearAccount as any },
      testContractCall,
      
    );

    const expectedCallArgs: FunctionCallOptions = {
      contractId: testContract,
      methodName: testMethod,
      args: testArgs,
      gas: MAX_GAS,
      attachedDeposit: ONE_YOCTO,

    };
    expect(mockNearAccount.functionCall)
      .toHaveBeenCalledWith(expectedCallArgs);
  });

  test('multiple calls batch executes with account', async () => {
    await execute(
      { account: mockNearAccount as any },
      testContractCall, testContractCall, [testContractCall], [testContractCall, testContractCall],
      
    );

    expect(mockNearAccount.functionCall).toBeCalledTimes(5);
  });

  // test('should warn in multiple call failure situation', async () => {
  //   mockNearAccount.functionCall.mockRejectedValue('thud');
  //   await execute(
  //     { account: mockNearAccount as any },
  //     [testContractCall, testContractCall], testContractCall,
      
  //   );
  //   expect(console.error).toBeCalledTimes(3);
  // });

  // TODO:
  //  - more signing options?
  //  - inversion of control to passed method?

});
