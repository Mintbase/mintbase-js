import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export const getGasPrice = async (hash?: string, network?: Network, rpc?: RPC_OPTIONS, rpcUrl?: string): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [hash || null],
  }, network, rpc, rpcUrl);
  const gasPrice = res?.result?.gas_price as number;
  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return gasPrice;
};
