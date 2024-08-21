import { AccessKey, AccountParams } from '../types';
import { callNearRpc } from '../util';


export const getAccessKeys = async ({ accountId, rpcUrl }: AccountParams): Promise<AccessKey[]> => {

  const res = await callNearRpc({
    method: 'query',
    params: {
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: accountId,
    },
    rpcUrl,
  } );

  const accessKeys = res?.result?.keys as AccessKey[];

  if (res?.error) {
    throw res.error;
  }
  if (!accessKeys) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return accessKeys;
};
