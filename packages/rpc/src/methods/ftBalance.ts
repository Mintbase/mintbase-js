import { callViewMethod } from '../util';

export const ftBalance = async ({ contractId, accountId }): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
  });
};
