export interface NftTokenData {
  animationUrl: string | null;
  document: string | null;
  baseUri: string | null;
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
  last_transfer_receipt_id: string | null;
  last_transfer_timestamp: string | null;
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
  royalties: { path: string } | null;
  royalties_percent: number | null;
  token_id: string;
}

export interface TokenByIdResults {
  mb_views_nft_tokens: NftTokenData[];
  mb_views_active_listings_aggregate: { aggregate: { count: number } };
}

export interface Extra {
  trait_type: string;
  display_type?: string;
  value: string | number | string[] | { [key: string]: string | number };
}
