import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export const getBlockHash = async (network?: Network,  rpc?: RPC_OPTIONS, rpcUrl?: string): Promise<string> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'status',
    params: [],
  }, network, rpc, rpcUrl);
  const blockHash = (res?.result?.sync_info as {latest_block_hash: string})?.latest_block_hash;
  if (!blockHash) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  return blockHash;
};
