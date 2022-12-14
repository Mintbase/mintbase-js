
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

export type ContractCall = TransactionArgs &
  TransactionAttachments & {
    signerId?: string;
    callbackUrl?: string;
  };

export type NearContractCall = ContractCall | ContractCall[]

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
  { wallet, account }: NearCallSigningOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome> => {
  validateSigningOptions({ wallet, account });

  for (const call of calls) {
    if (call instanceof Array && call.length > 0) {
      await genericBatchExecute(call as ContractCall[], wallet, account);
    }
    await genericExecute(call as ContractCall, wallet, account);
  }

};

const genericBatchExecute = async (call: ContractCall[], wallet: Wallet, account: Account): Promise<void | providers.FinalExecutionOutcome> =>{
  if (wallet) {
    return batchExecuteWithBrowserWallet(call, wallet);
  }
  return batchExecuteWithNearAccount(call, account);
 
};

const genericExecute = async (call: ContractCall, wallet: Wallet, account: Account): Promise<void | providers.FinalExecutionOutcome> =>{
  if (wallet) {
    return executeWithBrowserWallet(call, wallet);
  }
  return executeWithNearAccount(call, account);
};


////////////  NEAR ACCOUNT METHODS ////////////

// account call translation wrappers
// TODO: share batch signature with wallet selector sendAndSignTransaction when method becomes public
// https://docs.near.org/tools/near-api-js/faq#how-to-send-batch-transactions

const executeWithNearAccount = async (
  call: ContractCall,
  account: Account,
): Promise<void | providers.FinalExecutionOutcome> => account.functionCall({
  contractId: call.contractAddress,
  methodName: call.methodName,
  args: call.args,
  gas: call.gas,
  attachedDeposit: call.deposit,
});


const batchExecuteWithNearAccount = async (
  calls: ContractCall[],
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


////////////  BROWSER WALLET METHODS ////////////

const executeWithBrowserWallet = async (
  call: ContractCall,
  wallet: Wallet,
): Promise<void | providers.FinalExecutionOutcome> =>
  wallet.signAndSendTransaction(convertGenericCallToWalletCall(call));

const batchExecuteWithBrowserWallet = async (
  calls: ContractCall[],
  wallet: Wallet,
): Promise<void> => {
  await wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
  });
};

//////////// UTILS ////////////

declare type TxnOptionalSignerId = Optional<Transaction, 'signerId'>;

const convertGenericCallToWalletCall = (
  call: ContractCall,
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


