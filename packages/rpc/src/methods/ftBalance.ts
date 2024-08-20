import { FTParams } from '../types';
import { callViewMethod } from '../util';

export const ftBalance = async ({ contractId, accountId, rpcUrl }: FTParams): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
    rpcUrl,
  });
};
