import { Network } from '@mintbase-js/sdk';
import { callViewMethod } from '../util';

interface FTStorageProps {
  contractId: string;
  accountId: string;
  network?: Network;
  rpc?: 'near' | 'lava';
}

export const ftStorageBalance = async ({ contractId, accountId, network, rpc }: FTStorageProps): Promise<string | null> => {
  const balance = await callViewMethod<{ total: string; available: string } | null>({
    contractId,
    method: 'storage_balance_of',
    args: { account_id: accountId },
    network: network,
    rpc: rpc,
  });

  return balance?.total || null;
};
