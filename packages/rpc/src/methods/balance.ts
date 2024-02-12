import BN from 'bn.js';
import { requestFromNearRpc } from '../util';
import { Network } from '@mintbase-js/sdk';

export const getBalance = async (accountId: string, network?: Network): Promise<BN> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    },
  }, network);
  const balanceString = res?.result?.amount;
  if (!balanceString) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return new BN(balanceString);
};
