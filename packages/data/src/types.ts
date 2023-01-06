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

export interface Extra {
  trait_type: string;
  display_type?: DisplayType;
  value: string | number | string[] | { [key: string]: string | number };
}

export enum DisplayType {
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
