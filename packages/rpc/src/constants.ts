export type NearEnv = 'mainnet' | 'testnet';
export const NEAR_ENV =
  process.env.NEAR_ENV || process.env.NEXT_PUBLIC_NEAR_ENV || 'mainnet';
export const NEAR_RPC_URL = `https://rpc.${NEAR_ENV}.near.org`;
