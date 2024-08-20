import fetch from 'cross-fetch';

export type RPC_OPTIONS  = 'lava' | 'near' | 'beta' | 'fastnear' | 'pagoda'

type RpcNodes = {
  [key in RPC_OPTIONS]?: string;
};

export const rpcNodes: {
  mainnet: RpcNodes;
  testnet: RpcNodes;
} = {
  mainnet: {
    lava: "https://near.lava.build:443",
    near: "https://rpc.mainnet.near.org",
    fastnear: "https://free.rpc.fastnear.com/",
    pagoda: "https://rpc.mainnet.pagoda.co"
  },
  testnet: {
    lava: "https://near-testnet.lava.build:433",
    near: "https://rpc.testnet.near.org",
    fastnear:
    "https://test.rpc.fastnear.com",
    pagoda: "https://rpc.testnet.pagoda.co",
  }
};

export const requestFromNearRpc = async (
  body: Record<string, unknown>,
  rpcUrl?: string): Promise<{ result: Record<string, unknown>, error: unknown } | undefined> => {

   const validUrls = Object.values(rpcNodes.mainnet).concat(Object.values(rpcNodes.testnet));

  // Set default rpcUrl if not provided
   if (!rpcUrl) {
    rpcUrl = rpcNodes.mainnet.near;
  }

  if (rpcUrl && !validUrls.includes(rpcUrl)) {
    throw new Error('Invalid rpcUrl');
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
