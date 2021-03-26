"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
require("isomorphic-unfetch");
var browser_or_node_1 = require("browser-or-node");
var near_api_js_1 = require("near-api-js");
var bn_js_1 = __importDefault(require("bn.js"));
var api_1 = require("./api");
var types_1 = require("./types");
var constants_1 = require("./constants");
var Wallet = /** @class */ (function () {
    function Wallet(apiConfig) {
        var _this = this;
        this.networkName = types_1.Network.testnet;
        this.chain = types_1.Chain.near;
        // === RPC CALLS ===
        this.viewAccessKey = function (_a) {
            var account = _a.account, publicKey = _a.publicKey;
            return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.rpcCall({
                                body: {
                                    params: {
                                        request_type: 'view_access_key',
                                        finality: 'final',
                                        account_id: account,
                                        public_key: publicKey,
                                    },
                                },
                                method: 'query',
                            })];
                        case 1:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * Fetch all account access keys
         * @param accountId account name
         * @returns array of
         */
        this.viewAccessKeyList = function (_a) {
            var accountId = _a.accountId;
            return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.rpcCall({
                                body: {
                                    params: {
                                        request_type: 'view_access_key_list',
                                        finality: 'final',
                                        account_id: accountId,
                                    },
                                },
                                method: 'query',
                            })];
                        case 1:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        this.transactionStatus = function (transactionHash, accountId) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rpcCall({
                            body: {
                                params: [transactionHash, accountId],
                            },
                            method: 'tx',
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.transactionStatusWithReceipts = function (transactionHash, accountId) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rpcCall({
                            body: {
                                params: [transactionHash, accountId],
                            },
                            method: 'EXPERIMENTAL_tx_status',
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        this.rpcCall = function (_a) {
            var _b = _a.headers, headers = _b === void 0 ? {} : _b, _c = _a.body, body = _c === void 0 ? {} : _c, method = _a.method;
            return __awaiter(_this, void 0, void 0, function () {
                var request, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, fetch(this.nearConfig.nodeUrl, {
                                method: 'POST',
                                body: JSON.stringify(__assign(__assign({}, body), { jsonrpc: '2.0', id: "mintbase-" + Math.random().toString().substr(2, 10), method: method })),
                                headers: __assign(__assign({}, headers), { 'Content-Type': 'application/json' }),
                            })];
                        case 1:
                            request = _d.sent();
                            return [4 /*yield*/, request.json()];
                        case 2:
                            data = _d.sent();
                            return [2 /*return*/, data === null || data === void 0 ? void 0 : data.result];
                    }
                });
            });
        };
        this.api = new api_1.API(apiConfig);
        this.networkName = apiConfig.networkName || types_1.Network.testnet;
        this.chain = apiConfig.chain || types_1.Chain.near;
        this.nearConfig = this.getNearConfig(this.networkName);
        this.keyStore = this.getKeyStore();
        return this;
    }
    /**
     * Creates a connection to a NEAR smart contract
     * @param contractAddress the contract address to initiate a connection
     *
     */
    Wallet.prototype.connect = function (props) {
        if (props === void 0) { props = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, _connectionObject, near, accountId, _a, privateKey, _connectionObject, near, accountId, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = props.contractAddress || constants_1.STORE_FACTORY_CONTRACT_NAME;
                        if (!browser_or_node_1.isBrowser) return [3 /*break*/, 4];
                        _connectionObject = __assign({ deps: { keyStore: this.getKeyStore() } }, this.getNearConfig(this.networkName, contractAddress));
                        near = new near_api_js_1.Near(_connectionObject);
                        this.activeNearConnection = near;
                        this.activeWallet = new near_api_js_1.WalletAccount(near, constants_1.DEFAULT_APP_NAME);
                        if (!this.activeWallet.isSignedIn()) return [3 /*break*/, 2];
                        accountId = this.activeWallet.getAccountId();
                        _a = this;
                        return [4 /*yield*/, this.activeNearConnection.account(accountId)];
                    case 1:
                        _a.activeAccount = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.activeWallet.requestSignIn(contractAddress, constants_1.DEFAULT_APP_NAME);
                        _c.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        if (!browser_or_node_1.isNode) return [3 /*break*/, 6];
                        privateKey = props.privateKey;
                        if (!privateKey)
                            throw new Error('Private key is not defined.');
                        this.setSessionKeyPair(constants_1.STORE_FACTORY_CONTRACT_NAME, privateKey);
                        _connectionObject = __assign({ deps: { keyStore: this.getKeyStore() } }, this.getNearConfig(this.networkName, contractAddress));
                        near = new near_api_js_1.Near(_connectionObject);
                        this.activeNearConnection = near;
                        this.activeWallet = new near_api_js_1.WalletAccount(near, constants_1.DEFAULT_APP_NAME);
                        accountId = this.activeWallet.getAccountId();
                        _b = this;
                        return [4 /*yield*/, this.activeNearConnection.account(accountId)];
                    case 5:
                        _b.activeAccount = _c.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error('Only Browser or Node environment supported.');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Disconnects user. Removes the LocalStorage entry that
     * represents an authorized wallet account but leaves private keys intact.
     *
     */
    Wallet.prototype.disconnect = function () {
        var _a;
        (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.signOut();
        this.activeNearConnection = undefined;
        this.activeAccount = undefined;
    };
    /**
     * TODO1: Manage errors
     */
    Wallet.prototype.connectTo = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var localAccounts, _getFullAccessPublicKey, localStorageKey, fullAccessKey;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localAccounts = this.getLocalAccounts();
                        // does account user is trying to connect exists in storage?
                        if (!localAccounts[accountId]) {
                            return [2 /*return*/, false];
                        }
                        _getFullAccessPublicKey = function (accountId) { return __awaiter(_this, void 0, void 0, function () {
                            var keysRequest, fullAccessKeys, highestNonceKey;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.viewAccessKeyList({ accountId: accountId })
                                        // filter by full access keys
                                    ];
                                    case 1:
                                        keysRequest = _a.sent();
                                        fullAccessKeys = keysRequest.keys.filter(function (acc) {
                                            return acc.access_key.permission === 'FullAccess';
                                        });
                                        highestNonceKey = fullAccessKeys.reduce(function (acc, curr) { var _a, _b; return (((_a = acc === null || acc === void 0 ? void 0 : acc.access_key) === null || _a === void 0 ? void 0 : _a.nonce) > ((_b = curr === null || curr === void 0 ? void 0 : curr.access_key) === null || _b === void 0 ? void 0 : _b.nonce) ? acc : curr); });
                                        return [2 /*return*/, highestNonceKey];
                                }
                            });
                        }); };
                        if (!browser_or_node_1.isBrowser) return [3 /*break*/, 2];
                        localStorageKey = "" + constants_1.DEFAULT_APP_NAME + constants_1.NEAR_LOCAL_STORAGE_KEY_SUFFIX;
                        return [4 /*yield*/, _getFullAccessPublicKey(accountId)];
                    case 1:
                        fullAccessKey = _a.sent();
                        localStorage.setItem(localStorageKey, JSON.stringify({
                            accountId: accountId,
                            allKeys: [fullAccessKey.public_key],
                        }));
                        this.connect();
                        return [2 /*return*/, true];
                    case 2: 
                    // TODO: Implement for Node environment
                    // if(isNode) {}
                    return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Fetches connected account details.
     * @returns
     */
    Wallet.prototype.details = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var accountId, keyPair, publicKey, balance, accessKey, allowance, contractName;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        accountId = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.getAccountId();
                        return [4 /*yield*/, this.getSessionKeyPair()];
                    case 1:
                        keyPair = _d.sent();
                        if (!keyPair || !accountId)
                            throw new Error("No Key Pair for account " + accountId);
                        publicKey = keyPair.getPublicKey().toString();
                        return [4 /*yield*/, ((_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().getAccountBalance())];
                    case 2:
                        balance = _d.sent();
                        if (!balance)
                            throw new Error("");
                        return [4 /*yield*/, this.viewAccessKey({
                                account: accountId,
                                publicKey: publicKey,
                            })];
                    case 3:
                        accessKey = _d.sent();
                        allowance = near_api_js_1.utils.format.formatNearAmount(accessKey.permission.FunctionCall.allowance);
                        contractName = (_c = this.activeNearConnection) === null || _c === void 0 ? void 0 : _c.config.contractName;
                        return [2 /*return*/, {
                                accountId: accountId,
                                balance: near_api_js_1.utils.format.formatNearAmount(balance === null || balance === void 0 ? void 0 : balance.total, 2),
                                allowance: allowance,
                                contractName: contractName,
                            }];
                }
            });
        });
    };
    Wallet.prototype.transfer = function (_a) {
        var _b, _c;
        var contractName = _a.contractName, tokenIds = _a.tokenIds;
        return __awaiter(this, void 0, void 0, function () {
            var account, accountId, MAX_GAS, ZERO, assetContract;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        account = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account();
                        accountId = (_c = this.activeWallet) === null || _c === void 0 ? void 0 : _c.account().accountId;
                        MAX_GAS = new bn_js_1.default('300000000000000');
                        ZERO = new bn_js_1.default('0');
                        if (!account || !accountId)
                            throw new Error('Account is undefined.');
                        if (!contractName)
                            throw new Error('No contract was provided.');
                        assetContract = new near_api_js_1.Contract(account, contractName, {
                            viewMethods: constants_1.STORE_CONTRACT_VIEW_METHODS,
                            changeMethods: constants_1.STORE_CONTRACT_CALL_METHODS,
                        });
                        // @ts-ignore: method does not exist on Contract type
                        return [4 /*yield*/, assetContract.batch_transfer({ token_ids: tokenIds }, MAX_GAS, ZERO)];
                    case 1:
                        // @ts-ignore: method does not exist on Contract type
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Wallet.prototype.listForSale = function (tokenId /*| string[]*/, storeId, price, splitOwners) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var account, accountId, GAS, bal, token, isOwner, assetContract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
                        accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
                        GAS = new bn_js_1.default('300000000000000');
                        bal = '100000000000000000000000';
                        if (!account || !accountId)
                            throw new Error('Account is undefined.');
                        return [4 /*yield*/, this.api.fetchToken(tokenId, tokenId + ":" + storeId)];
                    case 1:
                        token = _c.sent();
                        isOwner = token.ownerId === accountId;
                        if (!isOwner)
                            throw new Error('User does not own token.');
                        assetContract = new near_api_js_1.Contract(account, token.storeId, {
                            viewMethods: constants_1.STORE_CONTRACT_VIEW_METHODS,
                            changeMethods: constants_1.STORE_CONTRACT_CALL_METHODS,
                        });
                        // @ts-ignore: method does not exist on Contract type
                        return [4 /*yield*/, assetContract.list_tokens({
                                contract_address: null,
                                token_ids: [Number(token.tokenId)],
                                autotransfer: true,
                                asking_price: price,
                                split_owners: null, //{ [accountId]: 10000 },
                            }, GAS, bal)];
                    case 2:
                        // @ts-ignore: method does not exist on Contract type
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Makes offer.
     * @param xxx
     * @returns
     */
    Wallet.prototype.makeOffer = function (props) {
        var _a, _b;
        if (props === void 0) { props = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var account, accountId, GAS, groupId, result, list, tokenContract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        account = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.account();
                        accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
                        GAS = new bn_js_1.default('300000000000000');
                        if (!account || !accountId)
                            throw new Error('Account is undefined.');
                        groupId = props.groupId;
                        if (!groupId)
                            throw new Error('Please provide a groupId');
                        return [4 /*yield*/, this.api.fetchLists(groupId)];
                    case 1:
                        result = _c.sent();
                        if (result.list.length === 0)
                            throw new Error('List is empty');
                        list = result.list[0];
                        tokenContract = new near_api_js_1.Contract(account, constants_1.MARKET_ACCOUNT, {
                            viewMethods: ['get_token_owner_id', 'get_token', 'get_token_token_id'],
                            changeMethods: ['make_offer'],
                        });
                        // @ts-ignore: method does not exist on Contract type
                        return [4 /*yield*/, tokenContract.make_offer({
                                token_key: list.tokenKey,
                                price: list.price,
                                timeout: { Hours: 72 },
                            }, GAS, list.price)];
                    case 2:
                        // @ts-ignore: method does not exist on Contract type
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a store. Interacts with the store factory to deploy a contract.
     * @param xxx
     * @returns
     */
    Wallet.prototype.deployStore = function (_a) {
        var _b, _c;
        var storeId = _a.storeId, symbol = _a.symbol;
        return __awaiter(this, void 0, void 0, function () {
            var account, accountId, balance, gas, factoryContract, storeData;
            return __generator(this, function (_d) {
                account = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account();
                accountId = (_c = this.activeWallet) === null || _c === void 0 ? void 0 : _c.account().accountId;
                balance = '7000000000000000000000000';
                gas = new bn_js_1.default('300000000000000');
                if (!account || !accountId)
                    throw new Error('Account is undefined.');
                factoryContract = new near_api_js_1.Contract(account, constants_1.STORE_FACTORY_CONTRACT_NAME, {
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
                storeData = {
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
                factoryContract.create_store(storeData, gas, balance);
                return [2 /*return*/];
            });
        });
    };
    /**
     * TODO: Figure out how to make this work with Arweave?
     * 1. Upload files to Arweave
     * 2. Generate metadata
     * 3. Interact with contract
     */
    //public async mint() {}
    Wallet.prototype.setSessionKeyPair = function (accountId, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var keyStore;
            return __generator(this, function (_a) {
                keyStore = this.keyStore;
                keyStore.setKey(this.networkName, accountId, near_api_js_1.KeyPair.fromString(privateKey));
                return [2 /*return*/, keyStore];
            });
        });
    };
    Wallet.prototype.getSessionKeyPair = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accountId, keyStore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accountId = (_a = this.activeWallet) === null || _a === void 0 ? void 0 : _a.getAccountId();
                        keyStore = this.keyStore;
                        if (!accountId)
                            throw new Error('accountId is undefined');
                        return [4 /*yield*/, (keyStore === null || keyStore === void 0 ? void 0 : keyStore.getKey(this.networkName, accountId))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Wallet.prototype.getKeyStore = function () {
        if (browser_or_node_1.isNode)
            return new near_api_js_1.keyStores.InMemoryKeyStore();
        if (browser_or_node_1.isBrowser)
            return new near_api_js_1.keyStores.BrowserLocalStorageKeyStore();
        throw new Error('Runtime environment has to be Node or Browser');
    };
    // private getKeyPairFromLocalstorage() {}
    /**
     * Fetch local storage connections
     */
    Wallet.prototype.getLocalAccounts = function () {
        var regex = /near-api-js:keystore:/gm;
        var keys = Object.keys(localStorage);
        var matches = keys.filter(function (key) {
            return regex.exec(key) !== null;
        });
        var accounts = {};
        matches.forEach(function (key) {
            var _a;
            var accountId = key.split(':')[2];
            accounts = __assign(__assign({}, accounts), (_a = {}, _a[accountId] = {
                accountId: accountId,
                contractName: '', // get contractName connection
            }, _a));
        });
        return accounts;
    };
    Wallet.prototype.fetchTransactionResult = function (txHash) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var connection, accountId, decodeHash, txResult;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        connection = (_a = this.activeNearConnection) === null || _a === void 0 ? void 0 : _a.connection;
                        if (!connection)
                            throw new Error('Near connection is undefined.');
                        accountId = (_b = this.activeWallet) === null || _b === void 0 ? void 0 : _b.account().accountId;
                        if (!accountId)
                            throw new Error('Account Id is undefined.');
                        decodeHash = near_api_js_1.utils.serialize.base_decode(txHash);
                        return [4 /*yield*/, connection.provider.txStatus(decodeHash, accountId)];
                    case 1:
                        txResult = _c.sent();
                        return [2 /*return*/, txResult];
                }
            });
        });
    };
    /**
     * Get NEAR configuration object. Defaults to testnet.
     * @param networkName
     * @param contractAddress
     */
    Wallet.prototype.getNearConfig = function (networkName, contractAddress) {
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
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.js.map