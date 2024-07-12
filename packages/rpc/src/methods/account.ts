import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export const accountExists = async (accountId: string, network?: Network, rpc?: RPC_OPTIONS, rpcUrl?: string): Promise<boolean> => {
  const response = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
  }, network, rpc, rpcUrl);

  if (response?.error) {
    return false;
  }
  return true;
};
