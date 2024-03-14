import { Network } from '@mintbase-js/sdk';
import { requestFromNearRpc } from '../util';

export const getBlockHeight = async (network?: Network,  rpc?: 'near' | 'lava'): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'status',
    params: [],
  }, network, rpc);
  const blockHeight = res?.result?.sync_info?.latest_block_height;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
