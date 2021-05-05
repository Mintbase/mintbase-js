enum Chain {
  near = 'near',
}

enum Network {
  main = 'main',
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
  Name = 'name',
  Description = 'description',
  Image = 'image',
  Price = 'price',
  Category = 'category',
  ForSale = 'forSale',
  Image_preview = 'imagePreview',
  AmountToMint = 'amountToMint',
  NumAvailable = 'numAvailable',
  StripePrice = 'stripePrice',
  MetaId = 'metaId',
  Minter = 'minter',
  Minted = 'minted',
  MintOn = 'mintedOn',
  LastMinted = 'lastMinted',
  Tags = 'tags',
  Image_data = 'image_data',
  External_data = 'external_data',
  External_url = 'external_url',
  Background_color = 'background_color',
  Animation_url = 'animation_url',
  Youtube_url = 'youtube_url',
  Attributes = 'attributes',
  ContractAddress = 'contractAddress',
  Document = 'document',
  Lock = 'lock',
  Visibility = 'visibility',
  Chain = 'chain',
  Store = 'store',
  Royalty = 'royalty',
  Royalty_perc = 'royalty_perc',
}

interface MintMetadata {
  [MetadataField.Id]?: string
  [MetadataField.Name]: string
  [MetadataField.Description]: string
  [MetadataField.Tags]: string[]
  [MetadataField.Image]: string
  [MetadataField.Price]: number
  [MetadataField.AmountToMint]: number
  [MetadataField.NumAvailable]: number
  [MetadataField.StripePrice]: number
  [MetadataField.ForSale]: boolean
  [MetadataField.Attributes]: Attribute[]
  [MetadataField.MetaId]: string | null
  [MetadataField.Image_data]: string | null
  [MetadataField.External_data]: string | null
  [MetadataField.External_url]: string | null
  [MetadataField.Background_color]: string
  [MetadataField.Animation_url]: string | null
  [MetadataField.Youtube_url]: string | null
  [MetadataField.Minter]: string | null
  [MetadataField.LastMinted]: Date | null
  [MetadataField.Document]: string[]
  [MetadataField.Lock]: string[]
  [MetadataField.Visibility]: Visibility
  [MetadataField.Chain]: Chain
  [MetadataField.Image_preview]: string | null
  [MetadataField.ContractAddress]?: string | null
  [MetadataField.Store]?: string | null
  [MetadataField.Royalty]: { [key: string]: number } | null
  [MetadataField.Royalty_perc]: number | null
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
}
