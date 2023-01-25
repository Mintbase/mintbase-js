
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
  { wallet, account, callbackUrl }: NearExecuteOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {
  validateSigningOptions({ wallet, account });

  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account, callbackUrl);
  if (outcomes && outcomes.length == 1) {
    console.log('first outcome', outcomes[0]);

 
    return outcomes[0];
  }
  console.log('first outcome', outcomes);
  console.log(callbackUrl, 'typeof window !== undefined && callbackUrl');


  if (callbackUrl) {
    console.log('hit window');

    const { transactionHash } = checkTransactionHash(outcomes);
    return window.location.assign(`${callbackUrl}?transactionHash=${transactionHash}`);

  }

  return outcomes;

};

const checkTransactionHash = (receipt): {transactionHash: string}  => {
 
  let transactionHash = receipt?.transaction_outcome?.id;

  if (receipt?.length == 1) {
    transactionHash = receipt[0]?.transaction_outcome?.id;
  }

  if (receipt?.length > 1) {
    transactionHash = receipt[1]?.transaction_outcome?.id;
  }

  return { transactionHash };
};

const genericBatchExecute = async (call: ContractCall[], wallet: Wallet, account: Account, callbackUrl: string): Promise<void | providers.FinalExecutionOutcome[]> =>{

  console.log(wallet);

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

  console.log('outcomesoutcomesoutcomes', outcomes);

  return outcomes;
};

const batchExecuteWithBrowserWallet = async (
  calls: ContractCall[],
  wallet: Wallet,
  callback: string,
): Promise<void | FinalExecutionOutcome[]> => {

  const res = await wallet.signAndSendTransactions({
    transactions: calls.map(convertGenericCallToWalletCall) as TxnOptionalSignerId[],
    callbackUrl: callback,
  });

  console.log('wallet call,', res);


  return res;
};

//////////// UTILS ////////////

declare type TxnOptionalSignerId = Optional<Transaction, 'signerId'>;

const convertGenericCallToWalletCall = (
  call: ContractCall,
): BrowserWalletSignAndSendTransactionParams | TxnOptionalSignerId => {

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


