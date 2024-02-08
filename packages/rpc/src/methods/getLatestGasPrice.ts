import { requestFromNearRpc } from '../util';

export const getLatestGasPrice = async (network?: string): Promise<string> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [null],
  }, network);
  const blockHeight = res?.result?.gas_price;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
