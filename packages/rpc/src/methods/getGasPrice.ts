import { requestFromNearRpc } from '../util';

export const getGasPrice = async (hash?: string): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [hash || null],
  });
  const gasPrice = res?.result?.gas_price;
  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return gasPrice;
};
