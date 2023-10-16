import { requestFromNearRpc } from '../util';

export const getGasPrice = async (hash: string): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: { block_hash: hash },
  });
  const blockHeight = res?.result?.sync_info?.latest_block_hash;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
