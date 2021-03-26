import 'isomorphic-unfetch';
import { keyStores, KeyPair, Near, Account, WalletConnection } from 'near-api-js';
import { KeyStore } from 'near-api-js/lib/key_stores';
import { API } from './api';
import { MintbaseAPIConfig, WalletLoginProps, MakeOfferProps, TransferAssetProps, Split } from './types';
export declare class Wallet {
    api: API;
    activeWallet?: WalletConnection;
    activeNearConnection?: Near;
    activeAccount?: Account;
    networkName: string;
    chain: string;
    keyStore: KeyStore;
    nearConfig: any;
    constructor(apiConfig: MintbaseAPIConfig);
    /**
     * Creates a connection to a NEAR smart contract
     * @param contractAddress the contract address to initiate a connection
     *
     */
    connect(props?: WalletLoginProps): Promise<void>;
    /**
     * Disconnects user. Removes the LocalStorage entry that
     * represents an authorized wallet account but leaves private keys intact.
     *
     */
    disconnect(): void;
    /**
     * TODO1: Manage errors
     */
    connectTo(accountId: string): Promise<boolean>;
    /**
     * Fetches connected account details.
     * @returns
     */
    details(): Promise<{
        accountId: any;
        balance: string;
        allowance: string;
        contractName: any;
    }>;
    transfer({ contractName, tokenIds }: TransferAssetProps): Promise<void>;
    listForSale(tokenId: number, storeId: string, price: string, splitOwners: Split[]): Promise<void>;
    /**
     * Makes offer.
     * @param xxx
     * @returns
     */
    makeOffer(props?: MakeOfferProps): Promise<void>;
    /**
     * Creates a store. Interacts with the store factory to deploy a contract.
     * @param xxx
     * @returns
     */
    deployStore({ storeId, symbol, }: {
        storeId: string;
        symbol: string;
    }): Promise<void>;
    /**
     * TODO: Figure out how to make this work with Arweave?
     * 1. Upload files to Arweave
     * 2. Generate metadata
     * 3. Interact with contract
     */
    setSessionKeyPair(accountId: string, privateKey: string): Promise<keyStores.KeyStore>;
    getSessionKeyPair(): Promise<KeyPair>;
    private getKeyStore;
    /**
     * Fetch local storage connections
     */
    getLocalAccounts(): {};
    fetchTransactionResult(txHash: string): Promise<import("near-api-js/lib/providers").FinalExecutionOutcome>;
    viewAccessKey: ({ account, publicKey, }: {
        account: string;
        publicKey: string;
    }) => Promise<any>;
    /**
     * Fetch all account access keys
     * @param accountId account name
     * @returns array of
     */
    viewAccessKeyList: ({ accountId }: {
        accountId: string;
    }) => Promise<any>;
    transactionStatus: (transactionHash: string, accountId: string) => Promise<any>;
    transactionStatusWithReceipts: (transactionHash: string, accountId: string) => Promise<any>;
    private rpcCall;
    /**
     * Get NEAR configuration object. Defaults to testnet.
     * @param networkName
     * @param contractAddress
     */
    private getNearConfig;
}
