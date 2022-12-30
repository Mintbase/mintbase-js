import { GraphqlFetchingError } from './graphql/fetch';

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
  error: null | GraphqlFetchingError;
  data: T | null;
}


export type NftAttributesQueryResult = {
  nft_attributes: Attribute[];
}

export type Attribute = {
  attribute_display_type?: string | null;
  attribute_value?: string | null;
  attribute_type?: string | null;
}
