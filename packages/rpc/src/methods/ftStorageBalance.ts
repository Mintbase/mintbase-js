import { FTParams } from '../types';
import { callViewMethod } from '../util';

export const ftStorageBalance = async ({ contractId, accountId,  rpcUrl }: FTParams): Promise<string | null> => {
  const balance = await callViewMethod<{ total: string; available: string } | null>({
    contractId,
    method: 'storage_balance_of',
    args: { account_id: accountId },
    rpcUrl: rpcUrl,
  });

  return balance?.total || null;
};
