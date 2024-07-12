import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export const getLatestGasPrice = async (network?: Network, rpc?: RPC_OPTIONS, rpcUrl?: string): Promise<string> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [null],
  }, network, rpc, rpcUrl);
  const gasPrice = res?.result?.gas_price as string;
  if (!gasPrice) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return gasPrice;
};
