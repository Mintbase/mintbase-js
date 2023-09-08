// shared by data libs and not in graphql.
export type Pagination = {
  limit: number;
  offset?: number;
}

export type Token = {
  lastTransferredAt: string;
  tokenId: string;
  contractId: string;
  baseUri: string;
  metadataId: string;
  title: string;
  minter: string;
  media: string;
  document: string;
  animationUrl: string;
}

export interface ParsedDataReturn<T> {
  error?: null | string;
  data?: T | null;
}

export type NftAttributesQueryResult = {
  nft_attributes: Attribute[];
}

export type Attribute = {
  attribute_display_type?: string | null;
  attribute_value?: string | null;
  attribute_type?: string | null;
}

export enum ORDER_BY_VALUE {
  PRICE_DESC = 'price desc nulls last',
  PRICE_ASC = 'price asc',
  LATEST = 'latest',
  OLDEST = 'oldest',
}

export interface UserTokensFilter {
  limit: number;
  offset: number;
  listedFilter: boolean;
  orderBy: string;
}

export type UserTokensQueryResult = {
  results: UserTokensResult[];
  total: number;
}

export interface ReferenceBlob {
  tags?: Array<string>;
  type?: string;
  extra?: Array<{ trait_type?: string; value?: any; display_type?: string }>;
  media?: string;
  store?: string;
  title?: string;
  category?: string;
  media_hash?: string;
  description?: string;
  animation_url?: string;
}

export interface UserTokensResult {
  nft_contract_id: string;
  token_id: string;
  minter: string;
  owner: string;
  base_uri: string;
  metadata_id: string;
  title: string;
  media: string;
  reference: string;
  reference_blob: ReferenceBlob;
  minted_timestamp: string;
  last_transfer_timestamp: string;
  price: string;
  currency: string;
}
