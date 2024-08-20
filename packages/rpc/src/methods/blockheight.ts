import { queryNearRpc } from '../util';

export const getBlockHeight = async (rpcUrl: string): Promise<number> => {

  const res = await queryNearRpc({
    params: [],
    method: 'status',
    rpcUrl})

  const blockHeight = (res?.result?.sync_info as {latest_block_height: number})?.latest_block_height;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
