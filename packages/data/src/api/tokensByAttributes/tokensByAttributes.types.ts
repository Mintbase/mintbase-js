export interface AttributesFilters {
    filters: Record<string, string[]>;
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
}

export type FilteredMetadataQueryResult = {
    results: FilteredMetadataResult[];
    totalRecords: number;
 }
