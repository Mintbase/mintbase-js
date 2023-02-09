export interface AttributesFilters {
    filters: Record<string, string[]>;
    limit?: number;
    offset?: number;
}

export type FilteredMetadataResult = {
    tokenId: string;
}
