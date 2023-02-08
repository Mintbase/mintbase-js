export interface TokensByAttributesDataResults  {
    mb_views_nft_tokens: TokenOwner[];
}

export interface TokenOwner  {
    owner: string;
}

export interface AttributesFilters {
    contract_id: string;
    filters: { [key: string]: string[] };
    limit?: number;
    offset?: number;
}
