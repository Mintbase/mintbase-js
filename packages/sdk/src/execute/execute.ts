
import type { FinalExecutionOutcome } from '@near-wallet-selector/core';
import type { providers } from 'near-api-js';
import { NoSigningMethodPassedError } from '../errors';
import { mbjs } from '../config/config';
import { NearContractCall, NearExecuteOptions } from '../types';
import { checkCallbackUrl, flattenArgs, genericBatchExecute } from './execute.utils';


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
  { wallet, account, callbackUrl = mbjs.keys.callbackUrl, callbackArgs }: NearExecuteOptions,
  ...calls: NearContractCall[]
): Promise<void | providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[] > => {

  validateSigningOptions({ wallet, account });

  const outcomes = await genericBatchExecute(flattenArgs(calls), wallet, account, callbackUrl, callbackArgs);
  if (outcomes && outcomes.length == 1) {
    return outcomes[0];
  }
  
  return checkCallbackUrl(callbackUrl,callbackArgs,wallet,outcomes);

};
