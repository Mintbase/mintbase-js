import type { providers } from 'near-api-js';
import type { ComposableCall, NearExecuteOptions } from '../types';
import {
  checkCallbackUrl,
  flattenArgs,
  genericBatchExecute,
  validateSigningOptions,
} from './execute.utils';

/**
 * Base method for executing contract calls.
 * @param signing object containing either near wallet selector
 * @param calls  {@link NearContractCall[]} any number of single calls or array of calls
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns an outcome object or an array of outcome objects if batching calls {@link FinalExecutionOutcome[]} | {@link FinalExecutionOutcome}, or a redirect to selected callbackUrl
 */
export const execute = async (
  { wallet, account, callbackUrl, callbackArgs }: NearExecuteOptions,
  ...calls: ComposableCall[]
): Promise<
  void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[]
> => {
  validateSigningOptions({ wallet, account });

  let callbackFinal = callbackUrl;

  const shouldGetFromMbjs = callbackUrl?.length < 1 || callbackUrl === undefined && 
   window?.['mbjs']?.callbackUrl && window?.['mbjs']?.callbackUrl.length > 0; 

  if (wallet?.id == 'mintbase-wallet') {
    if (callbackUrl?.length < 1 || callbackUrl === undefined) {
      let mbjsCallbackUrl = '';

      if (
        window?.['mbjs']?.callbackUrl &&
        window?.['mbjs']?.callbackUrl.length > 0
      ) {
        mbjsCallbackUrl = window?.['mbjs']?.callbackUrl;
      }

      const globalCBUrl =
        localStorage?.getItem('mintbase-wallet:callback_url') || mbjsCallbackUrl;

      callbackFinal = globalCBUrl;
    }
  }

  if (shouldGetFromMbjs) {
    callbackFinal =  window?.['mbjs']?.callbackUrl;
  } 

  const outcomes = await genericBatchExecute(
    flattenArgs(calls),
    wallet,
    account,
    callbackFinal,
    callbackArgs,
  );

  return checkCallbackUrl(callbackFinal, callbackArgs, wallet, outcomes);
};
