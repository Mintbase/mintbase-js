
import type { FinalExecutionOutcome } from '@near-wallet-selector/core';
import type { providers } from 'near-api-js';
import { mbjs } from '../config/config';
import { ComposableCall, NearExecuteOptions } from '../types';
import { checkCallbackUrl, flattenArgs, genericBatchExecute, validateSigningOptions } from './execute.utils';


/**
 * Base method for executing contract calls.
 * @param signing object containing either near wallet selector
 * @param calls  {@link NearContractCall[]} any number of single calls or array of calls
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns an outcome object or an array of outcome objects if batching calls {@link FinalExecutionOutcome[]} | {@link FinalExecutionOutcome}, or a redirect to selected callbackUrl
 */

export const execute = async (
  { wallet, account, callbackUrl = mbjs.keys.callbackUrl, callbackArgs }: NearExecuteOptions,
  ...calls: ComposableCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {

  validateSigningOptions({ wallet, account });

  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account, callbackUrl, callbackArgs);

  return checkCallbackUrl(callbackUrl, callbackArgs, wallet, outcomes);

};
