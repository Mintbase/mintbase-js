import { queryNearRpc } from '../util';

export const getBlockHash = async (rpcUrl: string): Promise<string> => {
  const res = await queryNearRpc({
    method: 'status',
    params: [],
    rpcUrl
  }, );

  const blockHash = (res?.result?.sync_info as {latest_block_hash: string})?.latest_block_hash;

  if (!blockHash) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }

  return blockHash;
};
