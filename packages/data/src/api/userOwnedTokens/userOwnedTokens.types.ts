export enum ORDER_BY_VALUE {
    PRICE_DESC = 'price desc nulls last',
    PRICE_ASC = 'price asc',
    LATEST = 'latest',
    OLDEST = 'oldest',
}

export interface UserTokensQueryResult {
    nft_contract_id: string;
    token_id: string;
    minter: string;
    owner: string;
    base_uri: string;
    metadata_id: string;
    title: string;
    media: string;
    reference: string;
    reference_blob: null;
    minted_timestamp: string;
    last_transfer_timestamp: string;
    price: string;
    currency: string;
}
