import { Extra } from '../../types';

  
export interface TokenMetadataQueryResult {
    mb_views_nft_tokens: TokenMetadata[];
}

export interface TokenMetadata {
    animationUrl: string;
    document: string | null;
    baseUri: string;
    base_uri?: string;
    extra?:
      | Extra[]
      | {
          [key: string]:
            | string
            | number
            | string[]
            | { [key: string]: string | number };
        };
  
    burned_receipt_id: string | null;
    burned_timestamp: string | null;
    copies: number;
    description: string;
    expires_at: string | null;
    issued_at: string | null;
    last_transfer_receipt_id: string;
    last_transfer_timestamp: string;
    media: string;
    minter: string;
    media_hash: string | null;
    mint_memo: string;
    nft_contract_is_mintbase: boolean;
    minted_receipt_id: string;
    minted_timestamp: string;
    metadata_id: string;
    reference: string;
    reference_hash: string | null;
    starts_at: string | null;
    title: string;
    updated_at: string | null;
    owner: string;
    royalties: { [key: string]: string | number };
    royalties_percent: number;
    token_id: string;
    splits: { [key: string]: string | number };
}
