import { Token } from 'graphql';
import { GraphqlFetchingError } from '../../graphql/fetch';

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
    data?: OwnedNftsData[] | null;
    error: null | GraphqlFetchingError;
  }


export interface OwnedTokensData {
    data?: Token[] | null;
    error: null | GraphqlFetchingError;
  }
