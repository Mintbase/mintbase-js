export interface StoreNftsResult {
  mb_views_nft_metadata_unburned: {
    minted_timestamp: string;
    price: number | null;
    media: string;
    nft_contract_id: string;
    metadata_id: string;
    title: string;
    base_uri: string;
  }[];
  mb_views_nft_metadata_unburned_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
