import { execute, NearContractCall } from './execute';
import { MAX_GAS, ONE_YOCTO } from './constants';
import { NoSigningMethodPassedError } from './errors';
import BN from 'bn.js';

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


    const transactions = { 'transactions' : [{
      actions:[{
        params: {
          args: testArgs,
          methodName: testMethod,
          gas: MAX_GAS,
          deposit: ONE_YOCTO,
        },
        type: 'FunctionCall',
      }],
      callbackUrl: testCallbackUrl,
      receiverId: testContract,
      signerId: testSigner,
    }] };

    expect(mockNearSelectorWallet.signAndSendTransactions)
      .toHaveBeenCalledWith(transactions);

  });

  test('passing multiple calls and composition works', async () => {
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
    ).toBe(3);
  });

  test('execute calls through to account (near api) method', async () => {
    await execute(
      { account: mockNearAccount as any },
      testContractCall,

    );

    const expectedCallArgs = {
      contractId: testContract,
      methodName: testMethod,
      args: testArgs,
      gas: new BN(MAX_GAS),
      attachedDeposit: new BN(ONE_YOCTO),

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

  test('should warn in multiple call failure situation', async () => {
    mockNearAccount.functionCall.mockRejectedValue('thud');
    await execute(
      { account: mockNearAccount as any },
      [testContractCall, testContractCall], testContractCall,

    );
    expect(console.error).toBeCalledTimes(3);
  });

});
