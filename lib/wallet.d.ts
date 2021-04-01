import 'isomorphic-unfetch';
import { KeyPair, Near, Account, WalletConnection } from 'near-api-js';
import { KeyStore } from 'near-api-js/lib/key_stores';
import { API } from './api';
import { MintbaseAPIConfig, WalletLoginProps } from './types';
import { Minter } from './minter';
/**
 * Mintbase Wallet.
 * Main entry point for users to sign and interact with NEAR and Mintbase infrastructure.
 */
export declare class Wallet {
    api: API;
    activeWallet?: WalletConnection;
    activeNearConnection?: Near;
    activeAccount?: Account;
    networkName: string;
    chain: string;
    keyStore: KeyStore;
    nearConfig: any;
    minter: Minter;
    /**
     * Mintbase wallet constructor.
     * Creates an instance of a Mintbase wallet.
     * @param apiConfig api confuguration options.
     * @returns the wallet instance
     */
    constructor(apiConfig: MintbaseAPIConfig);
    /**
     * Creates a connection to a NEAR smart contract
     * @param props wallet connection properties - the config to create a connection with
     *
     */
    connect(props?: WalletLoginProps): Promise<void>;
    /**
     * Disconnects user. Removes the LocalStorage entry that
     * represents an authorized wallet account but leaves private keys intact.
     */
    disconnect(): void;
    /**
     * Connects to a wallet stored on local storage.
     * @param accountId the account identifier to connect.
     * @returns whether connection was successful or not.
     */
    connectTo(accountId: string): Promise<boolean>;
    /**
     * Fetches connected account details.
     * @returns details of the current connection.
     */
    details(): Promise<{
        accountId: string;
        balance: string;
        allowance: string;
        contractName: string;
    }>;
    /**
     * Transfer one or more tokens.
     * @param contractName The contract name to transfer tokens from.
     * @param tokenIds The mapping of transfers, defined by: [[accountName1, tokenId1], [accountName2, tokenId2]]
     */
    transfer({ contractName, tokenIds, }: {
        contractName: string;
        tokenIds: [string, number][];
    }): Promise<void>;
    /**
     * List an item for sale in the market.
     * @param tokenId The token id.
     * @param storeId The token store id (contract name).
     * @param price The listing price.
     * @param splitOwners List of splits.
     */
    listForSale(tokenId: number, storeId: string, price: string, splitOwners: {
        accountId: string;
        split: number;
    }[]): Promise<void>;
    /**
     * Makes offer to a listing in the market.
     * @param groupId
     * @param price
     */
    makeOffer(groupId: string, price?: number): Promise<void>;
    /**
     * Creates a store
     * @param storeId Store name
     * @param symbol Store symbol
     */
    deployStore(storeId: string, symbol: string): Promise<void>;
    /**
     * Mint a token
     * @param amount The number of tokens to mint.
     * @param contractName The contract in which tokens will be minted.
     */
    mint(amount: number, contractName: string): Promise<void>;
    setSessionKeyPair(accountId: string, privateKey: string): Promise<KeyStore>;
    getSessionKeyPair(): Promise<KeyPair>;
    private getKeyStore;
    /**
     * Fetch local storage connections
     */
    getLocalAccounts(): {
        accountId: string;
        contractName: string;
    }[] | any;
    /**
     * Fetch transaction result given a transaction hash.
     * @param txHash the transaction's hash
     * @returns the transaction result
     */
    fetchTransactionResult(txHash: string): Promise<any>;
    private rpcCall;
    /**
     * Fetch access key information
     * @param accountId account id
     * @param publicKey public key
     * @returns Access Key information
     */
    viewAccessKey: (accountId: string, publicKey: string) => Promise<any>;
    /**
     * Fetch list of access keys for a given account
     * @param accountId account id
     * @returns List of access keys
     */
    viewAccessKeyList: (accountId: string) => Promise<any>;
    /**
     * Fetch a transaction status.
     * @param transactionHash The transactions' hash.
     * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
     * @returns The transaction result
     */
    transactionStatus: (transactionHash: string, accountId: string) => Promise<any>;
    /**
     * Fetch transaction status with all receipts.
     * @param transactionHash The transactions' hash.
     * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
     * @returns The transaction result with all receipts.
     */
    transactionStatusWithReceipts: (transactionHash: string, accountId: string) => Promise<any>;
    /**
     * Get NEAR configuration object. Defaults to testnet.
     * @param networkName
     * @param contractAddress
     */
    private getNearConfig;
}
