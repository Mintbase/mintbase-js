export interface AttributesFilters {
    filters: Record<string, string[]>;
    accountId?: string;
    limit?: number;
    offset?: number;
    listedOnly?: boolean;
    orderBy?: string;
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
}

export type FilteredMetadataQueryResult = {
    results: FilteredMetadataResult[];
    totalRecords: number;
 }
