import { requestFromNearRpc } from '../util';

export const getBlockHeight = async (rpcUrl?: string): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'status',
    params: [],
  }, rpcUrl);
  const blockHeight = (res?.result?.sync_info as {latest_block_height: number})?.latest_block_height;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
