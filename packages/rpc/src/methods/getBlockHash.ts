import { Network } from '@mintbase-js/sdk';
import { requestFromNearRpc } from '../util';

export const getBlockHash = async (network?: Network): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'status',
    params: [],
  }, network);
  const blockHeight = res?.result?.sync_info?.latest_block_hash;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
