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

      burnedReceiptId: string | null;
      burnedTimestamp: string | null;
  copies: number;
  description: string;
  expiresAt: string | null;
  issuedAt: string | null;
  lastTransferReceiptId: string | null;
  lastTransferTimeStamp: string | null;
  media: string;
  minter: string;
  mediaHash: string | null;
  mintMemo: string;
  isMintbaseContract: boolean;
  mintedReceiptId: string;
  mintedTimestamp: string;
  metadataId: string;
  reference: string;
  referenceHash: string | null;
  startsAt: string | null;
  title: string;
  updatedAt: string | null;
  owner: string;
  royalties: { path: string } | null;
  royaltiesPercent: number | null;
  tokenId: string;
}

export interface TokenByIdResults {
  tokenData: NftTokenData[];
  tokenListingsAggregate: { aggregate: { count: number } };
}

export interface Extra {
  trait_type: string;
  display_type?: string;
  value: string | number | string[] | { [key: string]: string | number };
}
