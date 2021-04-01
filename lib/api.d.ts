import 'isomorphic-unfetch';
import { MintbaseAPIConfig, Token } from './types';
/**
 * Mintbase API.
 * Main entry point for users read Mintbase data.
 */
export declare class API {
    apiBaseUrl: string;
    defaultLimit: number;
    chainName: string;
    networkName: string;
    constructor(config: MintbaseAPIConfig);
    /**
     * Fetch marketplace and each token's metadata (w/ cursor offset pagination enabled).
     * @param limit number of results
     * @param offset number of records to skip
     */
    fetchMarketplace(limit?: number, offset?: number): Promise<any>;
    /**
     * Fetch token metadata.
     * @param tokenId token id
     * @returns token metadata
     */
    fetchTokenMetadata(tokenId: string, storeId: string): Promise<any>;
    /**
     * Fetch lists without metadata.
     */
    fetchLists(id: string): Promise<any>;
    /**
     * Fetch thing.
     * TODO: Not yet implemented
     */
    fetchThing(): Promise<void>;
    /**
     * Fetch token
     * @param tokenId token id
     * @param storeId store id
     * @returns the token
     */
    fetchToken(tokenId: number, storeId: string): Promise<Token>;
    /**
     * Fetch metadata from Arweave
     * @param id arweave content identifier
     * @returns metadata
     */
    fetchMetadata(id: string): Promise<any>;
    /**
     * Fetch account owned tokens
     * @param accountId account id
     * @returns list of tokens
     */
    fetchOwnerTokens(accountId: string): Promise<any>;
    /**
     * Checks whether account owns a token or not.
     * @param tokenId token id
     * @param accountId account id
     * @returns whether an account owns a token or not.
     */
    isOwner(tokenId: number, accountId: string): Promise<boolean>;
    /**
     * Makes custom GraphQL query
     * @param query custom GraphQL query
     * @param variables object with variables passed to the query
     * @returns result of query
     */
    custom(query: string, variables?: unknown): Promise<unknown>;
}
