import { callViewMethod } from '../util';

export const ftBalance = async ({ contractId, accountId, network }): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
    network: network,
  });
};
