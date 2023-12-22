
import { connectToNear, Account, KeyStore } from '.';
import { mbjs } from '@mintbase-js/sdk';

/**
 * Connect to a NEAR account `accountId` with credentials in `keyStore` {@link KeyStore}
 *
 * @param call an array or single instance of {@link NearContractCall} to execute
 * @param signingOptions object containing either near wallet selector
 *  wallet: {@link Wallet} or account: {@link Account}, defaults to wallet when present
 * @returns a result for single transactions of {@link FinalExecutionOutcome}, or void for batches
 */

export type Network = 'testnet' | 'mainnet'

export enum RPC_ENDPOINTS  {
  mainnet = 'https://near-mainnet.api.pagoda.co/rpc/v1',
  testnet = 'https://near-testnet.api.pagoda.co/rpc/v1',
}

export const connect = async (
  accountId: string,
  keyStore: KeyStore,
  network: Network = mbjs.keys.network as Network,
): Promise<Account> => {

  const near = await connectToNear({
    keyStore,
    networkId: network ||  mbjs.keys.network as Network,
    nodeUrl: RPC_ENDPOINTS[network] || mbjs.keys.nearRpcUrl,
    headers: {},
  });
  return await near.account(accountId);
};
