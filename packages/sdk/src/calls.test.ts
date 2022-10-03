import {
  BrowserWalletSignAndSendTransactionParams,
} from '@near-wallet-selector/core/lib/wallet';
import { callContractMethod, NearContractCall, NoSigningMethodPassed } from './calls';
import { MAX_GAS, ONE_YOCTO } from './constants';

describe('contract method calls', () => {
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
  };

  it('callContractMethod should throw without at least one method ', async () => {
    expect(
      callContractMethod(testContractCall, {}),
    ).rejects.toThrow(NoSigningMethodPassed);
  });

  it('calls through to browser wallet selector method', async () => {
    await callContractMethod(
      testContractCall,
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wallet: mockNearSelectorWallet as any,
      },
    );

    const expectedCallSignature: BrowserWalletSignAndSendTransactionParams = {
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
      .toHaveBeenCalledWith(expectedCallSignature);

  });

  // TODO:
  //  - pass direct near Account as signing option
  //  - more signing options?
  //  - inversion of control to passed method?

});
