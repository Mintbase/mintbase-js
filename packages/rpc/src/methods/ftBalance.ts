import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, callViewMethod } from '../util';

interface FTBalanceProps {
  contractId: string;
  accountId: string;
  network?: Network;
  rpc?: RPC_OPTIONS;
  rpcUrl?: string
}

export const ftBalance = async ({ contractId, accountId, network, rpc, rpcUrl }: FTBalanceProps): Promise<string> => {
  return callViewMethod<string>({
    contractId,
    method: 'ft_balance_of',
    args: { account_id: accountId },
    network: network,
    rpc,
    rpcUrl,
  });
};
