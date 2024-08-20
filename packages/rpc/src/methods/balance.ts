import BN from 'bn.js';
import { queryNearRpc,  } from '../util';
import { AccountParams } from '../types';

export const getBalance = async ({ accountId, rpcUrl }: AccountParams): Promise<BN> => {

  const res = await queryNearRpc({
    params: {
    request_type: 'view_account',
    finality: 'final',
    account_id: accountId,
   },
    method:'query',
    rpcUrl
  })

  const balanceString = res?.result?.amount as string;
  if (!balanceString) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return new BN(balanceString);
};

