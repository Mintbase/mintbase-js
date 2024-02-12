import { Network } from '@mintbase-js/sdk';
import { callViewMethod } from '../util';

interface FTBalanceProps {
  contractId: string;
  accountId: string;
  network?: Network;
}

export const ftBalance = async ({ contractId, accountId, network }: FTBalanceProps): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
    network: network,
  });
};
