
import type { Wallet, Account, FinalExecutionOutcome } from '@near-wallet-selector/core';
import type { providers } from 'near-api-js';

export type NearContractCall = {
  signerId: string;
  contractAddress: string;
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
  callbackUrl?: string;
}

export type NearCallSigningOptions = {
  wallet?: Wallet;
  account?: Account;
};

export class NoSigningMethodPassed extends Error {
  message: string;
}

export const callContractMethodWithWallet = async (
  call: NearContractCall,
  wallet: Wallet,
): Promise<void | providers.FinalExecutionOutcome> => {
  return wallet.signAndSendTransaction({
    signerId: call.signerId,
    receiverId: call.contractAddress,
    callbackUrl: call.callbackUrl,
    actions:[{
      type: 'FunctionCall',
      params: {
        methodName: call.methodName,
        args: call.args,
        gas: call.gas,
        deposit: call.deposit,
      },
    }],
  });
};

export const callContractMethod = async (
  call: NearContractCall,
  { wallet, account }: NearCallSigningOptions,
): Promise<void | providers.FinalExecutionOutcome> => {
  if (!wallet && !account) {
    throw new NoSigningMethodPassed(
      'A near-api-js Account or near/wallet-selector Wallet is required to sign transactions',
    );
  }

  if (wallet) {
    return callContractMethodWithWallet(call, wallet);
  }
  // need to disable consistent return
  // browser redirects for signing will never contain the execution outcome.
  // eslint-disable-next-line consistent-return
  return;
};


