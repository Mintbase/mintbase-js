import type { ComposableCall, NearExecuteOptions } from '../types';
import {
  checkCallbackUrl,
  flattenArgs,
  genericBatchExecute,
  validateSigningOptions,
} from './execute.utils';
import { callbackSideCheck } from './checkCallback';
import type { FinalExecutionOutcome } from '@near-js/types'; // Ensure consistent type import
import type { FinalExecutionOutcome as WalletSelectorFinalExecutionOutcome } from '@near-wallet-selector/core/node_modules/@near-js/types/lib/provider/response'; // Import the type directly

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
  void | FinalExecutionOutcome | FinalExecutionOutcome[]
> => {
  validateSigningOptions({ wallet, account });

  // check if execute is client side and return callback from global object, if not return callback from param
  const callbackFinal = callbackSideCheck(callbackUrl, wallet);

  const outcomes = await genericBatchExecute(
    flattenArgs(calls),
    wallet,
    account,
    callbackFinal,
    callbackArgs,
  );

  return checkCallbackUrl(
    callbackFinal,
    callbackArgs,
    wallet,
    outcomes as WalletSelectorFinalExecutionOutcome[]  );
};
