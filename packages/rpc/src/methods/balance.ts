import BN from 'bn.js';
import { requestFromNearRpc } from '../util';

export const getBalance = async (accountId: string): Promise<BN> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
  });
  const balanceString = res?.result?.amount;
  if (!balanceString) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return new BN(balanceString);
};
