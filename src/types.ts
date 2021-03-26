export enum Chain {
  near = 'near',
}

export enum Network {
  main = 'main',
  testnet = 'testnet',
}

/**
 * Mintbase API configuration object
 * @param apiKey Optional key to use for API
 * @param networkName `Network` type to use. Defaults to `Network.Main` (mainnet)
 * @param gasPrice Default gas price to send to the Wyvern Protocol
 * @param apiBaseUrl Optional base URL to use for the API
 */
export interface List {
  acceptedOfferId?: string
  autoTransfer?: boolean
  ownerId?: string
  price?: string
  storeId?: string
  tokenId?: string
  id?: string
  tokenKey?: string
  txId?: string
  groupId?: string
  createdAt?: Date
  removedAt?: Date
  currentOfferId?: string
}

/**
 * Mintbase API configuration object
 * @param apiKey Optional key to use for API
 * @param networkName `Network` type to use. Defaults to `Network.Main` (mainnet)
 * @param gasPrice Default gas price to send to the Wyvern Protocol
 * @param apiBaseUrl Optional base URL to use for the API
 */
export interface MintbaseAPIConfig {
  chain: Chain
  networkName?: Network
  apiBaseUrl?: string
}

export interface WalletLoginProps {
  contractAddress?: string
  accountId?: string
  privateKey?: string // useful for node environment
}

export interface MakeOfferProps {
  groupId?: string
}

export interface TransferAssetProps {
  contractName: string
  tokenIds: [string, number][]
}

export interface Split {
  accountId: string
  split: number
}

export interface Token {
  id: string
  ownerId: string
  storeId: string
  tokenId: number
  thingId: string
}

export interface Account {
  id: string
}
