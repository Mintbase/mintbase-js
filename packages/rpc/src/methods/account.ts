import { requestFromNearRpc } from '../util';

export const accountExists = async (accountId: string, network?: string): Promise<boolean> => {
  const response = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
  }, network);

  if (response?.error) {
    return false;
  }
  return true;
};
