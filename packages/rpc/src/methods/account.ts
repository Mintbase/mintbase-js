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
    rpcUrl,
  });

  console.log({ res });

  if (res?.error && !res?.result) {
    return false;
  }
  return true;
};
