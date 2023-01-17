export interface MetadataByMetadataIdQueryResult {
  metadata: {
    nft_contracts: {
      id: string;
      baseUri: string;
    };
    title: string;
    description: string;
    media: string;
    document: string | null;
    animationUrl: string;
    extra?:
      | Extra[]
      | {
          [key: string]:
            | string
            | number
            | string[]
            | { [key: string]: string | number };
        };
  }[];

  tokenCount: {
    aggregate: {
      count: number;
    };
  };

  minters: { minter: string }[];

  rollingAuctionCount: {
    aggregate: {
      count: number;
    };
  };

  simpleSaleCount: {
    aggregate: {
      count: number;
    };
  };

  listings: {
    kind: string;
    price: number;
    market_id: string;
    token: {
      token_id: string;
      minter: string;
      nft_contract_id: string;
      owner: string;
      splits: { [key: string]: string | number } | null;
      royalties: { [key: string]: string | number } | null;
    };
  }[];
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
