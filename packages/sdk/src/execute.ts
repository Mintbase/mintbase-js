
import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NoSigningMethodPassedError } from './errors';
import BN from 'bn.js';

export type ContractCall = {
  contractAddress: string;
  methodName: string;
  args: object;
  gas: string | BN;
  deposit: string | BN;
  signerId?: string;
  callbackUrl?: string;
  };

export type NearContractCall = ContractCall | ContractCall[]

export type NearExecuteOptions = {
  wallet?: Wallet;
  account?: Account;
  callbackUrl?: string;
 
};

const validateSigningOptions = ({ wallet, account }: NearExecuteOptions): void => {
  if (!wallet && !account) {
    throw NoSigningMethodPassedError;
  }
};

/**
 * Base method for executing contract calls.
 * @param signing object containing either near wallet selector
 * @param calls  {@link NearContractCall[]} any numberw of of single calls or compositions
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns an outcome object or an array of outcome objects if batching calls {@link FinalExecutionOutcome[]} | {@link FinalExecutionOutcome}
 */
export const execute = async (
  { wallet, account,   callbackUrl }: NearExecuteOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {
  validateSigningOptions({ wallet, account });

  console.log(callbackUrl, 'callbackUrl');

  console.log('wallet', wallet);

  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account, callbackUrl);
  if (outcomes && outcomes.length == 1) {
    return outcomes[0];
  }
  return outcomes;

};

const genericBatchExecute = async (call: ContractCall[], wallet: Wallet, account: Account, callbackUrl: string): Promise<void | providers.FinalExecutionOutcome[]> =>{

  console.log(callbackUrl, 'callbackUrl genericBatchExecute');

  if (wallet) {
    return batchExecuteWithBrowserWallet(call, wallet, callbackUrl);
  }
  return batchExecuteWithNearAccount(call, account, callbackUrl);

};

// account call translation wrappers https://docs.near.org/tools/near-api-js/faq#how-to-send-batch-transactions
// TODO: share batch signature with wallet selector sendAndSignTransaction when method becomes public

const batchExecuteWithNearAccount = async (
  calls: ContractCall[],
  account: Account,
  callbackUrl: string,
): Promise<FinalExecutionOutcome[]> => {
  const outcomes: any[] =[];
  for (const call of calls) {
    console.log(call , 'batchExecuteWithNearAccountbatchExecuteWithNearAccount call');
    console.log(callbackUrl , 'batchExecuteWithNearAccount callbackUrl');

    try {
      outcomes.push(await account.functionCall({
        contractId: call.contractAddress,
        methodName: call.methodName,
        args: call.args,
        gas: new BN(call.gas),
        attachedDeposit: new BN(call.deposit),
        walletCallbackUrl: callbackUrl,
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
  callback: string,
): Promise<void | FinalExecutionOutcome[]> => {

  console.log(wallet, 'wallet  batchExecuteWithBrowserWallet');
  console.log(callback, 'callback  batchExecuteWithBrowserWallet');


  return await wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
    callbackUrl: callback,
  });
};

//////////// UTILS ////////////

declare type TxnOptionalSignerId = Optional<Transaction, 'signerId'>;

const convertGenericCallToWalletCall = (
  call: ContractCall,
): BrowserWalletSignAndSendTransactionParams | TxnOptionalSignerId => {

  console.log(call , 'convertGenericCallToWalletCall call');
  console.log(call.callbackUrl , 'convertGenericCallToWalletCall callbackUrl');

  return {
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
  };
};

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


