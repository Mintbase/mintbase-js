import { AccountParams } from '../types';
import { queryNearRpc } from '../util';

export const accountExists = async ({accountId, rpcUrl}: AccountParams): Promise<boolean> => {

  const res = await queryNearRpc({
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
    method: 'query',
    rpcUrl})

  if (res?.error) {
    return false;
  }
  return true;
};
