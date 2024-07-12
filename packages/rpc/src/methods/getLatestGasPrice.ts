import { requestFromNearRpc } from '../util';

export const getLatestGasPrice = async (rpcUrl?: string): Promise<string> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [null],
  }, rpcUrl);
  const gasPrice = res?.result?.gas_price as string;
  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return gasPrice;
};
