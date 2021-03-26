import 'isomorphic-unfetch';
import { MintbaseAPIConfig, Token } from './types';
export declare class API {
    apiBaseUrl: string;
    defaultLimit: number;
    chainName: string;
    networkName: string;
    constructor(config: MintbaseAPIConfig);
    /**
     * Fetches the marketplace and each token's metadata.
     * @param limit
     * @param offset
     */
    fetchMarketplace(limit?: number, offset?: number): Promise<any>;
    /**
     * Fetches token metadata.
     * @param tokenId the token identifier
     *
     * @returns token metadata
     */
    fetchMetadata(tokenId: string, storeId: string): Promise<any>;
    /**
     * Fetches lists w/ no metadata.
     * @param limit
     * @param offset
     */
    fetchLists(id: string): Promise<any>;
    fetchThing(): Promise<void>;
    fetchToken(tokenId: number, storeId: string): Promise<Token>;
    fetchArweave(id: string): Promise<any>;
    fetchOwnerTokens(accountId: string): Promise<any>;
    isOwner(tokenId: number, accountAddress: string): Promise<boolean>;
    custom(query: string, variables: any): Promise<any>;
}
