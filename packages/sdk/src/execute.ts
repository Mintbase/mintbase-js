
import type { Wallet, FinalExecutionOutcome, Optional, Transaction } from '@near-wallet-selector/core';
import { BrowserWalletSignAndSendTransactionParams } from '@near-wallet-selector/core/lib/wallet';
import type { providers, Account } from 'near-api-js';
import { NoSigningMethodPassedError } from './errors';
import BN from 'bn.js';

export enum TransactionSuccessEnum {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  DEPLOY_STORE = 'deploy-store',
  MAKE_OFFER = 'make-offer',
  REVOKE_MINTER = 'revoke-minter',
  ADD_MINTER = 'add-minter',
  TRANSFER_STORE_OWNERSHIP = 'transfer-store-ownership',
  AUCTION_LIST = 'list',
  SIMPLE_SALE_LIST = 'simple-sale-list',
  UNLIST = 'unlist',
  TAKE_OFFER = 'take-offer',
  WITHDRAW_OFFER = 'withdraw-offer',
}

type CallBackArgs =  {
  args: object;
  type: TransactionSuccessEnum;
}

export type ContractCall = {
  contractAddress: string;
  methodName: string;
  args: object;
  gas: string | BN;
  deposit: string | BN;
  signerId?: string;
  callbackUrl?: string;
  meta?: CallBackArgs;
  };

export type NearContractCall = ContractCall | ContractCall[]

export type NearExecuteOptions = {
  wallet?: Wallet;
  account?: Account;
  callbackUrl?: string;
  callbackArgs?: CallBackArgs;  
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
  { wallet, account, callbackUrl, callbackArgs }: NearExecuteOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {

  validateSigningOptions({ wallet, account });

  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account, callbackUrl, callbackArgs);
  if (outcomes && outcomes.length == 1) {
    console.log('first outcome', outcomes[0]);
    return outcomes[0];
  }
  console.log('first outcome', outcomes);

  const browserWallets = ['my-near-wallet', 'near-wallet'];
  const IsntBrowserWallets = !browserWallets.includes(wallet?.id);
  const hasCallbackUrl = Boolean(typeof window !== 'undefined' && callbackUrl?.length > 0);
  console.log(hasCallbackUrl, 'hasCallbackUrl');

  if (hasCallbackUrl && IsntBrowserWallets) {
    console.log('hit window', hasCallbackUrl);

    const { transactionHash } = checkTransactionHash(outcomes);
    
    let finalUrl = `${callbackUrl}?transactionHash=${transactionHash}`;

    if (callbackArgs) {
      finalUrl = `${callbackUrl}?transactionHash=${transactionHash}&signMeta=${callbackArgs}`;
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

const genericBatchExecute = async (call: ContractCall[], wallet: Wallet, account: Account, callbackUrl: string , callbackArgs: CallBackArgs): Promise<void | providers.FinalExecutionOutcome[]> =>{

  let url = callbackUrl;

  if (callbackArgs?.type) {

    const args = JSON.stringify({
      type: callbackArgs?.type,
      args: callbackArgs?.args,
    });

    const signMeta = encodeURIComponent(args);

      
    url = `${callbackUrl}/?signMeta=${signMeta}`;
  }

  console.log(wallet);

  console.log(callbackUrl, url, 'url');

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


