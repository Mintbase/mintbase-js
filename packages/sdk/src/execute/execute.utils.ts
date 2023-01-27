import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NearContractCall, CallBackArgs, ContractCall, TxnOptionalSignerId, NearExecuteOptions } from '../types';
import BN from 'bn.js';
import { NoSigningMethodPassedError } from '../errors';

export const checkCallbackUrl = (callbackUrl: string, callbackArgs: CallBackArgs ,wallet: Wallet, outcomes: void | FinalExecutionOutcome[]): void | FinalExecutionOutcome[] => {

  const browserWallets = ['my-near-wallet', 'near-wallet'];
  const IsntBrowserWallets = !browserWallets.includes(wallet?.id);
  const hasCallbackUrl = Boolean(typeof window !== 'undefined' && callbackUrl?.length > 0);
  
  if (hasCallbackUrl && IsntBrowserWallets) {
    
    const { transactionHash } = checkTransactionHash(outcomes);
    
    let finalUrl = `${callbackUrl}?transactionHash=${transactionHash}`;

    if (callbackArgs) {

      const args = JSON.stringify({
        type: callbackArgs?.type ?? '',
        args: callbackArgs?.args ?? '',
      });

      const signMeta = encodeURIComponent(args);
      
      finalUrl = `${callbackUrl}?transactionHash=${transactionHash}&signMeta=${signMeta}`;
    }
    return window.location.assign(finalUrl);
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


export const callbackUrlFormatter = (callbackUrl: string, callbackArgs: CallBackArgs): string => {
  let url = callbackUrl;

  if (callbackArgs?.type) {
    const args = JSON.stringify({
      type: callbackArgs?.type,
      args: callbackArgs?.args,
    });

    const signMeta = encodeURIComponent(args);
    url = `${callbackUrl}/?signMeta=${signMeta}`;
  }

  return url;
};

export const genericBatchExecute 
 = async (call: ContractCall[], wallet: Wallet, account: Account, callbackUrl: string , callbackArgs: CallBackArgs): Promise<void | providers.FinalExecutionOutcome[]> =>{

   const url = callbackUrlFormatter(callbackUrl, callbackArgs);

   if (wallet) {
     return batchExecuteWithBrowserWallet(call, wallet, url);
   }
   return batchExecuteWithNearAccount(call, account, url);

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

  return res;
};


export const convertGenericCallToWalletCall = (
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

export function flattenArgs(calls: NearContractCall[]): ContractCall[] {
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


export const validateSigningOptions = ({ wallet, account }: NearExecuteOptions): void => {
  if (!wallet && !account) {
    throw NoSigningMethodPassedError;
  }
};
