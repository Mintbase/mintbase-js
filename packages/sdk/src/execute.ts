
import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NoSigningMethodPassedError } from './errors';

export type ContractCall = {
  contractAddress: string;
  methodName: string;
  args: object;
  gas: string;
  deposit: string;
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
 * @param signing object containing either near wallet selector
 * @param calls  {@link NearContractCall[]} any number of of single calls or compositions
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns an outcome object or an array of outcome objects if batching calls {@link FinalExecutionOutcome[]} | {@link FinalExecutionOutcome}
 */
export const execute = async (
  { wallet, account }: NearCallSigningOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {
  validateSigningOptions({ wallet, account });
  
  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account);
  if (outcomes && outcomes.length == 1) {
    return outcomes[0];    
  }
  return outcomes;

};

const genericBatchExecute = async (call: ContractCall[], wallet: Wallet, account: Account): Promise<void | providers.FinalExecutionOutcome[]> =>{
  if (wallet) {
    return batchExecuteWithBrowserWallet(call, wallet);
  }
  return batchExecuteWithNearAccount(call, account);
 
};

// account call translation wrappers https://docs.near.org/tools/near-api-js/faq#how-to-send-batch-transactions
// TODO: share batch signature with wallet selector sendAndSignTransaction when method becomes public

const batchExecuteWithNearAccount = async (
  calls: ContractCall[],
  account: Account,
): Promise<FinalExecutionOutcome[]> => {
  const outcomes: FinalExecutionOutcome[] =[];
  for (const call of calls) {
    try {
      outcomes.push(await account.functionCall({
        contractId: call.contractAddress,
        methodName: call.methodName,
        args: call.args,
        gas: call.gas,
        attachedDeposit: call.deposit,
      }));
    } catch (err: unknown) {
      console.error(
        `${call.contractAddress}:${call.methodName} in batch failed: ${err}`,
      );
    }
  }
  return outcomes;
};

const batchExecuteWithBrowserWallet = async (
  calls: ContractCall[],
  wallet: Wallet,
): Promise<void | FinalExecutionOutcome[]> => {
  return await wallet.signAndSendTransactions({
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

function flattenArgs(calls: NearContractCall[]): ContractCall[] {
  const contractCalls: ContractCall[] =[];
  for (const call of calls) {
    if (call instanceof Array && call.length > 0 && call as ContractCall[]) {
      call.map(item => contractCalls.push(item as ContractCall));
    } else {
      contractCalls.push(call as ContractCall);
    }
  }
  return contractCalls;
}


