import { callNearRpc } from '../util';

export const getGasPrice = async (hash: string, rpcUrl: string): Promise<number> => {

  const res = await callNearRpc({
    method: 'gas_price',
    params: [hash || null],
    rpcUrl,
  } );

  const gasPrice = res?.result?.gas_price as number;

  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }

  return gasPrice;
};
