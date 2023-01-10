export enum TOKEN_METHOD_NAMES {
  TRANSFER =  'nft_transfer',
  BATCH_TRANSFER = 'nft_batch_transfer',
  BATCH_BURN = 'nft_batch_burn',
  DEPLOY_TOKEN_CONTRACT =  'create_store',
  TRANSFER_TOKEN_CONTRACT_OWNERSHIP =  'transfer_store_ownership',
  MINT = 'nft_batch_mint',
  ADD_MINTER = 'grant_minter',
  REMOVE_MINTER = 'revoke_minter',
  BATCH_CHANGE_MINTERS = 'batch_change_minters',
  TOKEN_ACCOUNT_REVOKE =  'nft_revoke',
  TOKEN_ACCOUNT_REVOKE_ALL = 'nft_revoke_all',
}

export enum MARKET_METHOD_NAMES {
  LIST =  'nft_approve',
  DEPOSIT_STORAGE = 'deposit_storage',
  BUY = 'buy',
  UNLIST_OLD_MARKET = 'delist',
  UNLIST = 'unlist',
}

export type NEAR_NETWORK = 'testnet' | 'mainnet' | 'sandbox'

export enum NEAR_NETWORKS {
  MAINNET = 'mainnet',
  TESTNET =  'testnet',
}

export enum TOKEN_FACTORY_ADDRESS {
  MAINNET = 'mintbase1.near',
  TESTNET =  'mintspace2.testnet',
}

export enum MARKET_CONTRACT_ADDRESS {
  MAINNET = 'simple.market.mintbase1.near',
  TESTNET =  'market-v2-beta.mintspace2.testnet',
}

export type MBJS_CONFIG_OBJ = {
  network: NEAR_NETWORK | '';
  graphqlUrl?: string;
  callbackUrl?: string;
  contractAddress?: string;
  marketAddress?: MARKET_CONTRACT_ADDRESS | '';
  tokenAddress?: TOKEN_FACTORY_ADDRESS | '';
}

export interface MbJsKeysObject extends MBJS_CONFIG_OBJ  {
 isSet: boolean;
}
