
import { mbjs, Network } from '@mintbase-js/sdk';
import { connectToNear, Account, KeyStore } from '.';

/**
 * Connect to a NEAR account `accountId` with credentials in `keyStore` {@link KeyStore}
 *
 * @param call an array or single instance of {@link NearContractCall} to execute
 * @param signingOptions object containing either near wallet selector
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns a result for single transactions of {@link FinalExecutionOutcome}, or void for batches
 */
export const connect = async (
  accountId: string,
  keyStore: KeyStore,
  network: Network = mbjs.keys.network,
): Promise<Account> => {
  const near = await connectToNear({
    keyStore,
    networkId: network || mbjs.keys.network,
    nodeUrl: `https://rpc.${network}.near.org` || mbjs.keys.nearRpcUrl,
    headers: {},
  });
  return await near.account(accountId);
};
