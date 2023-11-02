import { requestFromNearRpc } from '../util';

export const getLatestGasPrice = async (): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [null],
  });
  const blockHeight = res?.result?.gas_price;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
