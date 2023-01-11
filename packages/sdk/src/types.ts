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

// due to wallet selector types had to do this one:
export type Network = 'testnet' | 'mainnet'

export enum NEAR_NETWORKS {
  MAINNET = 'mainnet',
  TESTNET =  'testnet',
}

export enum TOKEN_FACTORY_ADDRESS {
  mainnet = 'mintbase1.near',
  testnet =  'mintspace2.testnet',
}

export enum MARKET_CONTRACT_ADDRESS {
  mainnet = 'simple.market.mintbase1.near',
  testnet =  'market-v2-beta.mintspace2.testnet',
}

export enum MINTBASE_CONTRACTS {
  mainnet = 'mintspace2.testnet',
  testnet = 'mintbase1.near'
}

export type MBJS_CONFIG_PARAMS = {
  network: Network;
  contractAddress?: string;
  callbackUrl?: string;
}

export interface MbJsConfigObj extends MBJS_CONFIG_PARAMS {
  graphqlUrl?: string;
  marketAddress?: MARKET_CONTRACT_ADDRESS | '';
  tokenAddress?: TOKEN_FACTORY_ADDRESS | '';
  mbContract?: MINTBASE_CONTRACTS | '';
  nearRpcUrl: string | '';
  debugMode?: boolean;
}

export interface MbJsKeysObject extends MbJsConfigObj  {
 isSet: boolean;
}

export enum GRAPHQL_ENDPOINTS { 
  mainnet =  'https://interop-mainnet.hasura.app/v1/graphql',
  testnet = 'https://interop-testnet.hasura.app/v1/graphql'
}

export enum RPC_ENDPOINTS { 
  mainnet = 'https://rpc.mainnet.near.org',
  testnet = 'https://rpc.testnet.near.org'
}
