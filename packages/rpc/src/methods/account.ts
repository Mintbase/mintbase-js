import { AccountParams } from '../types';
import { callNearRpc } from '../util';

export const accountExists = async ({ accountId, rpcUrl }: AccountParams): Promise<boolean> => {

  const res = await callNearRpc({
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
    method: 'query',
    rpcUrl });

  if (res?.error) {
    return false;
  }
  return true;
};
