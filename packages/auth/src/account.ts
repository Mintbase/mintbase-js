
import { connectToNear, Account, KeyStore } from '.';

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
  mainnet = 'https://rpc.mainnet.near.org',
  testnet = 'https://rpc.testnet.near.org',
}

export const connect = async (
  accountId: string,
  keyStore: KeyStore,
  network: Network = globalThis.mbjs.keys.network as Network,
): Promise<Account> => {
  
  const near = await connectToNear({
    keyStore,
    networkId: network ||  globalThis.mbjs.keys.network as Network,
    nodeUrl: RPC_ENDPOINTS[network] || globalThis.mbjs.keys.nearRpcUrl,
    headers: {},
  });
  return await near.account(accountId);
};
