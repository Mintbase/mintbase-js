
import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NoSigningMethodPassedError } from './errors';

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

const validateSigningOptions = ({ wallet, account }: NearCallSigningOptions): void => {
  if (!wallet && !account) {
    throw NoSigningMethodPassedError;
  }
};

/**
 * Base method for executing contract calls.
 *
 * @param call an array or single instance of {@link NearContractCall} to execute
 * @param signing object containing either near wallet selector
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns a result for single transactions of {@link FinalExecutionOutcome}, or void for batches
 */
export const execute = async (
  call: NearContractCall | NearContractCall[],
  { wallet, account }: NearCallSigningOptions,
): Promise<void | providers.FinalExecutionOutcome> => {
  validateSigningOptions({ wallet, account });

  if (wallet) {
    if (call instanceof Array && call.length > 0) {
      return await batchExecuteWithBrowserWallet(call, wallet);
    } else {
      return await executeTransaction(
        call as NearContractCall,
        wallet,
      );
    }
  }

  if (call instanceof Array && call.length > 0) {
    return batchExecuteWithNearAccount(call, account);
  }

  return await executeTransaction(call as NearContractCall, account);
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
const executeTransaction = async (
  call: NearContractCall,
  signer: Wallet | Account,
): Promise<void | providers.FinalExecutionOutcome> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  signer.signAndSendTransaction(convertGenericCallToWalletCall(call));

const batchExecuteWithBrowserWallet = async (
  calls: NearContractCall[],
  wallet: Wallet,
): Promise<void> => {
  wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
  });
};

// TODO: investigate ways to re-use batch actions with transaction signature for batching with NAJ accounts.
// Possible limitation, the signature requires a single receiverId (contract).
// Do we want to support full batching using multiple calls? Note - this would be server side only.
// Testing lib will help with this, and to report results
const batchExecuteWithNearAccount = async (
  calls: NearContractCall[],
  account: Account,
): Promise<void> => {
  for (const call of calls) {
    try {
      await account.functionCall({
        contractId: call.contractAddress,
        methodName: call.methodName,
        args: call.args,
        gas: call.gas,
        attachedDeposit: call.deposit,
      });
    } catch (err: unknown) {
      console.error(
        `${call.contractAddress}:${call.methodName} in batch failed: ${err}`,
      );
    }
  }
};
