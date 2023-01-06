export interface TokenOwnersByMetadataIdQueryResult {
  mb_views_nft_tokens: {
    token_id: string;
    owner: string;
  }[];

  mb_views_nft_tokens_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
