import { Wallet } from '@near-wallet-selector/core';
import BN from 'bn.js';
import { Account } from 'near-api-js';

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

export enum NEAR_NETWORKS  {
  MAINNET =  'mainnet',
  TESTNET =  'testnet',
}

export enum MARKET_CONTRACT_ADDRESS {
  mainnet = 'simple.market.mintbase1.near',
  testnet =  'market-v2-beta.mintspace2.testnet',
}

export enum MINTBASE_CONTRACTS {
  testnet =  'mintspace2.testnet',
  mainnet = 'mintbase1.near',
}

export enum GRAPHQL_ENDPOINTS  { 
  mainnet =  'https://interop-mainnet.hasura.app/v1/graphql',
  testnet = 'https://interop-testnet.hasura.app/v1/graphql',
}

export enum RPC_ENDPOINTS  { 
  mainnet = 'https://rpc.mainnet.near.org',
  testnet = 'https://rpc.testnet.near.org',
}


export type MBJS_CONFIG_PARAMS = {
  network: Network | string;
  contractAddress?: string;
  callbackUrl?: string;
}

export interface MbJsConfigObj extends MBJS_CONFIG_PARAMS {
  graphqlUrl?: GRAPHQL_ENDPOINTS | '';
  marketAddress?: MARKET_CONTRACT_ADDRESS | '';
  mbContract?: MINTBASE_CONTRACTS;
  nearRpcUrl: RPC_ENDPOINTS | '';
  debugMode?: boolean;
}

export interface MbJsKeysObject extends MbJsConfigObj  {
 isSet: boolean;
}

export enum TransactionSuccessEnum {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  DEPLOY_STORE = 'deploy-store',
  MAKE_OFFER = 'make-offer',
  REVOKE_MINTER = 'revoke-minter',
  ADD_MINTER = 'add-minter',
  TRANSFER_STORE_OWNERSHIP = 'transfer-store-ownership',
  AUCTION_LIST = 'list',
  SIMPLE_SALE_LIST = 'simple-sale-list',
  UNLIST = 'unlist',
  TAKE_OFFER = 'take-offer',
  WITHDRAW_OFFER = 'withdraw-offer',
}

export type CallBackArgs =  {
  args: object;
  type: TransactionSuccessEnum;
}

export type ContractCall = {
  contractAddress: string;
  methodName: string;
  args: object;
  gas: string | BN;
  deposit: string | BN;
  signerId?: string;
  callbackUrl?: string;
  meta?: CallBackArgs;
  };

export type NearContractCall = ContractCall | ContractCall[]

export type NearExecuteOptions = {
  wallet?: Wallet;
  account?: Account;
  callbackUrl?: string;
  callbackArgs?: CallBackArgs;  
};

export type BurnArgs = {
  contractAddress?: string;
  tokenIds: string[];
};

export type AddMinterArgs =  {
  minterId: string;
  contractAddress?: string;
};

export type BuyArgs = {
  price: string;
  contractAddress?: string;
  tokenId: string;
  referrerId?: string;
  marketId?: string;
};

export type DelistArgs = {
  contractAddress: string;
    tokenIds: string[];
    marketAddress?: string;
    oldMarket?: boolean;
}

export type DeployContractArgs = {
  factoryContractId?: string;
  name: string;
  ownerId: string;
  metadata: {
    symbol: string;
    icon?: string;
    baseUri?: string;
    reference?: string;
    referenceHash?: string;
  };
};

export type DepositStorageArgs = {
  listAmount?: number;
  marketAddress?: string;
};

export type ListArgs = {
  contractAddress?: string;
  marketAddress?: string;
  price: string;
  tokenId: string;
}

export type MintArgs =  {
  contractAddress?: string;
  reference: string;
  ownerId: string;
  options?: MintOptions;
};

export type MintOptions = {
    splits?: Splits;
    amount?: number;
    royaltyPercentage?: number;
}

export type Splits = Record<string, number>;

export type RemoveMinterArgs =  {
  minterId: string;
  contractAddress?: string;
};

export type TransferArgs = {
  transfers: {
    receiverId: string;
    tokenId: string;
  }[];
  contractAddress?: string;
};

export type TransferContractOwnershipArgs = {
  contractAddress: string;
  nextOwner: string;
  options?: {
    keepMinters: boolean;
  };
};
