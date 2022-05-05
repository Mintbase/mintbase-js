enum Chain {
  near = 'near',
}

enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

interface NEARConfig {
  networkId: string
  nodeUrl: string
  contractName: string
  walletUrl: string
  helperUrl: string
}

interface List {
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

interface Constants {
  API_VERSION?: string
  API_BASE_NEAR_MAINNET?: string
  API_BASE_NEAR_TESTNET?: string
  BASE_ARWEAVE_URI?: string
  FACTORY_CONTRACT_NAME?: string
  MARKET_ADDRESS?: string
  STORE_CONTRACT_VIEW_METHODS?: string[]
  STORE_CONTRACT_CALL_METHODS?: string[]
  MARKET_CONTRACT_VIEW_METHODS?: string[]
  MARKET_CONTRACT_CALL_METHODS?: string[]
  FACTORY_CONTRACT_VIEW_METHODS?: string[]
  FACTORY_CONTRACT_CALL_METHODS?: string[]
  CLOUD_STORAGE_CONFIG?: CloudStorageConstants
  DEFAULT_ROYALTY_PERCENT?: number
  FILE_UPLOAD_SIZE_LIMIT?: number
}

interface CloudStorageConstants {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
}

interface WalletConfig {
  apiKey: string
  chain?: Chain
  networkName?: Network
}

/**
 * Mintbase API configuration object
 * @param chain `Chain` type to use. Defaults to `Chain.near`
 * @param networkName `Network` type to use. Defaults to `Network.testnet` (testnet)
 * @param apiBaseUrl The API base url
 */
interface MintbaseAPIConfig {
  chain?: Chain
  networkName?: Network
  apiBaseUrl?: string
  apiKey?: string
  constants: Constants
}

interface WalletLoginProps {
  requestSignIn?: boolean
  contractAddress?: string
  accountId?: string
  privateKey?: string // useful for node environment
}

interface Token {
  id: string
  ownerId: string
  storeId: string
  thingId: string
}

interface Split {
  [account: string]: number
}

interface Royalties {
  [account: string]: number
}

interface Account {
  id: string
}

enum Visibility {
  nsfw = 'nsfw',
  safe = 'safe',
}

enum DisplayType {
  boostNumber = 'boost_number',
  boostPercentage = 'boost_percentage',
  number = 'number',
  date = 'date',
  location = 'location',
  website = 'website',
  zoom = 'zoom',
  placeId = 'place_id',
  rarity = 'rarity',
  youtubeUrl = 'youtube_url',
  latitude = 'latitude',
  longitude = 'longitude',
}

interface Attribute {
  trait_type: string
  display_type?: DisplayType
  value: string | number
}

enum MetadataField {
  Id = 'id',
  Title = 'title',
  Category = 'category',
  Description = 'description',
  Media = 'media',
  Media_hash = 'media_hash',
  Tags = 'tags',
  Image_preview = 'imagePreview',
  Copies = 'copies',
  Extra = 'extra',
  External_url = 'external_url',
  Background_color = 'background_color',
  Animation_url = 'animation_url',
  Animation_hash = 'animation_hash',
  Youtube_url = 'youtube_url',
  UpdatedAt = 'updated_at',
  Document = 'document',
  Document_hash = 'document_hash',
  Lock = 'lock',
  Visibility = 'visibility',
  Chain = 'chain',
  Store = 'store',
  Royalty = 'royalty',
  Royalty_perc = 'royalty_perc',
  SplitRevenue = 'split_revenue',
}

interface MintMetadata {
  [MetadataField.Id]?: string
  [MetadataField.Title]: string
  [MetadataField.Category]: string | null
  [MetadataField.Description]: string | null
  [MetadataField.Media]: string
  [MetadataField.Media_hash]: string | null
  [MetadataField.Tags]: string[]
  [MetadataField.Image_preview]: string | null
  [MetadataField.Copies]: number
  [MetadataField.Extra]: Attribute[]
  [MetadataField.External_url]: string | null
  [MetadataField.Background_color]: string | null
  [MetadataField.Animation_url]: string | null
  [MetadataField.Animation_hash]: string | null
  [MetadataField.Youtube_url]: string | null
  [MetadataField.Document]: string | null
  [MetadataField.Document_hash]: string[] | null
  [MetadataField.Lock]: string[]
  [MetadataField.Visibility]: Visibility
  [MetadataField.Chain]: Chain
  [MetadataField.Store]?: string | null
  [MetadataField.Royalty]: { [key: string]: number } | null
  [MetadataField.Royalty_perc]: number | null
}

type OptionalMethodArgs = {
  gas?: string
  amount?: string
  meta?: string
  callbackUrl?: string
}

type WalletConnectProps = {
  successUrl?: string
  failureUrl?: string
}

export {
  Chain,
  Network,
  MintbaseAPIConfig,
  WalletLoginProps,
  Split,
  Royalties,
  Token,
  List,
  Account,
  Visibility,
  DisplayType,
  Attribute,
  MetadataField,
  MintMetadata,
  NEARConfig,
  Constants,
  CloudStorageConstants,
  WalletConfig,
  OptionalMethodArgs,
  WalletConnectProps,
}
