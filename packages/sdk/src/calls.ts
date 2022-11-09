
import type { Wallet, Account, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers } from 'near-api-js';

export type TransactionArgs = {
  contractAddress: string;
  methodName: string;
  args: object;
};

export type TransactionAttachments = {
  gas: string;
  deposit: string;
};

export type NearContractCall = TransactionArgs &
  TransactionAttachments & {
    signerId: string;
    callbackUrl?: string;
  };

export type NearCallSigningOptions = {
  wallet?: Wallet;
  account?: Account;
};

export class NoSigningMethodPassed extends Error {
  message: string;
}

export const NoSigningMethodPassedError = new NoSigningMethodPassed(
  'A near-api-js Account or near/wallet-selector Wallet is required to sign transactions',
);

const validateSigningOptions = ({ wallet, account }: NearCallSigningOptions): void => {
  if (!wallet && !account) {
    throw NoSigningMethodPassedError;
  }
};

export const execute = (
  call: NearContractCall | NearContractCall[],
  signingOptions: NearCallSigningOptions,
): Promise<void | providers.FinalExecutionOutcome> => {
  validateSigningOptions(signingOptions);

  if (signingOptions.wallet) {
    if (call instanceof Array && call.length > 0){
      return executeMultipleCalls(call, signingOptions);
    }
    else {
      return callContractMethodWithWallet(
        call as NearContractCall,
        signingOptions.wallet,
      );
    }
  }
  // need to disable consistent return
  // browser redirects for signing will never contain the execution outcome.
  // eslint-disable-next-line consistent-return
  return;
};

export const callContractMethod = async (
  call: NearContractCall,
  signingOptions: NearCallSigningOptions,
): Promise<void | providers.FinalExecutionOutcome> => {
  validateSigningOptions(signingOptions);

  if (signingOptions.wallet) {
    return callContractMethodWithWallet(
      call,
      signingOptions.wallet,
    );
  }
  // need to disable consistent return
  // browser redirects for signing will never contain the execution outcome.
  // eslint-disable-next-line consistent-return
  return;
};

export const executeMultipleCalls = async (
  calls: NearContractCall[],
  signingOptions: NearCallSigningOptions,
): Promise<void | providers.FinalExecutionOutcome> => {
  validateSigningOptions(signingOptions);

  if (signingOptions.wallet) {
    return executeMultipleCallsWithWallet(
      calls,
      signingOptions.wallet,
    );
  }
  // need to disable consistent return
  // browser redirects for signing will never contain the execution outcome.
  // eslint-disable-next-line consistent-return
  return;
};


declare type TxnOptionalSignerId = Optional<Transaction, 'signerId'>;

const convertGenericCallToWalletCall = (
  call: NearContractCall,
): BrowserWalletSignAndSendTransactionParams | TxnOptionalSignerId => ({
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

// wallet call translation wrappers
const callContractMethodWithWallet = async (
  call: NearContractCall,
  wallet: Wallet,
): Promise<void | providers.FinalExecutionOutcome> =>
  wallet.signAndSendTransaction(convertGenericCallToWalletCall(call));

const executeMultipleCallsWithWallet = async (
  calls: NearContractCall[],
  wallet: Wallet,
): Promise<void> => {
  wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
  });
};
