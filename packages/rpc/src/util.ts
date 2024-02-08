import { mbjs, RPC_ENDPOINTS } from '@mintbase-js/sdk';
import fetch from 'cross-fetch';

export const requestFromNearRpc = async (
  body: Record<string, any>,
  network?: string,
): Promise<Record<string, any> | undefined> => {

  const fetchUrl = RPC_ENDPOINTS[mbjs.keys.network] || mbjs.keys.nearRpcUrl;
  const rpcAddress = network ? RPC_ENDPOINTS[network] : fetchUrl;

  const res = await fetch(rpcAddress, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' },
  });

  return res.json();
};

export const callViewMethod = async <T>({
  contractId,
  method,
  args,
  network,
}: {
  contractId: string;
  method: string;
  args?: Record<string, any>;
  network?: string;
}): Promise<T> => {
  const args_base64 = args
    ? Buffer.from(JSON.stringify(args), 'utf-8').toString('base64')
    : '';

  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'call_function',
      finality: 'final',
      account_id: contractId,
      method_name: method,
      args_base64,
    },
  }, network);

  if (res?.error) {
    throw res.error;
  }

  const parsed = JSON.parse(Buffer.from(res?.result?.result).toString());
  return parsed as T;
};
