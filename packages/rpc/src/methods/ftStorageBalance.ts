import { callViewMethod } from '../util';

interface FTStorageProps {
  contractId: string;
  accountId: string;
  rpcUrl?: string
}

export const ftStorageBalance = async ({ contractId, accountId,  rpcUrl }: FTStorageProps): Promise<string | null> => {
  const balance = await callViewMethod<{ total: string; available: string } | null>({
    contractId,
    method: 'storage_balance_of',
    args: { account_id: accountId },
    rpcUrl: rpcUrl,
  });

  return balance?.total || null;
};
