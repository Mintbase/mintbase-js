export type NearEnv = 'mainnet' | 'testnet';
export const NEAR_NETWORK =
  process.env.NEAR_NETWORK || process.env.NEXT_PUBLIC_NEAR_NETWORK || 'mainnet';
export const NEAR_RPC_URL = `https://rpc.${NEAR_NETWORK}.near.org`;
