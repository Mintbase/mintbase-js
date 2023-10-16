import { requestFromNearRpc } from '../util';

export const getLatestGasPrice = async (): Promise<number> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'gas_price',
    params: [null],
  });
  const blockHeight = res?.result?.sync_info?.latest_block_hash;
  if (!blockHeight) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHeight;
};
