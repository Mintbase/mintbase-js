import type { Wallet, FinalExecutionOutcome } from '@near-wallet-selector/core';
import type { providers, Account } from 'near-api-js';
import type {
  CallBackArgs,
  ContractCall,
  TxnOptionalSignerId,
  NearExecuteOptions,
  ExecuteArgsResponse,
  ComposableCall,
} from '../types';
import BN from 'bn.js';
import { NoSigningMethodPassedError } from '../errors';

/**
 * checkCallbackUrl()
 * method to check if its a regular browser wallet or a InjectedWallet, and make them have the same behavior (redirect) to the desired url.
 * @param callbackUrl url that should redirect after transaction
 * @param callbackArgs metadata that should be passed via url to the success page
 * @returns an outcome object or an array of outcome objects if batching calls {@link FinalExecutionOutcome[]} | {@link FinalExecutionOutcome}, or a redirect to selected callbackUrl
 */
export const checkCallbackUrl = (
  callbackUrl: string,
  callbackArgs: CallBackArgs,
  wallet: Wallet,
  outcomes: void | FinalExecutionOutcome[],
): void | FinalExecutionOutcome[] | FinalExecutionOutcome => {
  const isNotBrowserWallet = wallet?.type !== 'browser';
  const hasCallbackUrl = Boolean(
    typeof window !== 'undefined' && callbackUrl?.length > 0,
  );

  if (hasCallbackUrl && isNotBrowserWallet) {
    const { transactionHash } = checkTransactionHash(outcomes);

    let finalUrl = `${callbackUrl}?transactionHashes=${transactionHash}`;

    if (callbackArgs) {
      const args = JSON.stringify({
        type: callbackArgs?.type ?? '',
        args: callbackArgs?.args ?? '',
      });

      const signMeta = encodeURIComponent(args);

      finalUrl = `${callbackUrl}?transactionHashes=${transactionHash}&signMeta=${signMeta}`;
    }
    return window.location.assign(finalUrl);
  }

  return outcomes && outcomes.length == 1 ? outcomes[0] : outcomes;
};

/**
 * checkTransactionHash()
 * check what transaction receipt to return to the user.
 * @param receipt near transaction Receipt object
 * @returns transactionHash object
 */
const checkTransactionHash = (receipt): { transactionHash: string } => {
  let transactionHash = receipt?.transaction_outcome?.id;

  if (receipt?.length == 1) {
    transactionHash = receipt[0]?.transaction_outcome?.id;
  }

  if (receipt?.length > 1) {
    transactionHash = receipt[1]?.transaction_outcome?.id;
  }

  return { transactionHash };
};

export const callbackUrlFormatter = (
  callbackUrl: string,
  callbackArgs: CallBackArgs,
): string => {
  let url =
    callbackUrl && typeof callbackUrl !== 'undefined' ? callbackUrl : null;

  if (callbackArgs?.type && callbackUrl) {
    const args = JSON.stringify({
      type: callbackArgs?.type,
      args: callbackArgs?.args,
    });

    const signMeta = encodeURIComponent(args);
    url = `${callbackUrl}?signMeta=${signMeta}`;
  }

  return url;
};

export const genericBatchExecute = async (
  call: ContractCall<ExecuteArgsResponse>[],
  wallet: Wallet,
  account: Account,
  callbackUrl: string,
  callbackArgs: CallBackArgs,
): Promise<void | providers.FinalExecutionOutcome[]> => {
  const url = callbackUrlFormatter(callbackUrl, callbackArgs);
  if (wallet) {
    return url
      ? batchExecuteWithBrowserWallet(call, wallet, url, callbackArgs)
      : batchExecuteWithBrowserWallet(call, wallet);
  }
  return batchExecuteWithNearAccount(call, account, url);
};

// account call translation wrappers https://docs.near.org/tools/near-api-js/faq#how-to-send-batch-transactions
// TODO: share batch signature with wallet selector sendAndSignTransaction when method becomes public
const batchExecuteWithNearAccount = async (
  calls: ContractCall<ExecuteArgsResponse>[],
  account: Account,
  callbackUrl?: string,
): Promise<FinalExecutionOutcome[]> => {
  const outcomes: FinalExecutionOutcome[] = [];
  for (const call of calls) {
    try {
      outcomes.push(
        await account.functionCall({
          contractId: call.contractAddress,
          methodName: call.methodName,
          args: call.args,
          gas: new BN(call.gas),
          attachedDeposit: new BN(call.deposit),
          ...(callbackUrl && { walletCallbackUrl: callbackUrl }),
        }),
      );
    } catch (err: unknown) {
      console.error(
        `${call.contractAddress}:${call.methodName} in batch failed: ${err}`,
      );
    }
  }

  return outcomes;
};

const batchExecuteWithBrowserWallet = async (
  calls: ContractCall<ExecuteArgsResponse>[],
  wallet: Wallet,
  callback?: string,
  callbackArgs?: CallBackArgs,
): Promise<void | FinalExecutionOutcome[]> => {
  const res = await wallet.signAndSendTransactions({
    transactions: calls.map(
      convertGenericCallToWalletCall,
    ) as TxnOptionalSignerId[],
    ...(callback && { callbackUrl: callback }),
    ...(callbackArgs && { callbackArgs: callbackArgs }),
  });

  return res;
};

export const convertGenericCallToWalletCall = (
  call: ContractCall<ExecuteArgsResponse>,
): TxnOptionalSignerId => {
  return {
    signerId: call.signerId,
    receiverId: call.contractAddress,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: call.methodName,
          args: call.args,
          gas: call.gas as string,
          deposit: call.deposit as string,
        },
      },
    ],
  };
};

export function flattenArgs(
  calls: ComposableCall[],
): ContractCall<ExecuteArgsResponse>[] {
  const contractCalls: ContractCall<ExecuteArgsResponse>[] = [];
  for (const call of calls) {
    if (
      call instanceof Array &&
      call.length > 0 &&
      (call as ContractCall<ExecuteArgsResponse>[])
    ) {
      call.map((item: ComposableCall) =>
        contractCalls.push(item as ContractCall<ExecuteArgsResponse>),
      );
    } else {
      contractCalls.push(call as ContractCall<ExecuteArgsResponse>);
    }
  }
  return contractCalls;
}

export const validateSigningOptions = ({
  wallet,
  account,
}: NearExecuteOptions): void => {
  if (!wallet && !account) {
    throw NoSigningMethodPassedError;
  }
};
