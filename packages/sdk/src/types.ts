import { Wallet } from '@near-wallet-selector/core';
import BN from 'bn.js';
import { Account } from 'near-api-js';
import type { Optional, Transaction } from '@near-wallet-selector/core';
import type { FinalExecutionOutcome as FEO } from '@near-wallet-selector/core';

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
  SET_SPLITS = 'set_split_owners'
}

export enum MARKET_METHOD_NAMES {
  LIST =  'nft_approve',
  DEPOSIT_STORAGE = 'deposit_storage',
  BUY = 'buy',
  UNLIST_OLD_MARKET = 'delist',
  UNLIST = 'unlist',
}

export enum FT_METHOD_NAMES {
  FT_TRANSFER_CALL = 'ft_transfer_call'
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

export enum MINTBASE_CONTRACTS_V2 {
  testnet =  'mintspace3.testnet',
  mainnet = 'mintbase2.near',
}

export enum GRAPHQL_ENDPOINTS  {
  mainnet =  'https://interop-mainnet.hasura.app/v1/graphql',
  testnet = 'https://interop-testnet.hasura.app/v1/graphql',
}

export enum RPC_ENDPOINTS  {
  mainnet = 'https://rpc.mainnet.near.org',
  testnet = 'https://rpc.testnet.near.org',
}

export enum USDC_ADDRESS {
  mainnet = 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
  testnet = 'usdc.fakes.testnet',
}

export enum USDT_ADDRESS {
  mainnet = 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
  testnet = 'usdt.fakes.testnet',
}

export enum FungibleToken {
  USDC = 'usdc',
  USDT = 'usdt',
}

// keys here need to be the values of the fungible token enum
export type FtAddresses = {
  usdc: USDC_ADDRESS;
  usdt: USDT_ADDRESS;
}

export type ConfigOptions = {
  network?: Network | string;
  contractAddress?: string;
  callbackUrl?: string;
  apiKey?: string;
  connectProxyAddress?: string;
}

export interface ConfigOptionsObj extends ConfigOptions {
  graphqlUrl?: GRAPHQL_ENDPOINTS | '';
  marketAddress?: MARKET_CONTRACT_ADDRESS | '';
  mbContract?: MINTBASE_CONTRACTS;
  mbContractV2?: MINTBASE_CONTRACTS_V2;
  nearRpcUrl: RPC_ENDPOINTS | '';
  debugMode?: boolean;
  apiKey?: string;
  connectProxyAddress?: string;
  ftAddresses: FtAddresses | '';
}

export interface MbJsKeysObject extends ConfigOptionsObj  {
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

export type ContractCall<T> = {
  contractAddress: string;
  methodName: string;
  args: T;
  gas: string | BN;
  deposit: string | BN;
  signerId?: string;
  callbackUrl?: string;
  meta?: CallBackArgs;
  };

export type NearContractCall<T> = ContractCall<T> | ContractCall<T>[]
export type ComposableCall = NearContractCall<ExecuteArgsResponse> | NearContractCall<ExecuteArgsResponse>[]

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
  affiliateAccount?: string;
  ftAddress?: string;
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
  ft?: FungibleToken;
}

export type MintArgs =  {
  contractAddress?: string;
  ownerId: string;
  metadata: TokenMetadata;
  royalties?: Splits;
  amount?: number;
  noMedia?: boolean;     // explicit opt-in to NFT without media, breaks wallets
  noReference?: boolean; // explicit opt-in to NFT without reference
  tokenIdsToMint?: number[];
};

export type TokenMetadata = {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  issued_at?: string;  // Stringified unix timestamp, according to
  expires_at?: string; // standards this is milliseconds since epoch, but
  starts_at?: string;  // since `env::block_timestamp` is in nanoseconds
  updated_at?: string; // most timestamps in the ecosystem are nanoseconds
  extra?: string;
  reference?: string;
  reference_hash?: string;
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
  token_ids?:  {
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

export interface OldTransferContractOwnershipArgs {
  new_owner: string;
  keep_old_minters?: boolean;
}

export interface SetSplitsArgs {
  contractAddress?: string;
  tokenIds: string[];
  splitOwners: Record<string, number>;
}

export declare type TxnOptionalSignerId = Optional<Transaction, 'signerId'>;

export interface MinterArgsResponse {
  account_id: string;
}

export interface BatchChangeMinterArgsResponse{
  grant: string[] | undefined;
  revoke: string[] | undefined;
}

export interface BurnArgsResponse {
  token_ids: string[] |  string[][];
}

export interface BuyArgsResponse {
  nft_contract_id: string;
  token_id: string;
  referrer_id: string;
}

export interface BuyArgsFtResponse {
  receiver_id: string;
  amount: string;
  msg: string;
}

export interface DelistArgsResponse {
  token_id: string;
  account_id: string;
  nft_contract_id: string;
}
export interface DelistMultipleArgsResponse extends DelistArgsResponse {
  token_ids: string[] |  string[][];
  nft_contract_id: string;
}

export interface DeployContractArgsResponse {
  owner_id: string;
  metadata: {
    spec: string;
    name: string;
    symbol: string;
    icon: string;
    base_uri: string;
    reference: string;
    reference_hash: string;
  };
}

export interface TransferArgsResponse {
  receiver_id: string;
  token_id: string;
}

export interface ListArgsResponse {
  token_id: string;
  account_id: string;
  msg: string;
}

export interface MintArgsResponse {
  owner_id: string;
  metadata: TokenMetadata;
  num_to_mint:  number;
  // 10000 = 100%
  royalty_args: { split_between: Splits; percentage: number } | null;
  //split_owners: Splits | null;
  token_ids_to_mint?: number[];
}

export interface TransferContractOwnershipArgsResponse {
  new_owner: string;
  keep_old_minters: boolean;
}

export interface ExecuteExtraArgsResponse {
  token_key?: string[] | string;
  autotransfer?: boolean;
  metadataId?: string;
  price?: string |  string[];
  timeout?: {
    Hours: number;
}[];
  contractId?: string;
}

export interface SetSplitsArgsResponse {
  token_ids: string[];
  split_between: Record<string, number>;
}

export type ExecuteArgsResponse = BatchChangeMinterArgsResponse | TransferArgsResponse | ListArgsResponse | MintArgsResponse |
MinterArgsResponse | DeployContractArgsResponse | DelistMultipleArgsResponse | BuyArgsResponse | BuyArgsFtResponse | BurnArgsResponse | TransferContractOwnershipArgsResponse
| ExecuteExtraArgsResponse | Record<string, unknown>;

export type FinalExecutionOutcome = FEO;
