
import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NoSigningMethodPassedError } from './errors';
import BN from 'bn.js';

export type TransactionArgs = {
  contractAddress: string;
  methodName: string;
  args: object;
};

export type TransactionAttachments = {
  gas: BN | string;
  deposit: BN | string;
};

export type NearContractCall = TransactionArgs &
  TransactionAttachments & {
    signerId?: string;
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
      return await executeWithBrowserWallet(
        call as NearContractCall,
        wallet,
      );
    }
  }

  if (call instanceof Array && call.length > 0) {
    return batchExecuteWithNearAccount(call, account);
  }

  return await executeWithNearAccount(call as NearContractCall, account);
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
      gas: call.gas as string,
      deposit: call.deposit as string,
    },
  }],
});

// wallet call translation wrappers
const executeWithBrowserWallet = async (
  call: NearContractCall,
  wallet: Wallet,
): Promise<void | providers.FinalExecutionOutcome> =>
  wallet.signAndSendTransaction(convertGenericCallToWalletCall(call));

const batchExecuteWithBrowserWallet = async (
  calls: NearContractCall[],
  wallet: Wallet,
): Promise<void> => {
  await wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
  });
};

// account call translation wrappers
// TODO: newer version? of near-api-js seem to indicate they support the same
// signature as the wallet selector sendAndSignTransaction
// https://docs.near.org/tools/near-api-js/faq#how-to-send-batch-transactions
// looked into this more, and unfortunately the method is marked private causing
// difficult to debug typescript errors but on main branch it appears they have removed the protected annotation but the release tag still has it
// This will all work fine for now, but would be good to eventually share the same call signature
// that could assist with batch optimizations.
const executeWithNearAccount = async (
  call: NearContractCall,
  account: Account,
): Promise<void | providers.FinalExecutionOutcome> => account.functionCall({
  contractId: call.contractAddress,
  methodName: call.methodName,
  args: call.args,
  gas: call.gas as BN,
  attachedDeposit: call.deposit as BN,
});

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
        gas: call.gas as BN,
        attachedDeposit: call.deposit as BN,
      });
    } catch (err: unknown) {
      console.error(
        `${call.contractAddress}:${call.methodName} in batch failed: ${err}`,
      );
    }
  }
};
