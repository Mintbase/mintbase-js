import fetch from 'cross-fetch';



export const queryNearRpc = async ({params, method, rpcUrl}):  Promise<{ result: Record<string, unknown>, error: unknown } | undefined> => {
  return await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method:method,
    params:params,
  }, rpcUrl)
}


export const requestFromNearRpc = async (
  body: Record<string, unknown>,
  rpcUrl: string): Promise<{ result: Record<string, unknown>, error: unknown } | undefined> => {


   if (!rpcUrl) {
    throw new Error('please add a valid RPC Url, you can check a list of providers on: https://docs.near.org/api/rpc/providers');
  }

  try {
    const res = await fetch(rpcUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' },
    });

    return res.json();
  } catch (error) {
    return { result: {}, error };
  }
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

  const resultBuffer = Buffer.from(res?.result?.result as string);
  const parsed = JSON.parse(resultBuffer.toString());
  return parsed as T;
};
