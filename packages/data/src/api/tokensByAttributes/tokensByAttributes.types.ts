import { Network } from '@mintbase-js/sdk';

export interface AttributesFilters {
    filters: Record<string, string[]>;
    accountId?: string;
    limit?: number;
    offset?: number;
    listedFilter?: boolean;
    orderBy?: string;
    ownedFilter?: boolean;
    kycFilter?: boolean;
}

export type FilteredMetadataResult = {
    tokenId: string;
    metadataId: string;
    title: string;
    description: string;
    media: string;
    nftContractId: string;
    baseUri: string;
    referenceBlob: JSON;
    contentFlag: string;
    mintedTimestamp: string;
    lastTransferTimestamp: string;
    minter: string;
    price: number;
    animationUrl: string;
    currency: string;
    isOwned?: boolean;
    reference: string;
    kyc?: boolean;
    listingsCount: number;
    tokensCount: number;
}

export type FilteredMetadataQueryResult = {
    results: FilteredMetadataResult[];
    totalRecords: number;
 }

export interface TokensByAttributesProps {
    contractId: string;
    filters: AttributesFilters;
    network?: Network;
 }
