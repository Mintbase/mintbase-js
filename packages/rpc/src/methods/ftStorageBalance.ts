import { callViewMethod } from '../util';

export const ftStorageBalance = async ({ contractId, accountId, network }): Promise<string | null> => {
  const balance = await callViewMethod<{ total: string; available: string } | null>({
    contractId,
    method: 'storage_balance_of',
    args: { account_id: accountId },
    network: network,
  });

  return balance?.total || null;
};
