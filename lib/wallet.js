"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
require("isomorphic-unfetch");
const browser_or_node_1 = require("browser-or-node");
const near_api_js_1 = require("near-api-js");
const bn_js_1 = __importDefault(require("bn.js"));
const api_1 = require("./api");
const types_1 = require("./types");
const constants_1 = require("./constants");
const minter_1 = require("./minter");
/**
 * Mintbase Wallet.
 * Main entry point for users to sign and interact with NEAR and Mintbase infrastructure.
 */
class Wallet {
    /**
     * Mintbase wallet constructor.
     * Creates an instance of a Mintbase wallet.
     * @param apiConfig api confuguration options.
     * @returns the wallet instance
     */
    constructor(apiConfig) {
        this.networkName = types_1.Network.testnet;
        this.chain = types_1.Chain.near;
        this.rpcCall = ({ headers = {}, body = {}, method, }) => __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(this.nearConfig.nodeUrl, {
                method: 'POST',
                body: JSON.stringify(Object.assign(Object.assign({}, body), { jsonrpc: '2.0', id: `mintbase-${Math.random().toString().substr(2, 10)}`, method: method })),
                headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
            });
            const data = yield request.json();
            return data === null || data === void 0 ? void 0 : data.result;
        });
        /**
         * Fetch access key information
         * @param accountId account id
         * @param publicKey public key
         * @returns Access Key information
         */
        this.viewAccessKey = (accountId, publicKey
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rpcCall({
                body: {
                    params: {
                        request_type: 'view_access_key',
                        finality: 'final',
                        account_id: accountId,
                        public_key: publicKey,
                    },
                },
                method: 'query',
            });
            return result;
        });
        /**
         * Fetch list of access keys for a given account
         * @param accountId account id
         * @returns List of access keys
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.viewAccessKeyList = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rpcCall({
                body: {
                    params: {
                        request_type: 'view_access_key_list',
                        finality: 'final',
                        account_id: accountId,
                    },
                },
                method: 'query',
            });
            return result;
        });
        /**
         * Fetch a transaction status.
         * @param transactionHash The transactions' hash.
         * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
         * @returns The transaction result
         */
        this.transactionStatus = (transactionHash, accountId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rpcCall({
                body: {
                    params: [transactionHash, accountId],
                },
                method: 'tx',
            });
            return result;
        });
        /**
         * Fetch transaction status with all receipts.
         * @param transactionHash The transactions' hash.
         * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
         * @returns The transaction result with all receipts.
         */
        this.transactionStatusWithReceipts = (transactionHash, accountId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.rpcCall({
                body: {
                    params: [transactionHash, accountId],
                },
                method: 'EXPERIMENTAL_tx_status',
            });
            return result;
        });
        this.api = new api_1.API(apiConfig);
        this.networkName = apiConfig.networkName || types_1.Network.testnet;
        this.chain = apiConfig.chain || types_1.Chain.near;
        this.nearConfig = this.getNearConfig(this.networkName);
        this.keyStore = this.getKeyStore();
        this.minter = new minter_1.Minter();
        return this;
    }
    /**
     * Creates a connection to a NEAR smart contract
     * @param props wallet connection properties - the config to create a connection with
     *
     */
    connect(props = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractAddress = props.contractAddress || constants_1.STORE_FACTORY_CONTRACT_NAME;
            if (browser_or_node_1.isBrowser) {
                const _connectionObject = Object.assign({ deps: { keyStore: this.getKeyStore() } }, this.getNearConfig(this.networkName, contractAddress));
                const near = new near_api_js_1.Near(_connectionObject);
                this.activeNearConnection = near;
                this.activeWallet = new near_api_js_1.WalletAccount(near, constants_1.DEFAULT_APP_NAME);
                if (this.activeWallet.isSignedIn()) {
                    const accountId = this.activeWallet.getAccountId();
                    this.activeAccount = yield this.activeNearConnection.account(accountId);
                }
                else {
                    this.activeWallet.requestSignIn(contractAddress, constants_1.DEFAULT_APP_NAME);
                }
            }
            else if (browser_or_node_1.isNode) {
                const privateKey = props.privateKey;
                if (!privateKey)
                    throw new Error('Private key is not defined.');
                this.setSessionKeyPair(constants_1.STORE_FACTORY_CONTRACT_NAME, privateKey);
                const _connectionObject = Object.assign({ deps: { keyStore: this.getKeyStore() } }, this.getNearConfig(this.networkName, contractAddress));
                const near = new near_api_js_1.Near(_connectionObject);
                this.activeNearConnection = near;
                this.activeWallet = new near_api_js_1.WalletAccount(near, constants_1.DEFAULT_APP_NAME);
                const accountId = this.activeWallet.getAccountId();
                this.activeAccount = yield this.activeNearConnection.account(accountId);
            }
            else {
                throw new Error('Only Browser or Node environment supported.');
            }
        });
    }
    /**
     * Disconnects user. Removes the LocalStorage entry that
     * represents an authorized wallet account but leaves private keys intact.
     */
    disconnect() {
        var _a;
        (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.signOut();
        this.activeNearConnection = undefined;
        this.activeAccount = undefined;
    }
    /**
     * Connects to a wallet stored on local storage.
     * @param accountId the account identifier to connect.
     * @returns whether connection was successful or not.
     */
    connectTo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            // get localstorage accounts
            const localAccounts = this.getLocalAccounts();
            // does account user is trying to connect exists in storage?
            if (!localAccounts[accountId]) {
                return false;
            }
            // get a full access public key with the largest nonce
            const _getFullAccessPublicKey = (accountId) => __awaiter(this, void 0, void 0, function* () {
                const keysRequest = yield this.viewAccessKeyList(accountId);
                // filter by full access keys
                const fullAccessKeys = keysRequest.keys.filter((acc) => acc.access_key.permission === 'FullAccess');
                // get the highest nonce key
                const highestNonceKey = fullAccessKeys.reduce((acc, curr) => { var _a, _b; return (((_a = acc === null || acc === void 0 ? void 0 : acc.access_key) === null || _a === void 0 ? void 0 : _a.nonce) > ((_b = curr === null || curr === void 0 ? void 0 : curr.access_key) === null || _b === void 0 ? void 0 : _b.nonce) ? acc : curr); });
                return highestNonceKey;
            });
            if (browser_or_node_1.isBrowser) {
                const localStorageKey = `${constants_1.DEFAULT_APP_NAME}${constants_1.NEAR_LOCAL_STORAGE_KEY_SUFFIX}`;
                const fullAccessKey = yield _getFullAccessPublicKey(accountId);
                localStorage.setItem(localStorageKey, JSON.stringify({
                    accountId: accountId,
                    allKeys: [fullAccessKey.public_key],
                }));
                this.connect();
                return true;
            }
            // TODO: Implement for Node environment
            // if(isNode) {}
            return false;
        });
    }
    /**
     * Fetches connected account details.
     * @returns details of the current connection.
     */
    details() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = account === null || account === void 0 ? void 0 : account.accountId;
            const keyPair = yield this.getSessionKeyPair();
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            if (!keyPair || !accountId)
                throw new Error(`No Key Pair for account ${accountId}`);
            const publicKey = keyPair.getPublicKey().toString();
            const balance = yield account.getAccountBalance();
            if (!balance)
                throw new Error(``);
            const accessKey = yield this.viewAccessKey(accountId, publicKey);
            const allowance = near_api_js_1.utils.format.formatNearAmount(accessKey.permission.FunctionCall.allowance);
            const contractName = (_b = this.activeNearConnection) === null || _b === void 0 ? void 0 : _b.config.contractName;
            return {
                accountId: accountId,
                balance: near_api_js_1.utils.format.formatNearAmount(balance === null || balance === void 0 ? void 0 : balance.total, 2),
                allowance: allowance,
                contractName: contractName,
            };
        });
    }
    /**
     * Transfer one or more tokens.
     * @param contractName The contract name to transfer tokens from.
     * @param tokenIds The mapping of transfers, defined by: [[accountName1, tokenId1], [accountName2, tokenId2]]
     */
    // TODO: need more checks on the tokenIds
    transfer({ contractName, tokenIds, }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            const MAX_GAS = new bn_js_1.default('300000000000000');
            const ZERO = new bn_js_1.default('0');
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            if (!contractName)
                throw new Error('No contract was provided.');
            const contract = new near_api_js_1.Contract(account, contractName, {
                viewMethods: constants_1.STORE_CONTRACT_VIEW_METHODS,
                changeMethods: constants_1.STORE_CONTRACT_CALL_METHODS,
            });
            // @ts-ignore: method does not exist on Contract type
            yield contract.batch_transfer({ token_ids: tokenIds }, MAX_GAS, ZERO);
        });
    }
    /**
     * List an item for sale in the market.
     * @param tokenId The token id.
     * @param storeId The token store id (contract name).
     * @param price The listing price.
     * @param splitOwners List of splits.
     */
    listForSale(tokenId /*| string[]*/, storeId, price, splitOwners) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            const GAS = new bn_js_1.default('300000000000000');
            const bal = '100000000000000000000000';
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            // TODO: Check if account owns the tokens that are trying to sell
            console.log(splitOwners);
            const token = yield this.api.fetchToken(tokenId, `${tokenId}:${storeId}`);
            const isOwner = token.ownerId === accountId;
            if (!isOwner)
                throw new Error('User does not own token.');
            const contract = new near_api_js_1.Contract(account, token.storeId, {
                viewMethods: constants_1.STORE_CONTRACT_VIEW_METHODS,
                changeMethods: constants_1.STORE_CONTRACT_CALL_METHODS,
            });
            // TODO: Checks on split_owners
            // @ts-ignore: method does not exist on Contract type
            yield contract.list_tokens({
                contract_address: null,
                token_ids: [Number(token.tokenId)],
                autotransfer: true,
                asking_price: price,
                split_owners: null, //{ [accountId]: 10000 },
            }, GAS, bal);
        });
    }
    /**
     * Makes offer to a listing in the market.
     * @param groupId
     * @param price
     */
    makeOffer(groupId, price) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            const GAS = new bn_js_1.default('300000000000000');
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            if (!groupId)
                throw new Error('Please provide a groupId');
            const result = yield this.api.fetchLists(groupId);
            if (result.list.length === 0)
                throw new Error('List is empty');
            // TODO: make sure to get a list that is available
            const list = result.list[0];
            const contract = new near_api_js_1.Contract(account, constants_1.MARKET_ACCOUNT, {
                viewMethods: ['get_token_owner_id', 'get_token', 'get_token_token_id'],
                changeMethods: ['make_offer'],
            });
            // @ts-ignore: method does not exist on Contract type
            yield contract.make_offer({
                token_key: list.tokenKey,
                price: price || list.price,
                timeout: { Hours: 72 },
            }, GAS, list.price);
        });
    }
    /**
     * Creates a store
     * @param storeId Store name
     * @param symbol Store symbol
     */
    deployStore(storeId, symbol) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            const balance = '7000000000000000000000000';
            const gas = new bn_js_1.default('300000000000000');
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            // TODO: regex check inputs (storeId and symbol)
            const contract = new near_api_js_1.Contract(account, constants_1.STORE_FACTORY_CONTRACT_NAME, {
                viewMethods: [
                    'get_min_attached_balance',
                    'get_number_of_tokens',
                    'get_store_descriptions',
                    'get_token_description',
                    'get_owner',
                    'get_mintbase_fee',
                ],
                changeMethods: [
                    'create_store',
                    'set_mintbase_fee',
                    'transfer_ownership',
                    'new',
                ],
            });
            const storeData = {
                store_description: {
                    store_id: storeId,
                    owner_id: accountId,
                    symbol: symbol,
                    icon_base64: 'eeieieieie',
                    base_uri: constants_1.BASE_ARWEAVE_URI,
                    marketplace_id: constants_1.MARKET_ACCOUNT,
                },
            };
            // @ts-ignore: method does not exist on Contract type
            yield contract.create_store(storeData, gas, balance);
        });
    }
    /**
     * Mint a token
     * @param amount The number of tokens to mint.
     * @param contractName The contract in which tokens will be minted.
     */
    mint(amount, contractName) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            const MAX_GAS = new bn_js_1.default('300000000000000');
            const ZERO = new bn_js_1.default('0');
            if (!account || !accountId)
                throw new Error('Account is undefined.');
            if (!contractName)
                throw new Error('No contract was provided.');
            const contract = new near_api_js_1.Contract(account, contractName, {
                viewMethods: constants_1.STORE_CONTRACT_VIEW_METHODS,
                changeMethods: constants_1.STORE_CONTRACT_CALL_METHODS,
            });
            // TODO: Check if minter has a valid object to mint.
            const metadataId = yield this.minter.getMetadataId();
            const obj = {
                owner_id: accountId,
                meta_id: metadataId,
                num_to_mint: amount,
                royalty_f: 1000,
                royalty: null, //data[Field.Royalty],
            };
            // @ts-ignore: method does not exist on Contract type
            yield contract.mint_tokens(obj, MAX_GAS, ZERO);
        });
    }
    setSessionKeyPair(accountId, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyStore = this.keyStore;
            keyStore.setKey(this.networkName, accountId, near_api_js_1.KeyPair.fromString(privateKey));
            return keyStore;
        });
    }
    getSessionKeyPair() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const accountId = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.getAccountId();
            const keyStore = this.keyStore;
            if (!accountId)
                throw new Error('accountId is undefined');
            return yield (keyStore === null || keyStore === void 0 ? void 0 : keyStore.getKey(this.networkName, accountId));
        });
    }
    getKeyStore() {
        if (browser_or_node_1.isNode)
            return new near_api_js_1.keyStores.InMemoryKeyStore();
        if (browser_or_node_1.isBrowser)
            return new near_api_js_1.keyStores.BrowserLocalStorageKeyStore();
        throw new Error('Runtime environment has to be Node or Browser');
    }
    // private getKeyPairFromLocalstorage() {}
    /**
     * Fetch local storage connections
     */
    getLocalAccounts() {
        const regex = /near-api-js:keystore:/gm;
        const keys = Object.keys(localStorage);
        const matches = keys.filter((key) => {
            return regex.exec(key) !== null;
        });
        let accounts = {};
        matches.forEach((key) => {
            const accountId = key.split(':')[2];
            accounts = Object.assign(Object.assign({}, accounts), { [accountId]: {
                    accountId: accountId,
                    contractName: '', // TODO: get contractName connection
                } });
        });
        return accounts;
    }
    /**
     * Fetch transaction result given a transaction hash.
     * @param txHash the transaction's hash
     * @returns the transaction result
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchTransactionResult(txHash) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (_a = this.activeNearConnection) === null || _a === void 0 ? void 0 : _a.connection;
            if (!connection)
                throw new Error('Near connection is undefined.');
            const accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
            if (!accountId)
                throw new Error('Account Id is undefined.');
            const decodeHash = near_api_js_1.utils.serialize.base_decode(txHash);
            const txResult = yield connection.provider.txStatus(decodeHash, accountId);
            return txResult;
        });
    }
    /**
     * Get NEAR configuration object. Defaults to testnet.
     * @param networkName
     * @param contractAddress
     */
    getNearConfig(networkName, contractAddress) {
        switch (networkName) {
            case types_1.Network.testnet:
                return {
                    networkId: 'testnet',
                    nodeUrl: 'https://rpc.testnet.near.org',
                    contractName: contractAddress || constants_1.STORE_FACTORY_CONTRACT_NAME,
                    walletUrl: 'https://wallet.testnet.near.org',
                    helperUrl: 'https://helper.testnet.near.org',
                };
            case types_1.Network.main:
                return {
                    networkId: 'mainnet',
                    nodeUrl: 'https://rpc.mainnet.near.org',
                    contractName: contractAddress || constants_1.STORE_FACTORY_CONTRACT_NAME,
                    walletUrl: 'https://wallet.mainnet.near.org',
                    helperUrl: 'https://helper.mainnet.near.org',
                };
            default:
                return {
                    networkId: 'testnet',
                    nodeUrl: 'https://rpc.testnet.near.org',
                    contractName: contractAddress || constants_1.STORE_FACTORY_CONTRACT_NAME,
                    walletUrl: 'https://wallet.testnet.near.org',
                    helperUrl: 'https://helper.testnet.near.org',
                };
        }
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map