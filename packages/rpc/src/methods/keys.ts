import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export type AccessKey = {
  public_key: string;
  access_key: AccessKeyPermissions;
};

export type AccessKeyPermissions = {
  permission: 'FullAccess' | {
    FunctionCall: {
      allowance: string;
      receiver_id: string;
      method_names: string[];
    };
  };
}

export const getAccessKeys = async (accountId: string, network?: Network, rpc?: RPC_OPTIONS, rpcUrl?: string): Promise<AccessKey[]> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: accountId,
    },
  }, network, rpc, rpcUrl);

  const accessKeys = res?.result?.keys as AccessKey[];

  if (res?.error) {
    throw res.error;
  }
  if (!accessKeys) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return accessKeys;
};
