import { Token } from 'graphql';

export interface OwnedNftsData {
    token: {
        metadataId: string;
        reference: string;
        owner?: string | null;
        minter: string;
        title: string;
        media: string;
        nftContractId: string;
        animationUrl?: string | null;
        mintedTimestamp?: string | null;
        baseUri?: string | null;
        listings: { price: number }[];
    }[];
    tokens_aggregate: {
        aggregate: { count: number | null };
    };
    earnings_aggregate: {
        aggregate: { sum: { amount: number | null } };
    };
}


export interface NftsByStoreData {
    data?: OwnedNftsData | null;
    error: null | string;
  }


export interface OwnedTokensData {
    data?: Token[] | null;
    error: null | string;
  }
