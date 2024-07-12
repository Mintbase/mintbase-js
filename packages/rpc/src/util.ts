import { mbjs, RPC_ENDPOINTS, NEAR_RPC_ENDPOINTS } from '@mintbase-js/sdk';
import fetch from 'cross-fetch';


export type RPC_OPTIONS  = 'lava' | 'near' | 'beta' | 'fastnear'

export const requestFromNearRpc = async (
  body: Record<string, unknown>,
  rpcUrl?: string): Promise<{ result: Record<string, unknown>, error: unknown } | undefined> => {
  const res = await fetch(rpcUrl, {
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
  rpcUrl,
}: {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
  rpcUrl?: string
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
  }, rpcUrl);

  if (res?.error) {
    throw res.error;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const parsed = JSON.parse(Buffer.from(res?.result?.result).toString());
  return parsed as T;
};
