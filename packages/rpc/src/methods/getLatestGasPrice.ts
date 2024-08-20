import { queryNearRpc } from '../util';

export const getLatestGasPrice = async (rpcUrl: string): Promise<string> => {

  const res = await queryNearRpc({
    method: 'gas_price',
    params: [null],
    rpcUrl
  }, );

  const gasPrice = res?.result?.gas_price as string;

  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return gasPrice;
};
