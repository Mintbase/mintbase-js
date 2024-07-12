import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, callViewMethod } from '../util';

interface FTStorageProps {
  contractId: string;
  accountId: string;
  network?: Network;
  rpc?: RPC_OPTIONS;
  rpcUrl?: string
}

export const ftStorageBalance = async ({ contractId, accountId, network, rpc, rpcUrl }: FTStorageProps): Promise<string | null> => {
  const balance = await callViewMethod<{ total: string; available: string } | null>({
    contractId,
    method: 'storage_balance_of',
    args: { account_id: accountId },
    network: network,
    rpc: rpc,
    rpcUrl: rpcUrl,
  });

  return balance?.total || null;
};
