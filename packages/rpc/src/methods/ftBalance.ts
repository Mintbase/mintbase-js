import { callViewMethod } from '../util';

interface FTBalanceProps {
  contractId: string;
  accountId: string;
  rpcUrl?: string
}

export const ftBalance = async ({ contractId, accountId, rpcUrl }: FTBalanceProps): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
    rpcUrl,
  });
};
