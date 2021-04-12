"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = void 0;

require("isomorphic-unfetch");

var _browserOrNode = require("browser-or-node");

var _nearApiJs = require("near-api-js");

var _bn = _interopRequireDefault(require("bn.js"));

var _api = require("./api");

var _types = require("./types");

var _constants = require("./constants");

var _minter = require("./minter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Mintbase Wallet.
 * Main entry point for users to sign and interact with NEAR and Mintbase infrastructure.
 */
var Wallet = /*#__PURE__*/function () {
  /**
   * Mintbase wallet constructor.
   * Creates an instance of a Mintbase wallet.
   * @param apiConfig api confuguration options.
   * @returns the wallet instance
   */
  function Wallet(apiConfig) {
    var _this = this;

    _classCallCheck(this, Wallet);

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "activeWallet", void 0);

    _defineProperty(this, "activeNearConnection", void 0);

    _defineProperty(this, "activeAccount", void 0);

    _defineProperty(this, "networkName", _types.Network.testnet);

    _defineProperty(this, "chain", _types.Chain.near);

    _defineProperty(this, "keyStore", void 0);

    _defineProperty(this, "nearConfig", void 0);

    _defineProperty(this, "minter", void 0);

    _defineProperty(this, "rpcCall", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _ref$headers, headers, _ref$body, body, method, request, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$headers = _ref.headers, headers = _ref$headers === void 0 ? {} : _ref$headers, _ref$body = _ref.body, body = _ref$body === void 0 ? {} : _ref$body, method = _ref.method;
                _context.next = 3;
                return fetch(_this.nearConfig.nodeUrl, {
                  method: 'POST',
                  body: JSON.stringify(_objectSpread(_objectSpread({}, body), {}, {
                    jsonrpc: '2.0',
                    id: "mintbase-".concat(Math.random().toString().substr(2, 10)),
                    method: method
                  })),
                  headers: _objectSpread(_objectSpread({}, headers), {}, {
                    'Content-Type': 'application/json'
                  })
                });

              case 3:
                request = _context.sent;
                _context.next = 6;
                return request.json();

              case 6:
                data = _context.sent;
                return _context.abrupt("return", data === null || data === void 0 ? void 0 : data.result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "viewAccessKey", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accountId, publicKey) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.rpcCall({
                  body: {
                    params: {
                      request_type: 'view_access_key',
                      finality: 'final',
                      account_id: accountId,
                      public_key: publicKey
                    }
                  },
                  method: 'query'
                });

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "viewAccessKeyList", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accountId) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.rpcCall({
                  body: {
                    params: {
                      request_type: 'view_access_key_list',
                      finality: 'final',
                      account_id: accountId
                    }
                  },
                  method: 'query'
                });

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "transactionStatus", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(transactionHash, accountId) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.rpcCall({
                  body: {
                    params: [transactionHash, accountId]
                  },
                  method: 'tx'
                });

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(this, "transactionStatusWithReceipts", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(transactionHash, accountId) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.rpcCall({
                  body: {
                    params: [transactionHash, accountId]
                  },
                  method: 'EXPERIMENTAL_tx_status'
                });

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }());

    this.api = new _api.API(apiConfig);
    this.networkName = apiConfig.networkName || _types.Network.testnet;
    this.chain = apiConfig.chain || _types.Chain.near;
    this.nearConfig = this.getNearConfig(this.networkName);
    this.keyStore = this.getKeyStore();
    this.minter = new _minter.Minter({
      apiKey: apiConfig.apiKey
    });
    return this;
  }
  /**
   * Creates a connection to a NEAR smart contract
   * @param props wallet connection properties - the config to create a connection with
   *
   */


  _createClass(Wallet, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var props,
            contractAddress,
            _connectionObject,
            near,
            accountId,
            privateKey,
            _connectionObject2,
            _near,
            _accountId,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                props = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                contractAddress = props.contractAddress || _constants.STORE_FACTORY_CONTRACT_NAME;

                if (!_browserOrNode.isBrowser) {
                  _context6.next = 17;
                  break;
                }

                _connectionObject = _objectSpread({
                  deps: {
                    keyStore: this.getKeyStore()
                  }
                }, this.getNearConfig(this.networkName, contractAddress));
                near = new _nearApiJs.Near(_connectionObject);
                this.activeNearConnection = near;
                this.activeWallet = new _nearApiJs.WalletAccount(near, _constants.DEFAULT_APP_NAME);

                if (!this.activeWallet.isSignedIn()) {
                  _context6.next = 14;
                  break;
                }

                accountId = this.activeWallet.getAccountId();
                _context6.next = 11;
                return this.activeNearConnection.account(accountId);

              case 11:
                this.activeAccount = _context6.sent;
                _context6.next = 15;
                break;

              case 14:
                this.activeWallet.requestSignIn(contractAddress, _constants.DEFAULT_APP_NAME);

              case 15:
                _context6.next = 33;
                break;

              case 17:
                if (!_browserOrNode.isNode) {
                  _context6.next = 32;
                  break;
                }

                privateKey = props.privateKey;

                if (privateKey) {
                  _context6.next = 21;
                  break;
                }

                throw new Error('Private key is not defined.');

              case 21:
                this.setSessionKeyPair(_constants.STORE_FACTORY_CONTRACT_NAME, privateKey);
                _connectionObject2 = _objectSpread({
                  deps: {
                    keyStore: this.getKeyStore()
                  }
                }, this.getNearConfig(this.networkName, contractAddress));
                _near = new _nearApiJs.Near(_connectionObject2);
                this.activeNearConnection = _near;
                this.activeWallet = new _nearApiJs.WalletAccount(_near, _constants.DEFAULT_APP_NAME);
                _accountId = this.activeWallet.getAccountId();
                _context6.next = 29;
                return this.activeNearConnection.account(_accountId);

              case 29:
                this.activeAccount = _context6.sent;
                _context6.next = 33;
                break;

              case 32:
                throw new Error('Only Browser or Node environment supported.');

              case 33:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
    /**
     * Disconnects user. Removes the LocalStorage entry that
     * represents an authorized wallet account but leaves private keys intact.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this$activeWallet;

      (_this$activeWallet = this.activeWallet) === null || _this$activeWallet === void 0 ? void 0 : _this$activeWallet.signOut();
      this.activeNearConnection = undefined;
      this.activeAccount = undefined;
    }
    /**
     * Connects to a wallet stored on local storage.
     * @param accountId the account identifier to connect.
     * @returns whether connection was successful or not.
     */

  }, {
    key: "connectTo",
    value: function () {
      var _connectTo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(accountId) {
        var _this2 = this;

        var localAccounts, _getFullAccessPublicKey, localStorageKey, fullAccessKey;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // get localstorage accounts
                localAccounts = this.getLocalAccounts(); // does account user is trying to connect exists in storage?

                if (localAccounts[accountId]) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", false);

              case 3:
                // get a full access public key with the largest nonce
                _getFullAccessPublicKey = /*#__PURE__*/function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(accountId) {
                    var keysRequest, fullAccessKeys, highestNonceKey;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _this2.viewAccessKeyList(accountId);

                          case 2:
                            keysRequest = _context7.sent;
                            // filter by full access keys
                            fullAccessKeys = keysRequest.keys.filter(function (acc) {
                              return acc.access_key.permission === 'FullAccess';
                            }); // get the highest nonce key

                            highestNonceKey = fullAccessKeys.reduce(function (acc, curr) {
                              var _acc$access_key, _curr$access_key;

                              return (acc === null || acc === void 0 ? void 0 : (_acc$access_key = acc.access_key) === null || _acc$access_key === void 0 ? void 0 : _acc$access_key.nonce) > (curr === null || curr === void 0 ? void 0 : (_curr$access_key = curr.access_key) === null || _curr$access_key === void 0 ? void 0 : _curr$access_key.nonce) ? acc : curr;
                            });
                            return _context7.abrupt("return", highestNonceKey);

                          case 6:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function _getFullAccessPublicKey(_x10) {
                    return _ref7.apply(this, arguments);
                  };
                }();

                if (!_browserOrNode.isBrowser) {
                  _context8.next = 12;
                  break;
                }

                localStorageKey = "".concat(_constants.DEFAULT_APP_NAME).concat(_constants.NEAR_LOCAL_STORAGE_KEY_SUFFIX);
                _context8.next = 8;
                return _getFullAccessPublicKey(accountId);

              case 8:
                fullAccessKey = _context8.sent;
                localStorage.setItem(localStorageKey, JSON.stringify({
                  accountId: accountId,
                  allKeys: [fullAccessKey.public_key]
                }));
                this.connect();
                return _context8.abrupt("return", true);

              case 12:
                return _context8.abrupt("return", false);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function connectTo(_x9) {
        return _connectTo.apply(this, arguments);
      }

      return connectTo;
    }()
    /**
     * Fetches connected account details.
     * @returns details of the current connection.
     */

  }, {
    key: "details",
    value: function () {
      var _details = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this$activeWallet2, _this$activeNearConne;

        var account, accountId, keyPair, publicKey, balance, accessKey, allowance, contractName;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                account = (_this$activeWallet2 = this.activeWallet) === null || _this$activeWallet2 === void 0 ? void 0 : _this$activeWallet2.account();
                accountId = account === null || account === void 0 ? void 0 : account.accountId;
                _context9.next = 4;
                return this.getSessionKeyPair();

              case 4:
                keyPair = _context9.sent;

                if (!(!account || !accountId)) {
                  _context9.next = 7;
                  break;
                }

                throw new Error('Account is undefined.');

              case 7:
                if (!(!keyPair || !accountId)) {
                  _context9.next = 9;
                  break;
                }

                throw new Error("No Key Pair for account ".concat(accountId));

              case 9:
                publicKey = keyPair.getPublicKey().toString();
                _context9.next = 12;
                return account.getAccountBalance();

              case 12:
                balance = _context9.sent;

                if (balance) {
                  _context9.next = 15;
                  break;
                }

                throw new Error("");

              case 15:
                _context9.next = 17;
                return this.viewAccessKey(accountId, publicKey);

              case 17:
                accessKey = _context9.sent;
                allowance = _nearApiJs.utils.format.formatNearAmount(accessKey.permission.FunctionCall.allowance);
                contractName = (_this$activeNearConne = this.activeNearConnection) === null || _this$activeNearConne === void 0 ? void 0 : _this$activeNearConne.config.contractName;
                return _context9.abrupt("return", {
                  accountId: accountId,
                  balance: _nearApiJs.utils.format.formatNearAmount(balance === null || balance === void 0 ? void 0 : balance.total, 2),
                  allowance: allowance,
                  contractName: contractName
                });

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function details() {
        return _details.apply(this, arguments);
      }

      return details;
    }()
    /**
     * Transfer one or more tokens.
     * @param contractName The contract name to transfer tokens from.
     * @param tokenIds The mapping of transfers, defined by: [[accountName1, tokenId1], [accountName2, tokenId2]]
     */
    // TODO: need more checks on the tokenIds

  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref8) {
        var _this$activeWallet3, _this$activeWallet4;

        var contractName, tokenIds, account, accountId, MAX_GAS, ZERO, contract;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                contractName = _ref8.contractName, tokenIds = _ref8.tokenIds;
                account = (_this$activeWallet3 = this.activeWallet) === null || _this$activeWallet3 === void 0 ? void 0 : _this$activeWallet3.account();
                accountId = (_this$activeWallet4 = this.activeWallet) === null || _this$activeWallet4 === void 0 ? void 0 : _this$activeWallet4.account().accountId;
                MAX_GAS = new _bn["default"]('300000000000000');
                ZERO = new _bn["default"]('0');

                if (!(!account || !accountId)) {
                  _context10.next = 7;
                  break;
                }

                throw new Error('Account is undefined.');

              case 7:
                if (contractName) {
                  _context10.next = 9;
                  break;
                }

                throw new Error('No contract was provided.');

              case 9:
                contract = new _nearApiJs.Contract(account, contractName, {
                  viewMethods: _constants.STORE_CONTRACT_VIEW_METHODS,
                  changeMethods: _constants.STORE_CONTRACT_CALL_METHODS
                }); // @ts-ignore: method does not exist on Contract type

                _context10.next = 12;
                return contract.batch_transfer({
                  token_ids: tokenIds
                }, MAX_GAS, ZERO);

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function transfer(_x11) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
    /**
     * List an item for sale in the market.
     * @param tokenId The token id.
     * @param storeId The token store id (contract name).
     * @param price The listing price.
     * @param splitOwners List of splits.
     */

  }, {
    key: "listForSale",
    value: function () {
      var _listForSale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(tokenId,
      /*| string[]*/
      storeId, price, splitOwners) {
        var _this$activeWallet5, _this$activeWallet6;

        var account, accountId, GAS, bal, token, isOwner, contract;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                account = (_this$activeWallet5 = this.activeWallet) === null || _this$activeWallet5 === void 0 ? void 0 : _this$activeWallet5.account();
                accountId = (_this$activeWallet6 = this.activeWallet) === null || _this$activeWallet6 === void 0 ? void 0 : _this$activeWallet6.account().accountId;
                GAS = new _bn["default"]('300000000000000');
                bal = '100000000000000000000000';

                if (!(!account || !accountId)) {
                  _context11.next = 6;
                  break;
                }

                throw new Error('Account is undefined.');

              case 6:
                // TODO: Check if account owns the tokens that are trying to sell
                console.log(splitOwners);
                _context11.next = 9;
                return this.api.fetchToken(tokenId, "".concat(tokenId, ":").concat(storeId));

              case 9:
                token = _context11.sent;
                isOwner = token.ownerId === accountId;

                if (isOwner) {
                  _context11.next = 13;
                  break;
                }

                throw new Error('User does not own token.');

              case 13:
                contract = new _nearApiJs.Contract(account, token.storeId, {
                  viewMethods: _constants.STORE_CONTRACT_VIEW_METHODS,
                  changeMethods: _constants.STORE_CONTRACT_CALL_METHODS
                }); // TODO: Checks on split_owners
                // @ts-ignore: method does not exist on Contract type

                _context11.next = 16;
                return contract.list_tokens({
                  contract_address: null,
                  token_ids: [Number(token.tokenId)],
                  autotransfer: true,
                  asking_price: price,
                  split_owners: null //{ [accountId]: 10000 },

                }, GAS, bal);

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function listForSale(_x12, _x13, _x14, _x15) {
        return _listForSale.apply(this, arguments);
      }

      return listForSale;
    }()
    /**
     * Makes offer to a listing in the market.
     * @param groupId
     * @param price
     */

  }, {
    key: "makeOffer",
    value: function () {
      var _makeOffer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(groupId, price) {
        var _this$activeWallet7, _this$activeWallet8;

        var account, accountId, GAS, result, list, contract;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                account = (_this$activeWallet7 = this.activeWallet) === null || _this$activeWallet7 === void 0 ? void 0 : _this$activeWallet7.account();
                accountId = (_this$activeWallet8 = this.activeWallet) === null || _this$activeWallet8 === void 0 ? void 0 : _this$activeWallet8.account().accountId;
                GAS = new _bn["default"]('300000000000000');

                if (!(!account || !accountId)) {
                  _context12.next = 5;
                  break;
                }

                throw new Error('Account is undefined.');

              case 5:
                if (groupId) {
                  _context12.next = 7;
                  break;
                }

                throw new Error('Please provide a groupId');

              case 7:
                _context12.next = 9;
                return this.api.fetchLists(groupId);

              case 9:
                result = _context12.sent;

                if (!(result.list.length === 0)) {
                  _context12.next = 12;
                  break;
                }

                throw new Error('List is empty');

              case 12:
                // TODO: make sure to get a list that is available
                list = result.list[0];
                contract = new _nearApiJs.Contract(account, _constants.MARKET_ACCOUNT, {
                  viewMethods: ['get_token_owner_id', 'get_token', 'get_token_token_id'],
                  changeMethods: ['make_offer']
                }); // @ts-ignore: method does not exist on Contract type

                _context12.next = 16;
                return contract.make_offer({
                  token_key: list.tokenKey,
                  price: price || list.price,
                  timeout: {
                    Hours: 72
                  }
                }, GAS, list.price);

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function makeOffer(_x16, _x17) {
        return _makeOffer.apply(this, arguments);
      }

      return makeOffer;
    }()
    /**
     * Creates a store
     * @param storeId Store name
     * @param symbol Store symbol
     */

  }, {
    key: "deployStore",
    value: function () {
      var _deployStore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(storeId, symbol) {
        var _this$activeWallet9, _this$activeWallet10;

        var account, accountId, balance, gas, contract, storeData;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                account = (_this$activeWallet9 = this.activeWallet) === null || _this$activeWallet9 === void 0 ? void 0 : _this$activeWallet9.account();
                accountId = (_this$activeWallet10 = this.activeWallet) === null || _this$activeWallet10 === void 0 ? void 0 : _this$activeWallet10.account().accountId;
                balance = '7000000000000000000000000';
                gas = new _bn["default"]('300000000000000');

                if (!(!account || !accountId)) {
                  _context13.next = 6;
                  break;
                }

                throw new Error('Account is undefined.');

              case 6:
                // TODO: regex check inputs (storeId and symbol)
                contract = new _nearApiJs.Contract(account, _constants.STORE_FACTORY_CONTRACT_NAME, {
                  viewMethods: ['get_min_attached_balance', 'get_number_of_tokens', 'get_store_descriptions', 'get_token_description', 'get_owner', 'get_mintbase_fee'],
                  changeMethods: ['create_store', 'set_mintbase_fee', 'transfer_ownership', 'new']
                });
                storeData = {
                  store_description: {
                    store_id: storeId,
                    owner_id: accountId,
                    symbol: symbol,
                    icon_base64: 'eeieieieie',
                    base_uri: _constants.BASE_ARWEAVE_URI,
                    marketplace_id: _constants.MARKET_ACCOUNT
                  }
                }; // @ts-ignore: method does not exist on Contract type

                _context13.next = 10;
                return contract.create_store(storeData, gas, balance);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function deployStore(_x18, _x19) {
        return _deployStore.apply(this, arguments);
      }

      return deployStore;
    }()
    /**
     * Mint a token
     * @param amount The number of tokens to mint.
     * @param contractName The contract in which tokens will be minted.
     */

  }, {
    key: "mint",
    value: function () {
      var _mint = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(amount, contractName) {
        var _this$activeWallet11, _this$activeWallet12;

        var account, accountId, MAX_GAS, ZERO, contract, metadataId, obj;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                account = (_this$activeWallet11 = this.activeWallet) === null || _this$activeWallet11 === void 0 ? void 0 : _this$activeWallet11.account();
                accountId = (_this$activeWallet12 = this.activeWallet) === null || _this$activeWallet12 === void 0 ? void 0 : _this$activeWallet12.account().accountId;
                MAX_GAS = new _bn["default"]('300000000000000');
                ZERO = new _bn["default"]('0');

                if (!(!account || !accountId)) {
                  _context14.next = 6;
                  break;
                }

                throw new Error('Account is undefined.');

              case 6:
                if (contractName) {
                  _context14.next = 8;
                  break;
                }

                throw new Error('No contract was provided.');

              case 8:
                contract = new _nearApiJs.Contract(account, contractName, {
                  viewMethods: _constants.STORE_CONTRACT_VIEW_METHODS,
                  changeMethods: _constants.STORE_CONTRACT_CALL_METHODS
                }); // TODO: Check if minter has a valid object to mint.

                _context14.next = 11;
                return this.minter.getMetadataId();

              case 11:
                metadataId = _context14.sent;
                obj = {
                  owner_id: accountId,
                  meta_id: metadataId,
                  num_to_mint: amount,
                  //numToMint,
                  royalty_f: 1000,
                  royalty: null //data[Field.Royalty],

                }; // @ts-ignore: method does not exist on Contract type

                _context14.next = 15;
                return contract.mint_tokens(obj, MAX_GAS, ZERO);

              case 15:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function mint(_x20, _x21) {
        return _mint.apply(this, arguments);
      }

      return mint;
    }()
  }, {
    key: "setSessionKeyPair",
    value: function () {
      var _setSessionKeyPair = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(accountId, privateKey) {
        var keyStore;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                keyStore = this.keyStore;
                keyStore.setKey(this.networkName, accountId, _nearApiJs.KeyPair.fromString(privateKey));
                return _context15.abrupt("return", keyStore);

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function setSessionKeyPair(_x22, _x23) {
        return _setSessionKeyPair.apply(this, arguments);
      }

      return setSessionKeyPair;
    }()
  }, {
    key: "getSessionKeyPair",
    value: function () {
      var _getSessionKeyPair = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var _this$activeWallet13;

        var accountId, keyStore;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                accountId = (_this$activeWallet13 = this.activeWallet) === null || _this$activeWallet13 === void 0 ? void 0 : _this$activeWallet13.getAccountId();
                keyStore = this.keyStore;

                if (accountId) {
                  _context16.next = 4;
                  break;
                }

                throw new Error('accountId is undefined');

              case 4:
                _context16.next = 6;
                return keyStore === null || keyStore === void 0 ? void 0 : keyStore.getKey(this.networkName, accountId);

              case 6:
                return _context16.abrupt("return", _context16.sent);

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function getSessionKeyPair() {
        return _getSessionKeyPair.apply(this, arguments);
      }

      return getSessionKeyPair;
    }()
  }, {
    key: "getKeyStore",
    value: function getKeyStore() {
      if (_browserOrNode.isNode) return new _nearApiJs.keyStores.InMemoryKeyStore();
      if (_browserOrNode.isBrowser) return new _nearApiJs.keyStores.BrowserLocalStorageKeyStore();
      throw new Error('Runtime environment has to be Node or Browser');
    } // private getKeyPairFromLocalstorage() {}

    /**
     * Fetch local storage connections
     */

  }, {
    key: "getLocalAccounts",
    value: function getLocalAccounts() {
      var regex = /near-api-js:keystore:/gm;
      var keys = Object.keys(localStorage);
      var matches = keys.filter(function (key) {
        return regex.exec(key) !== null;
      });
      var accounts = {};
      matches.forEach(function (key) {
        var accountId = key.split(':')[2];
        accounts = _objectSpread(_objectSpread({}, accounts), {}, _defineProperty({}, accountId, {
          accountId: accountId,
          contractName: '' // TODO: get contractName connection

        }));
      });
      return accounts;
    }
    /**
     * Fetch transaction result given a transaction hash.
     * @param txHash the transaction's hash
     * @returns the transaction result
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fetchTransactionResult",
    value: function () {
      var _fetchTransactionResult = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(txHash) {
        var _this$activeNearConne2, _this$activeWallet14;

        var connection, accountId, decodeHash, txResult;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                connection = (_this$activeNearConne2 = this.activeNearConnection) === null || _this$activeNearConne2 === void 0 ? void 0 : _this$activeNearConne2.connection;

                if (connection) {
                  _context17.next = 3;
                  break;
                }

                throw new Error('Near connection is undefined.');

              case 3:
                accountId = (_this$activeWallet14 = this.activeWallet) === null || _this$activeWallet14 === void 0 ? void 0 : _this$activeWallet14.account().accountId;

                if (accountId) {
                  _context17.next = 6;
                  break;
                }

                throw new Error('Account Id is undefined.');

              case 6:
                decodeHash = _nearApiJs.utils.serialize.base_decode(txHash);
                _context17.next = 9;
                return connection.provider.txStatus(decodeHash, accountId);

              case 9:
                txResult = _context17.sent;
                return _context17.abrupt("return", txResult);

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function fetchTransactionResult(_x24) {
        return _fetchTransactionResult.apply(this, arguments);
      }

      return fetchTransactionResult;
    }()
  }, {
    key: "getNearConfig",
    value:
    /**
     * Get NEAR configuration object. Defaults to testnet.
     * @param networkName
     * @param contractAddress
     */
    function getNearConfig(networkName, contractAddress) {
      switch (networkName) {
        case _types.Network.testnet:
          return {
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            contractName: contractAddress || _constants.STORE_FACTORY_CONTRACT_NAME,
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org'
          };

        case _types.Network.main:
          return {
            networkId: 'mainnet',
            nodeUrl: 'https://rpc.mainnet.near.org',
            contractName: contractAddress || _constants.STORE_FACTORY_CONTRACT_NAME,
            walletUrl: 'https://wallet.mainnet.near.org',
            helperUrl: 'https://helper.mainnet.near.org'
          };

        default:
          return {
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            contractName: contractAddress || _constants.STORE_FACTORY_CONTRACT_NAME,
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org'
          };
      }
    }
  }]);

  return Wallet;
}();

exports.Wallet = Wallet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93YWxsZXQudHMiXSwibmFtZXMiOlsiV2FsbGV0IiwiYXBpQ29uZmlnIiwiTmV0d29yayIsInRlc3RuZXQiLCJDaGFpbiIsIm5lYXIiLCJoZWFkZXJzIiwiYm9keSIsIm1ldGhvZCIsImZldGNoIiwibmVhckNvbmZpZyIsIm5vZGVVcmwiLCJKU09OIiwic3RyaW5naWZ5IiwianNvbnJwYyIsImlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwicmVxdWVzdCIsImpzb24iLCJkYXRhIiwicmVzdWx0IiwiYWNjb3VudElkIiwicHVibGljS2V5IiwicnBjQ2FsbCIsInBhcmFtcyIsInJlcXVlc3RfdHlwZSIsImZpbmFsaXR5IiwiYWNjb3VudF9pZCIsInB1YmxpY19rZXkiLCJ0cmFuc2FjdGlvbkhhc2giLCJhcGkiLCJBUEkiLCJuZXR3b3JrTmFtZSIsImNoYWluIiwiZ2V0TmVhckNvbmZpZyIsImtleVN0b3JlIiwiZ2V0S2V5U3RvcmUiLCJtaW50ZXIiLCJNaW50ZXIiLCJhcGlLZXkiLCJwcm9wcyIsImNvbnRyYWN0QWRkcmVzcyIsIlNUT1JFX0ZBQ1RPUllfQ09OVFJBQ1RfTkFNRSIsImlzQnJvd3NlciIsIl9jb25uZWN0aW9uT2JqZWN0IiwiZGVwcyIsIk5lYXIiLCJhY3RpdmVOZWFyQ29ubmVjdGlvbiIsImFjdGl2ZVdhbGxldCIsIldhbGxldEFjY291bnQiLCJERUZBVUxUX0FQUF9OQU1FIiwiaXNTaWduZWRJbiIsImdldEFjY291bnRJZCIsImFjY291bnQiLCJhY3RpdmVBY2NvdW50IiwicmVxdWVzdFNpZ25JbiIsImlzTm9kZSIsInByaXZhdGVLZXkiLCJFcnJvciIsInNldFNlc3Npb25LZXlQYWlyIiwic2lnbk91dCIsInVuZGVmaW5lZCIsImxvY2FsQWNjb3VudHMiLCJnZXRMb2NhbEFjY291bnRzIiwiX2dldEZ1bGxBY2Nlc3NQdWJsaWNLZXkiLCJ2aWV3QWNjZXNzS2V5TGlzdCIsImtleXNSZXF1ZXN0IiwiZnVsbEFjY2Vzc0tleXMiLCJrZXlzIiwiZmlsdGVyIiwiYWNjIiwiYWNjZXNzX2tleSIsInBlcm1pc3Npb24iLCJoaWdoZXN0Tm9uY2VLZXkiLCJyZWR1Y2UiLCJjdXJyIiwibm9uY2UiLCJsb2NhbFN0b3JhZ2VLZXkiLCJORUFSX0xPQ0FMX1NUT1JBR0VfS0VZX1NVRkZJWCIsImZ1bGxBY2Nlc3NLZXkiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYWxsS2V5cyIsImNvbm5lY3QiLCJnZXRTZXNzaW9uS2V5UGFpciIsImtleVBhaXIiLCJnZXRQdWJsaWNLZXkiLCJnZXRBY2NvdW50QmFsYW5jZSIsImJhbGFuY2UiLCJ2aWV3QWNjZXNzS2V5IiwiYWNjZXNzS2V5IiwiYWxsb3dhbmNlIiwidXRpbHMiLCJmb3JtYXQiLCJmb3JtYXROZWFyQW1vdW50IiwiRnVuY3Rpb25DYWxsIiwiY29udHJhY3ROYW1lIiwiY29uZmlnIiwidG90YWwiLCJ0b2tlbklkcyIsIk1BWF9HQVMiLCJCTiIsIlpFUk8iLCJjb250cmFjdCIsIkNvbnRyYWN0Iiwidmlld01ldGhvZHMiLCJTVE9SRV9DT05UUkFDVF9WSUVXX01FVEhPRFMiLCJjaGFuZ2VNZXRob2RzIiwiU1RPUkVfQ09OVFJBQ1RfQ0FMTF9NRVRIT0RTIiwiYmF0Y2hfdHJhbnNmZXIiLCJ0b2tlbl9pZHMiLCJ0b2tlbklkIiwic3RvcmVJZCIsInByaWNlIiwic3BsaXRPd25lcnMiLCJHQVMiLCJiYWwiLCJjb25zb2xlIiwibG9nIiwiZmV0Y2hUb2tlbiIsInRva2VuIiwiaXNPd25lciIsIm93bmVySWQiLCJsaXN0X3Rva2VucyIsImNvbnRyYWN0X2FkZHJlc3MiLCJOdW1iZXIiLCJhdXRvdHJhbnNmZXIiLCJhc2tpbmdfcHJpY2UiLCJzcGxpdF9vd25lcnMiLCJncm91cElkIiwiZmV0Y2hMaXN0cyIsImxpc3QiLCJsZW5ndGgiLCJNQVJLRVRfQUNDT1VOVCIsIm1ha2Vfb2ZmZXIiLCJ0b2tlbl9rZXkiLCJ0b2tlbktleSIsInRpbWVvdXQiLCJIb3VycyIsInN5bWJvbCIsImdhcyIsInN0b3JlRGF0YSIsInN0b3JlX2Rlc2NyaXB0aW9uIiwic3RvcmVfaWQiLCJvd25lcl9pZCIsImljb25fYmFzZTY0IiwiYmFzZV91cmkiLCJCQVNFX0FSV0VBVkVfVVJJIiwibWFya2V0cGxhY2VfaWQiLCJjcmVhdGVfc3RvcmUiLCJhbW91bnQiLCJnZXRNZXRhZGF0YUlkIiwibWV0YWRhdGFJZCIsIm9iaiIsIm1ldGFfaWQiLCJudW1fdG9fbWludCIsInJveWFsdHlfZiIsInJveWFsdHkiLCJtaW50X3Rva2VucyIsInNldEtleSIsIktleVBhaXIiLCJmcm9tU3RyaW5nIiwiZ2V0S2V5Iiwia2V5U3RvcmVzIiwiSW5NZW1vcnlLZXlTdG9yZSIsIkJyb3dzZXJMb2NhbFN0b3JhZ2VLZXlTdG9yZSIsInJlZ2V4IiwiT2JqZWN0IiwibWF0Y2hlcyIsImtleSIsImV4ZWMiLCJhY2NvdW50cyIsImZvckVhY2giLCJzcGxpdCIsInR4SGFzaCIsImNvbm5lY3Rpb24iLCJkZWNvZGVIYXNoIiwic2VyaWFsaXplIiwiYmFzZV9kZWNvZGUiLCJwcm92aWRlciIsInR4U3RhdHVzIiwidHhSZXN1bHQiLCJuZXR3b3JrSWQiLCJ3YWxsZXRVcmwiLCJoZWxwZXJVcmwiLCJtYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBVUE7O0FBR0E7O0FBQ0E7O0FBUUE7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7SUFDYUEsTTtBQWVYO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGtCQUFZQyxTQUFaLEVBQTBDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEseUNBZGJDLGVBQVFDLE9BY0s7O0FBQUEsbUNBYm5CQyxhQUFNQyxJQWFhOztBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUEsMEVBc2N4QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0NBQ2hCQyxPQURnQixFQUNoQkEsT0FEZ0IsNkJB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Q0xzTCxZQUFBQSxTQUFTLEVBQUUsU0FETjtBQUVMOUssWUFBQUEsT0FBTyxFQUFFLDhCQUZKO0FBR0x3RixZQUFBQSxZQUFZLEVBQUV2RCxlQUFlLElBQUlDLHNDQUg1QjtBQUlMNkksWUFBQUEsU0FBUyxFQUFFLGlDQUpOO0FBS0xDLFlBQUFBLFNBQVMsRUFBRTtBQUxOLFdBQVA7O0FBUUYsYUFBS3pMLGVBQVEwTCxJQUFiO0FBQ0UsaUJBQU87QUFDTEgsWUFBQUEsU0FBUyxFQUFFLFNBRE47QUFFTDlLLFlBQUFBLE9BQU8sRUFBRSw4QkFGSjtBQUdMd0YsWUFBQUEsWUFBWSxFQUFFdkQsZUFBZSxJQUFJQyxzQ0FINUI7QUFJTDZJLFlBQUFBLFNBQVMsRUFBRSxpQ0FKTjtBQUtMQyxZQUFBQSxTQUFTLEVBQUU7QUFMTixXQUFQOztBQU9GO0FBQ0UsaUJBQU87QUFDTEYsWUFBQUEsU0FBUyxFQUFFLFNBRE47QUFFTDlLLFlBQUFBLE9BQU8sRUFBRSw4QkFGSjtBQUdMd0YsWUFBQUEsWUFBWSxFQUFFdkQsZUFBZSxJQUFJQyxzQ0FINUI7QUFJTDZJLFlBQUFBLFNBQVMsRUFBRSxpQ0FKTjtBQUtMQyxZQUFBQSxTQUFTLEVBQUU7QUFMTixXQUFQO0FBbkJKO0FBMkJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdpc29tb3JwaGljLXVuZmV0Y2gnXG5pbXBvcnQgeyBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ2Jyb3dzZXItb3Itbm9kZSdcbmltcG9ydCB7XG4gIGtleVN0b3JlcyxcbiAgV2FsbGV0QWNjb3VudCxcbiAgS2V5UGFpcixcbiAgTmVhcixcbiAgQWNjb3VudCxcbiAgdXRpbHMsXG4gIFdhbGxldENvbm5lY3Rpb24sXG4gIENvbnRyYWN0LFxufSBmcm9tICduZWFyLWFwaS1qcydcbmltcG9ydCBCTiBmcm9tICdibi5qcydcbmltcG9ydCB7IEtleVN0b3JlIH0gZnJvbSAnbmVhci1hcGktanMvbGliL2tleV9zdG9yZXMnXG5cbmltcG9ydCB7IEFQSSB9IGZyb20gJy4vYXBpJ1xuaW1wb3J0IHtcbiAgQ2hhaW4sXG4gIE1pbnRiYXNlQVBJQ29uZmlnLFxuICBXYWxsZXRMb2dpblByb3BzLFxuICBOZXR3b3JrLFxuICBUb2tlbixcbn0gZnJvbSAnLi90eXBlcydcblxuaW1wb3J0IHtcbiAgU1RPUkVfRkFDVE9SWV9DT05UUkFDVF9OQU1FLFxuICBERUZBVUxUX0FQUF9OQU1FLFxuICBORUFSX0xPQ0FMX1NUT1JBR0VfS0VZX1NVRkZJWCxcbiAgQkFTRV9BUldFQVZFX1VSSSxcbiAgTUFSS0VUX0FDQ09VTlQsXG4gIFNUT1JFX0NPTlRSQUNUX1ZJRVdfTUVUSE9EUyxcbiAgU1RPUkVfQ09OVFJBQ1RfQ0FMTF9NRVRIT0RTLFxufSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IE1pbnRlciB9IGZyb20gJy4vbWludGVyJ1xuXG4vKipcbiAqIE1pbnRiYXNlIFdhbGxldC5cbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHVzZXJzIHRvIHNpZ24gYW5kIGludGVyYWN0IHdpdGggTkVBUiBhbmQgTWludGJhc2UgaW5mcmFzdHJ1Y3R1cmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBXYWxsZXQge1xuICBwdWJsaWMgYXBpOiBBUElcblxuICBwdWJsaWMgYWN0aXZlV2FsbGV0PzogV2FsbGV0Q29ubmVjdGlvblxuICBwdWJsaWMgYWN0aXZlTmVhckNvbm5lY3Rpb24/OiBOZWFyXG4gIHB1YmxpYyBhY3RpdmVBY2NvdW50PzogQWNjb3VudFxuXG4gIHB1YmxpYyBuZXR3b3JrTmFtZTogc3RyaW5nID0gTmV0d29yay50ZXN0bmV0XG4gIHB1YmxpYyBjaGFpbjogc3RyaW5nID0gQ2hhaW4ubmVhclxuXG4gIHB1YmxpYyBrZXlTdG9yZTogS2V5U3RvcmVcblxuICBwdWJsaWMgbmVhckNvbmZpZzogYW55XG4gIHB1YmxpYyBtaW50ZXI6IE1pbnRlclxuXG4gIC8qKlxuICAgKiBNaW50YmFzZSB3YWxsZXQgY29uc3RydWN0b3IuXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYSBNaW50YmFzZSB3YWxsZXQuXG4gICAqIEBwYXJhbSBhcGlDb25maWcgYXBpIGNvbmZ1Z3VyYXRpb24gb3B0aW9ucy5cbiAgICogQHJldHVybnMgdGhlIHdhbGxldCBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYXBpQ29uZmlnOiBNaW50YmFzZUFQSUNvbmZpZykge1xuICAgIHRoaXMuYXBpID0gbmV3IEFQSShhcGlDb25maWcpXG5cbiAgICB0aGlzLm5ldHdvcmtOYW1lID0gYXBpQ29uZmlnLm5ldHdvcmtOYW1lIHx8IE5ldHdvcmsudGVzdG5ldFxuICAgIHRoaXMuY2hhaW4gPSBhcGlDb25maWcuY2hhaW4gfHwgQ2hhaW4ubmVhclxuXG4gICAgdGhpcy5uZWFyQ29uZmlnID0gdGhpcy5nZXROZWFyQ29uZmlnKHRoaXMubmV0d29ya05hbWUpXG4gICAgdGhpcy5rZXlTdG9yZSA9IHRoaXMuZ2V0S2V5U3RvcmUoKVxuXG4gICAgdGhpcy5taW50ZXIgPSBuZXcgTWludGVyKHsgYXBpS2V5OiBhcGlDb25maWcuYXBpS2V5IH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb25uZWN0aW9uIHRvIGEgTkVBUiBzbWFydCBjb250cmFjdFxuICAgKiBAcGFyYW0gcHJvcHMgd2FsbGV0IGNvbm5lY3Rpb24gcHJvcGVydGllcyAtIHRoZSBjb25maWcgdG8gY3JlYXRlIGEgY29ubmVjdGlvbiB3aXRoXG4gICAqXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY29ubmVjdChwcm9wczogV2FsbGV0TG9naW5Qcm9wcyA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29udHJhY3RBZGRyZXNzID0gcHJvcHMuY29udHJhY3RBZGRyZXNzIHx8IFNUT1JFX0ZBQ1RPUllfQ09OVFJBQ1RfTkFNRVxuXG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgX2Nvbm5lY3Rpb25PYmplY3QgPSB7XG4gICAgICAgIGRlcHM6IHsga2V5U3RvcmU6IHRoaXMuZ2V0S2V5U3RvcmUoKSB9LFxuICAgICAgICAuLi50aGlzLmdldE5lYXJDb25maWcodGhpcy5uZXR3b3JrTmFtZSwgY29udHJhY3RBZGRyZXNzKSxcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmVhciA9IG5ldyBOZWFyKF9jb25uZWN0aW9uT2JqZWN0KVxuICAgICAgdGhpcy5hY3RpdmVOZWFyQ29ubmVjdGlvbiA9IG5lYXJcbiAgICAgIHRoaXMuYWN0aXZlV2FsbGV0ID0gbmV3IFdhbGxldEFjY291bnQobmVhciwgREVGQVVMVF9BUFBfTkFNRSlcblxuICAgICAgaWYgKHRoaXMuYWN0aXZlV2FsbGV0LmlzU2lnbmVkSW4oKSkge1xuICAgICAgICBjb25zdCBhY2NvdW50SWQgPSB0aGlzLmFjdGl2ZVdhbGxldC5nZXRBY2NvdW50SWQoKVxuXG4gICAgICAgIHRoaXMuYWN0aXZlQWNjb3VudCA9IGF3YWl0IHRoaXMuYWN0aXZlTmVhckNvbm5lY3Rpb24uYWNjb3VudChhY2NvdW50SWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGl2ZVdhbGxldC5yZXF1ZXN0U2lnbkluKGNvbnRyYWN0QWRkcmVzcywgREVGQVVMVF9BUFBfTkFNRSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzTm9kZSkge1xuICAgICAgY29uc3QgcHJpdmF0ZUtleSA9IHByb3BzLnByaXZhdGVLZXlcblxuICAgICAgaWYgKCFwcml2YXRlS2V5KSB0aHJvdyBuZXcgRXJyb3IoJ1ByaXZhdGUga2V5IGlzIG5vdCBkZWZpbmVkLicpXG5cbiAgICAgIHRoaXMuc2V0U2Vzc2lvbktleVBhaXIoU1RPUkVfRkFDVE9SWV9DT05UUkFDVF9OQU1FLCBwcml2YXRlS2V5KVxuXG4gICAgICBjb25zdCBfY29ubmVjdGlvbk9iamVjdCA9IHtcbiAgICAgICAgZGVwczogeyBrZXlTdG9yZTogdGhpcy5nZXRLZXlTdG9yZSgpIH0sXG4gICAgICAgIC4uLnRoaXMuZ2V0TmVhckNvbmZpZyh0aGlzLm5ldHdvcmtOYW1lLCBjb250cmFjdEFkZHJlc3MpLFxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZWFyID0gbmV3IE5lYXIoX2Nvbm5lY3Rpb25PYmplY3QpXG5cbiAgICAgIHRoaXMuYWN0aXZlTmVhckNvbm5lY3Rpb24gPSBuZWFyXG4gICAgICB0aGlzLmFjdGl2ZVdhbGxldCA9IG5ldyBXYWxsZXRBY2NvdW50KG5lYXIsIERFRkFVTFRfQVBQX05BTUUpXG5cbiAgICAgIGNvbnN0IGFjY291bnRJZCA9IHRoaXMuYWN0aXZlV2FsbGV0LmdldEFjY291bnRJZCgpXG4gICAgICB0aGlzLmFjdGl2ZUFjY291bnQgPSBhd2FpdCB0aGlzLmFjdGl2ZU5lYXJDb25uZWN0aW9uLmFjY291bnQoYWNjb3VudElkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgQnJvd3NlciBvciBOb2RlIGVudmlyb25tZW50IHN1cHBvcnRlZC4nKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB1c2VyLiBSZW1vdmVzIHRoZSBMb2NhbFN0b3JhZ2UgZW50cnkgdGhhdFxuICAgKiByZXByZXNlbnRzIGFuIGF1dGhvcml6ZWQgd2FsbGV0IGFjY291bnQgYnV0IGxlYXZlcyBwcml2YXRlIGtleXMgaW50YWN0LlxuICAgKi9cbiAgcHVibGljIGRpc2Nvbm5lY3QoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVXYWxsZXQ/LnNpZ25PdXQoKVxuICAgIHRoaXMuYWN0aXZlTmVhckNvbm5lY3Rpb24gPSB1bmRlZmluZWRcbiAgICB0aGlzLmFjdGl2ZUFjY291bnQgPSB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byBhIHdhbGxldCBzdG9yZWQgb24gbG9jYWwgc3RvcmFnZS5cbiAgICogQHBhcmFtIGFjY291bnRJZCB0aGUgYWNjb3VudCBpZGVudGlmaWVyIHRvIGNvbm5lY3QuXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgY29ubmVjdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY29ubmVjdFRvKGFjY291bnRJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgLy8gZ2V0IGxvY2Fsc3RvcmFnZSBhY2NvdW50c1xuICAgIGNvbnN0IGxvY2FsQWNjb3VudHMgPSB0aGlzLmdldExvY2FsQWNjb3VudHMoKVxuXG4gICAgLy8gZG9lcyBhY2NvdW50IHVzZXIgaXMgdHJ5aW5nIHRvIGNvbm5lY3QgZXhpc3RzIGluIHN0b3JhZ2U/XG4gICAgaWYgKCFsb2NhbEFjY291bnRzW2FjY291bnRJZF0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGdldCBhIGZ1bGwgYWNjZXNzIHB1YmxpYyBrZXkgd2l0aCB0aGUgbGFyZ2VzdCBub25jZVxuICAgIGNvbnN0IF9nZXRGdWxsQWNjZXNzUHVibGljS2V5ID0gYXN5bmMgKGFjY291bnRJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBrZXlzUmVxdWVzdCA9IGF3YWl0IHRoaXMudmlld0FjY2Vzc0tleUxpc3QoYWNjb3VudElkKVxuXG4gICAgICAvLyBmaWx0ZXIgYnkgZnVsbCBhY2Nlc3Mga2V5c1xuICAgICAgY29uc3QgZnVsbEFjY2Vzc0tleXMgPSBrZXlzUmVxdWVzdC5rZXlzLmZpbHRlcihcbiAgICAgICAgKGFjYzogeyBhY2Nlc3Nfa2V5OiB7IHBlcm1pc3Npb246IHN0cmluZyB9IH0pID0+XG4gICAgICAgICAgYWNjLmFjY2Vzc19rZXkucGVybWlzc2lvbiA9PT0gJ0Z1bGxBY2Nlc3MnXG4gICAgICApXG5cbiAgICAgIC8vIGdldCB0aGUgaGlnaGVzdCBub25jZSBrZXlcbiAgICAgIGNvbnN0IGhpZ2hlc3ROb25jZUtleSA9IGZ1bGxBY2Nlc3NLZXlzLnJlZHVjZShcbiAgICAgICAgKFxuICAgICAgICAgIGFjYzogeyBhY2Nlc3Nfa2V5OiB7IG5vbmNlOiBudW1iZXIgfSB9LFxuICAgICAgICAgIGN1cnI6IHsgYWNjZXNzX2tleTogeyBub25jZTogbnVtYmVyIH0gfVxuICAgICAgICApID0+IChhY2M/LmFjY2Vzc19rZXk/Lm5vbmNlID4gY3Vycj8uYWNjZXNzX2tleT8ubm9uY2UgPyBhY2MgOiBjdXJyKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaGlnaGVzdE5vbmNlS2V5XG4gICAgfVxuXG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgbG9jYWxTdG9yYWdlS2V5ID0gYCR7REVGQVVMVF9BUFBfTkFNRX0ke05FQVJfTE9DQUxfU1RPUkFHRV9LRVlfU1VGRklYfWBcbiAgICAgIGNvbnN0IGZ1bGxBY2Nlc3NLZXkgPSBhd2FpdCBfZ2V0RnVsbEFjY2Vzc1B1YmxpY0tleShhY2NvdW50SWQpXG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICBsb2NhbFN0b3JhZ2VLZXksXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBhY2NvdW50SWQ6IGFjY291bnRJZCxcbiAgICAgICAgICBhbGxLZXlzOiBbZnVsbEFjY2Vzc0tleS5wdWJsaWNfa2V5XSxcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgdGhpcy5jb25uZWN0KClcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gVE9ETzogSW1wbGVtZW50IGZvciBOb2RlIGVudmlyb25tZW50XG4gICAgLy8gaWYoaXNOb2RlKSB7fVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBjb25uZWN0ZWQgYWNjb3VudCBkZXRhaWxzLlxuICAgKiBAcmV0dXJucyBkZXRhaWxzIG9mIHRoZSBjdXJyZW50IGNvbm5lY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGV0YWlscygpOiBQcm9taXNlPHtcbiAgICBhY2NvdW50SWQ6IHN0cmluZ1xuICAgIGJhbGFuY2U6IHN0cmluZ1xuICAgIGFsbG93YW5jZTogc3RyaW5nXG4gICAgY29udHJhY3ROYW1lOiBzdHJpbmdcbiAgfT4ge1xuICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmFjdGl2ZVdhbGxldD8uYWNjb3VudCgpXG4gICAgY29uc3QgYWNjb3VudElkID0gYWNjb3VudD8uYWNjb3VudElkXG4gICAgY29uc3Qga2V5UGFpciA9IGF3YWl0IHRoaXMuZ2V0U2Vzc2lvbktleVBhaXIoKVxuXG4gICAgaWYgKCFhY2NvdW50IHx8ICFhY2NvdW50SWQpIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyB1bmRlZmluZWQuJylcblxuICAgIGlmICgha2V5UGFpciB8fCAhYWNjb3VudElkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBLZXkgUGFpciBmb3IgYWNjb3VudCAke2FjY291bnRJZH1gKVxuXG4gICAgY29uc3QgcHVibGljS2V5ID0ga2V5UGFpci5nZXRQdWJsaWNLZXkoKS50b1N0cmluZygpXG4gICAgY29uc3QgYmFsYW5jZSA9IGF3YWl0IGFjY291bnQuZ2V0QWNjb3VudEJhbGFuY2UoKVxuXG4gICAgaWYgKCFiYWxhbmNlKSB0aHJvdyBuZXcgRXJyb3IoYGApXG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSBhd2FpdCB0aGlzLnZpZXdBY2Nlc3NLZXkoYWNjb3VudElkLCBwdWJsaWNLZXkpXG5cbiAgICBjb25zdCBhbGxvd2FuY2UgPSB1dGlscy5mb3JtYXQuZm9ybWF0TmVhckFtb3VudChcbiAgICAgIGFjY2Vzc0tleS5wZXJtaXNzaW9uLkZ1bmN0aW9uQ2FsbC5hbGxvd2FuY2VcbiAgICApXG5cbiAgICBjb25zdCBjb250cmFjdE5hbWUgPSB0aGlzLmFjdGl2ZU5lYXJDb25uZWN0aW9uPy5jb25maWcuY29udHJhY3ROYW1lXG5cbiAgICByZXR1cm4ge1xuICAgICAgYWNjb3VudElkOiBhY2NvdW50SWQsXG4gICAgICBiYWxhbmNlOiB1dGlscy5mb3JtYXQuZm9ybWF0TmVhckFtb3VudChiYWxhbmNlPy50b3RhbCwgMiksXG4gICAgICBhbGxvd2FuY2U6IGFsbG93YW5jZSxcbiAgICAgIGNvbnRyYWN0TmFtZTogY29udHJhY3ROYW1lLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2ZlciBvbmUgb3IgbW9yZSB0b2tlbnMuXG4gICAqIEBwYXJhbSBjb250cmFjdE5hbWUgVGhlIGNvbnRyYWN0IG5hbWUgdG8gdHJhbnNmZXIgdG9rZW5zIGZyb20uXG4gICAqIEBwYXJhbSB0b2tlbklkcyBUaGUgbWFwcGluZyBvZiB0cmFuc2ZlcnMsIGRlZmluZWQgYnk6IFtbYWNjb3VudE5hbWUxLCB0b2tlbklkMV0sIFthY2NvdW50TmFtZTIsIHRva2VuSWQyXV1cbiAgICovXG5cbiAgLy8gVE9ETzogbmVlZCBtb3JlIGNoZWNrcyBvbiB0aGUgdG9rZW5JZHNcbiAgcHVibGljIGFzeW5jIHRyYW5zZmVyKHtcbiAgICBjb250cmFjdE5hbWUsXG4gICAgdG9rZW5JZHMsXG4gIH06IHtcbiAgICBjb250cmFjdE5hbWU6IHN0cmluZ1xuICAgIHRva2VuSWRzOiBbc3RyaW5nLCBudW1iZXJdW11cbiAgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmFjdGl2ZVdhbGxldD8uYWNjb3VudCgpXG4gICAgY29uc3QgYWNjb3VudElkID0gdGhpcy5hY3RpdmVXYWxsZXQ/LmFjY291bnQoKS5hY2NvdW50SWRcbiAgICBjb25zdCBNQVhfR0FTID0gbmV3IEJOKCczMDAwMDAwMDAwMDAwMDAnKVxuICAgIGNvbnN0IFpFUk8gPSBuZXcgQk4oJzAnKVxuXG4gICAgaWYgKCFhY2NvdW50IHx8ICFhY2NvdW50SWQpIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyB1bmRlZmluZWQuJylcblxuICAgIGlmICghY29udHJhY3ROYW1lKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbnRyYWN0IHdhcyBwcm92aWRlZC4nKVxuXG4gICAgY29uc3QgY29udHJhY3QgPSBuZXcgQ29udHJhY3QoYWNjb3VudCwgY29udHJhY3ROYW1lLCB7XG4gICAgICB2aWV3TWV0aG9kczogU1RPUkVfQ09OVFJBQ1RfVklFV19NRVRIT0RTLFxuICAgICAgY2hhbmdlTWV0aG9kczogU1RPUkVfQ09OVFJBQ1RfQ0FMTF9NRVRIT0RTLFxuICAgIH0pXG5cbiAgICAvLyBAdHMtaWdub3JlOiBtZXRob2QgZG9lcyBub3QgZXhpc3Qgb24gQ29udHJhY3QgdHlwZVxuICAgIGF3YWl0IGNvbnRyYWN0LmJhdGNoX3RyYW5zZmVyKHsgdG9rZW5faWRzOiB0b2tlbklkcyB9LCBNQVhfR0FTLCBaRVJPKVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgYW4gaXRlbSBmb3Igc2FsZSBpbiB0aGUgbWFya2V0LlxuICAgKiBAcGFyYW0gdG9rZW5JZCBUaGUgdG9rZW4gaWQuXG4gICAqIEBwYXJhbSBzdG9yZUlkIFRoZSB0b2tlbiBzdG9yZSBpZCAoY29udHJhY3QgbmFtZSkuXG4gICAqIEBwYXJhbSBwcmljZSBUaGUgbGlzdGluZyBwcmljZS5cbiAgICogQHBhcmFtIHNwbGl0T3duZXJzIExpc3Qgb2Ygc3BsaXRzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxpc3RGb3JTYWxlKFxuICAgIHRva2VuSWQ6IG51bWJlciAvKnwgc3RyaW5nW10qLyxcbiAgICBzdG9yZUlkOiBzdHJpbmcsXG4gICAgcHJpY2U6IHN0cmluZyxcbiAgICBzcGxpdE93bmVyczogeyBhY2NvdW50SWQ6IHN0cmluZzsgc3BsaXQ6IG51bWJlciB9W11cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYWNjb3VudCA9IHRoaXMuYWN0aXZlV2FsbGV0Py5hY2NvdW50KClcbiAgICBjb25zdCBhY2NvdW50SWQgPSB0aGlzLmFjdGl2ZVdhbGxldD8uYWNjb3VudCgpLmFjY291bnRJZFxuICAgIGNvbnN0IEdBUyA9IG5ldyBCTignMzAwMDAwMDAwMDAwMDAwJylcbiAgICBjb25zdCBiYWwgPSAnMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJ1xuXG4gICAgaWYgKCFhY2NvdW50IHx8ICFhY2NvdW50SWQpIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyB1bmRlZmluZWQuJylcblxuICAgIC8vIFRPRE86IENoZWNrIGlmIGFjY291bnQgb3ducyB0aGUgdG9rZW5zIHRoYXQgYXJlIHRyeWluZyB0byBzZWxsXG5cbiAgICBjb25zb2xlLmxvZyhzcGxpdE93bmVycylcblxuICAgIGNvbnN0IHRva2VuOiBUb2tlbiA9IGF3YWl0IHRoaXMuYXBpLmZldGNoVG9rZW4oXG4gICAgICB0b2tlbklkLFxuICAgICAgYCR7dG9rZW5JZH06JHtzdG9yZUlkfWBcbiAgICApXG5cbiAgICBjb25zdCBpc093bmVyID0gdG9rZW4ub3duZXJJZCA9PT0gYWNjb3VudElkXG4gICAgaWYgKCFpc093bmVyKSB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgZG9lcyBub3Qgb3duIHRva2VuLicpXG5cbiAgICBjb25zdCBjb250cmFjdCA9IG5ldyBDb250cmFjdChhY2NvdW50LCB0b2tlbi5zdG9yZUlkLCB7XG4gICAgICB2aWV3TWV0aG9kczogU1RPUkVfQ09OVFJBQ1RfVklFV19NRVRIT0RTLFxuICAgICAgY2hhbmdlTWV0aG9kczogU1RPUkVfQ09OVFJBQ1RfQ0FMTF9NRVRIT0RTLFxuICAgIH0pXG5cbiAgICAvLyBUT0RPOiBDaGVja3Mgb24gc3BsaXRfb3duZXJzXG5cbiAgICAvLyBAdHMtaWdub3JlOiBtZXRob2QgZG9lcyBub3QgZXhpc3Qgb24gQ29udHJhY3QgdHlwZVxuICAgIGF3YWl0IGNvbnRyYWN0Lmxpc3RfdG9rZW5zKFxuICAgICAge1xuICAgICAgICBjb250cmFjdF9hZGRyZXNzOiBudWxsLFxuICAgICAgICB0b2tlbl9pZHM6IFtOdW1iZXIodG9rZW4udG9rZW5JZCldLFxuICAgICAgICBhdXRvdHJhbnNmZXI6IHRydWUsXG4gICAgICAgIGFza2luZ19wcmljZTogcHJpY2UsXG4gICAgICAgIHNwbGl0X293bmVyczogbnVsbCwgLy97IFthY2NvdW50SWRdOiAxMDAwMCB9LFxuICAgICAgfSxcbiAgICAgIEdBUyxcbiAgICAgIGJhbFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBvZmZlciB0byBhIGxpc3RpbmcgaW4gdGhlIG1hcmtldC5cbiAgICogQHBhcmFtIGdyb3VwSWRcbiAgICogQHBhcmFtIHByaWNlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbWFrZU9mZmVyKGdyb3VwSWQ6IHN0cmluZywgcHJpY2U/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gdGhpcy5hY3RpdmVXYWxsZXQ/LmFjY291bnQoKVxuICAgIGNvbnN0IGFjY291bnRJZCA9IHRoaXMuYWN0aXZlV2FsbGV0Py5hY2NvdW50KCkuYWNjb3VudElkXG4gICAgY29uc3QgR0FTID0gbmV3IEJOKCczMDAwMDAwMDAwMDAwMDAnKVxuXG4gICAgaWYgKCFhY2NvdW50IHx8ICFhY2NvdW50SWQpIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyB1bmRlZmluZWQuJylcblxuICAgIGlmICghZ3JvdXBJZCkgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIGdyb3VwSWQnKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5hcGkuZmV0Y2hMaXN0cyhncm91cElkKVxuXG4gICAgaWYgKHJlc3VsdC5saXN0Lmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKCdMaXN0IGlzIGVtcHR5JylcblxuICAgIC8vIFRPRE86IG1ha2Ugc3VyZSB0byBnZXQgYSBsaXN0IHRoYXQgaXMgYXZhaWxhYmxlXG4gICAgY29uc3QgbGlzdCA9IHJlc3VsdC5saXN0WzBdXG5cbiAgICBjb25zdCBjb250cmFjdCA9IG5ldyBDb250cmFjdChhY2NvdW50LCBNQVJLRVRfQUNDT1VOVCwge1xuICAgICAgdmlld01ldGhvZHM6IFsnZ2V0X3Rva2VuX293bmVyX2lkJywgJ2dldF90b2tlbicsICdnZXRfdG9rZW5fdG9rZW5faWQnXSxcbiAgICAgIGNoYW5nZU1ldGhvZHM6IFsnbWFrZV9vZmZlciddLFxuICAgIH0pXG5cbiAgICAvLyBAdHMtaWdub3JlOiBtZXRob2QgZG9lcyBub3QgZXhpc3Qgb24gQ29udHJhY3QgdHlwZVxuICAgIGF3YWl0IGNvbnRyYWN0Lm1ha2Vfb2ZmZXIoXG4gICAgICB7XG4gICAgICAgIHRva2VuX2tleTogbGlzdC50b2tlbktleSxcbiAgICAgICAgcHJpY2U6IHByaWNlIHx8IGxpc3QucHJpY2UsXG4gICAgICAgIHRpbWVvdXQ6IHsgSG91cnM6IDcyIH0sXG4gICAgICB9LFxuICAgICAgR0FTLFxuICAgICAgbGlzdC5wcmljZVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc3RvcmVcbiAgICogQHBhcmFtIHN0b3JlSWQgU3RvcmUgbmFtZVxuICAgKiBAcGFyYW0gc3ltYm9sIFN0b3JlIHN5bWJvbFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlcGxveVN0b3JlKHN0b3JlSWQ6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhY2NvdW50ID0gdGhpcy5hY3RpdmVXYWxsZXQ/LmFjY291bnQoKVxuICAgIGNvbnN0IGFjY291bnRJZCA9IHRoaXMuYWN0aXZlV2FsbGV0Py5hY2NvdW50KCkuYWNjb3VudElkXG4gICAgY29uc3QgYmFsYW5jZSA9ICc3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJ1xuICAgIGNvbnN0IGdhcyA9IG5ldyBCTignMzAwMDAwMDAwMDAwMDAwJylcblxuICAgIGlmICghYWNjb3VudCB8fCAhYWNjb3VudElkKSB0aHJvdyBuZXcgRXJyb3IoJ0FjY291bnQgaXMgdW5kZWZpbmVkLicpXG5cbiAgICAvLyBUT0RPOiByZWdleCBjaGVjayBpbnB1dHMgKHN0b3JlSWQgYW5kIHN5bWJvbClcblxuICAgIGNvbnN0IGNvbnRyYWN0ID0gbmV3IENvbnRyYWN0KGFjY291bnQsIFNUT1JFX0ZBQ1RPUllfQ09OVFJBQ1RfTkFNRSwge1xuICAgICAgdmlld01ldGhvZHM6IFtcbiAgICAgICAgJ2dldF9taW5fYXR0YWNoZWRfYmFsYW5jZScsXG4gICAgICAgICdnZXRfbnVtYmVyX29mX3Rva2VucycsXG4gICAgICAgICdnZXRfc3RvcmVfZGVzY3JpcHRpb25zJyxcbiAgICAgICAgJ2dldF90b2tlbl9kZXNjcmlwdGlvbicsXG4gICAgICAgICdnZXRfb3duZXInLFxuICAgICAgICAnZ2V0X21pbnRiYXNlX2ZlZScsXG4gICAgICBdLFxuICAgICAgY2hhbmdlTWV0aG9kczogW1xuICAgICAgICAnY3JlYXRlX3N0b3JlJyxcbiAgICAgICAgJ3NldF9taW50YmFzZV9mZWUnLFxuICAgICAgICAndHJhbnNmZXJfb3duZXJzaGlwJyxcbiAgICAgICAgJ25ldycsXG4gICAgICBdLFxuICAgIH0pXG5cbiAgICBjb25zdCBzdG9yZURhdGEgPSB7XG4gICAgICBzdG9yZV9kZXNjcmlwdGlvbjoge1xuICAgICAgICBzdG9yZV9pZDogc3RvcmVJZCxcbiAgICAgICAgb3duZXJfaWQ6IGFjY291bnRJZCxcbiAgICAgICAgc3ltYm9sOiBzeW1ib2wsXG4gICAgICAgIGljb25fYmFzZTY0OiAnZWVpZWllaWVpZScsXG4gICAgICAgIGJhc2VfdXJpOiBCQVNFX0FSV0VBVkVfVVJJLFxuICAgICAgICBtYXJrZXRwbGFjZV9pZDogTUFSS0VUX0FDQ09VTlQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmU6IG1ldGhvZCBkb2VzIG5vdCBleGlzdCBvbiBDb250cmFjdCB0eXBlXG4gICAgYXdhaXQgY29udHJhY3QuY3JlYXRlX3N0b3JlKHN0b3JlRGF0YSwgZ2FzLCBiYWxhbmNlKVxuICB9XG5cbiAgLyoqXG4gICAqIE1pbnQgYSB0b2tlblxuICAgKiBAcGFyYW0gYW1vdW50IFRoZSBudW1iZXIgb2YgdG9rZW5zIHRvIG1pbnQuXG4gICAqIEBwYXJhbSBjb250cmFjdE5hbWUgVGhlIGNvbnRyYWN0IGluIHdoaWNoIHRva2VucyB3aWxsIGJlIG1pbnRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBtaW50KGFtb3VudDogbnVtYmVyLCBjb250cmFjdE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFjY291bnQgPSB0aGlzLmFjdGl2ZVdhbGxldD8uYWNjb3VudCgpXG4gICAgY29uc3QgYWNjb3VudElkID0gdGhpcy5hY3RpdmVXYWxsZXQ/LmFjY291bnQoKS5hY2NvdW50SWRcbiAgICBjb25zdCBNQVhfR0FTID0gbmV3IEJOKCczMDAwMDAwMDAwMDAwMDAnKVxuICAgIGNvbnN0IFpFUk8gPSBuZXcgQk4oJzAnKVxuXG4gICAgaWYgKCFhY2NvdW50IHx8ICFhY2NvdW50SWQpIHRocm93IG5ldyBFcnJvcignQWNjb3VudCBpcyB1bmRlZmluZWQuJylcbiAgICBpZiAoIWNvbnRyYWN0TmFtZSkgdGhyb3cgbmV3IEVycm9yKCdObyBjb250cmFjdCB3YXMgcHJvdmlkZWQuJylcblxuICAgIGNvbnN0IGNvbnRyYWN0ID0gbmV3IENvbnRyYWN0KGFjY291bnQsIGNvbnRyYWN0TmFtZSwge1xuICAgICAgdmlld01ldGhvZHM6IFNUT1JFX0NPTlRSQUNUX1ZJRVdfTUVUSE9EUyxcbiAgICAgIGNoYW5nZU1ldGhvZHM6IFNUT1JFX0NPTlRSQUNUX0NBTExfTUVUSE9EUyxcbiAgICB9KVxuXG4gICAgLy8gVE9ETzogQ2hlY2sgaWYgbWludGVyIGhhcyBhIHZhbGlkIG9iamVjdCB0byBtaW50LlxuXG4gICAgY29uc3QgbWV0YWRhdGFJZCA9IGF3YWl0IHRoaXMubWludGVyLmdldE1ldGFkYXRhSWQoKVxuXG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgb3duZXJfaWQ6IGFjY291bnRJZCxcbiAgICAgIG1ldGFfaWQ6IG1ldGFkYXRhSWQsXG4gICAgICBudW1fdG9fbWludDogYW1vdW50LCAvL251bVRvTWludCxcbiAgICAgIHJveWFsdHlfZjogMTAwMCxcbiAgICAgIHJveWFsdHk6IG51bGwsIC8vZGF0YVtGaWVsZC5Sb3lhbHR5XSxcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlOiBtZXRob2QgZG9lcyBub3QgZXhpc3Qgb24gQ29udHJhY3QgdHlwZVxuICAgIGF3YWl0IGNvbnRyYWN0Lm1pbnRfdG9rZW5zKG9iaiwgTUFYX0dBUywgWkVSTylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRTZXNzaW9uS2V5UGFpcihcbiAgICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgICBwcml2YXRlS2V5OiBzdHJpbmdcbiAgKTogUHJvbWlzZTxLZXlTdG9yZT4ge1xuICAgIGNvbnN0IGtleVN0b3JlID0gdGhpcy5rZXlTdG9yZVxuXG4gICAga2V5U3RvcmUuc2V0S2V5KHRoaXMubmV0d29ya05hbWUsIGFjY291bnRJZCwgS2V5UGFpci5mcm9tU3RyaW5nKHByaXZhdGVLZXkpKVxuXG4gICAgcmV0dXJuIGtleVN0b3JlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0U2Vzc2lvbktleVBhaXIoKTogUHJvbWlzZTxLZXlQYWlyPiB7XG4gICAgY29uc3QgYWNjb3VudElkID0gdGhpcy5hY3RpdmVXYWxsZXQ/LmdldEFjY291bnRJZCgpXG4gICAgY29uc3Qga2V5U3RvcmUgPSB0aGlzLmtleVN0b3JlXG5cbiAgICBpZiAoIWFjY291bnRJZCkgdGhyb3cgbmV3IEVycm9yKCdhY2NvdW50SWQgaXMgdW5kZWZpbmVkJylcblxuICAgIHJldHVybiBhd2FpdCBrZXlTdG9yZT8uZ2V0S2V5KHRoaXMubmV0d29ya05hbWUsIGFjY291bnRJZClcbiAgfVxuXG4gIHByaXZhdGUgZ2V0S2V5U3RvcmUoKSB7XG4gICAgaWYgKGlzTm9kZSkgcmV0dXJuIG5ldyBrZXlTdG9yZXMuSW5NZW1vcnlLZXlTdG9yZSgpXG4gICAgaWYgKGlzQnJvd3NlcikgcmV0dXJuIG5ldyBrZXlTdG9yZXMuQnJvd3NlckxvY2FsU3RvcmFnZUtleVN0b3JlKClcblxuICAgIHRocm93IG5ldyBFcnJvcignUnVudGltZSBlbnZpcm9ubWVudCBoYXMgdG8gYmUgTm9kZSBvciBCcm93c2VyJylcbiAgfVxuXG4gIC8vIHByaXZhdGUgZ2V0S2V5UGFpckZyb21Mb2NhbHN0b3JhZ2UoKSB7fVxuXG4gIC8qKlxuICAgKiBGZXRjaCBsb2NhbCBzdG9yYWdlIGNvbm5lY3Rpb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9jYWxBY2NvdW50cygpOlxuICAgIHwgeyBhY2NvdW50SWQ6IHN0cmluZzsgY29udHJhY3ROYW1lOiBzdHJpbmcgfVtdXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB8IGFueSB7XG4gICAgY29uc3QgcmVnZXggPSAvbmVhci1hcGktanM6a2V5c3RvcmU6L2dtXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSlcblxuICAgIGNvbnN0IG1hdGNoZXMgPSBrZXlzLmZpbHRlcigoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gcmVnZXguZXhlYyhrZXkpICE9PSBudWxsXG4gICAgfSlcblxuICAgIGxldCBhY2NvdW50cyA9IHt9XG4gICAgbWF0Y2hlcy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGFjY291bnRJZCA9IGtleS5zcGxpdCgnOicpWzJdXG5cbiAgICAgIGFjY291bnRzID0ge1xuICAgICAgICAuLi5hY2NvdW50cyxcbiAgICAgICAgW2FjY291bnRJZF06IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IGFjY291bnRJZCxcbiAgICAgICAgICBjb250cmFjdE5hbWU6ICcnLCAvLyBUT0RPOiBnZXQgY29udHJhY3ROYW1lIGNvbm5lY3Rpb25cbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFjY291bnRzXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdHJhbnNhY3Rpb24gcmVzdWx0IGdpdmVuIGEgdHJhbnNhY3Rpb24gaGFzaC5cbiAgICogQHBhcmFtIHR4SGFzaCB0aGUgdHJhbnNhY3Rpb24ncyBoYXNoXG4gICAqIEByZXR1cm5zIHRoZSB0cmFuc2FjdGlvbiByZXN1bHRcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBhc3luYyBmZXRjaFRyYW5zYWN0aW9uUmVzdWx0KHR4SGFzaDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gdGhpcy5hY3RpdmVOZWFyQ29ubmVjdGlvbj8uY29ubmVjdGlvblxuICAgIGlmICghY29ubmVjdGlvbikgdGhyb3cgbmV3IEVycm9yKCdOZWFyIGNvbm5lY3Rpb24gaXMgdW5kZWZpbmVkLicpXG5cbiAgICBjb25zdCBhY2NvdW50SWQgPSB0aGlzLmFjdGl2ZVdhbGxldD8uYWNjb3VudCgpLmFjY291bnRJZFxuICAgIGlmICghYWNjb3VudElkKSB0aHJvdyBuZXcgRXJyb3IoJ0FjY291bnQgSWQgaXMgdW5kZWZpbmVkLicpXG5cbiAgICBjb25zdCBkZWNvZGVIYXNoID0gdXRpbHMuc2VyaWFsaXplLmJhc2VfZGVjb2RlKHR4SGFzaClcblxuICAgIGNvbnN0IHR4UmVzdWx0ID0gYXdhaXQgY29ubmVjdGlvbi5wcm92aWRlci50eFN0YXR1cyhkZWNvZGVIYXNoLCBhY2NvdW50SWQpXG5cbiAgICByZXR1cm4gdHhSZXN1bHRcbiAgfVxuXG4gIHByaXZhdGUgcnBjQ2FsbCA9IGFzeW5jICh7XG4gICAgaGVhZGVycyA9IHt9LFxuICAgIGJvZHkgPSB7fSxcbiAgICBtZXRob2QsXG4gIH06IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGhlYWRlcnM/OiBhbnlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGJvZHk/OiBhbnlcbiAgICBtZXRob2Q6IHN0cmluZ1xuICB9KSA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHRoaXMubmVhckNvbmZpZy5ub2RlVXJsLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgLi4uYm9keSxcbiAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgIGlkOiBgbWludGJhc2UtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDEwKX1gLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIH0pLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgcmV0dXJuIGRhdGE/LnJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGFjY2VzcyBrZXkgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtIGFjY291bnRJZCBhY2NvdW50IGlkXG4gICAqIEBwYXJhbSBwdWJsaWNLZXkgcHVibGljIGtleVxuICAgKiBAcmV0dXJucyBBY2Nlc3MgS2V5IGluZm9ybWF0aW9uXG4gICAqL1xuICBwdWJsaWMgdmlld0FjY2Vzc0tleSA9IGFzeW5jIChcbiAgICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgICBwdWJsaWNLZXk6IHN0cmluZ1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5ycGNDYWxsKHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcmVxdWVzdF90eXBlOiAndmlld19hY2Nlc3Nfa2V5JyxcbiAgICAgICAgICBmaW5hbGl0eTogJ2ZpbmFsJyxcbiAgICAgICAgICBhY2NvdW50X2lkOiBhY2NvdW50SWQsXG4gICAgICAgICAgcHVibGljX2tleTogcHVibGljS2V5LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ3F1ZXJ5JyxcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBsaXN0IG9mIGFjY2VzcyBrZXlzIGZvciBhIGdpdmVuIGFjY291bnRcbiAgICogQHBhcmFtIGFjY291bnRJZCBhY2NvdW50IGlkXG4gICAqIEByZXR1cm5zIExpc3Qgb2YgYWNjZXNzIGtleXNcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyB2aWV3QWNjZXNzS2V5TGlzdCA9IGFzeW5jIChhY2NvdW50SWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5ycGNDYWxsKHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcmVxdWVzdF90eXBlOiAndmlld19hY2Nlc3Nfa2V5X2xpc3QnLFxuICAgICAgICAgIGZpbmFsaXR5OiAnZmluYWwnLFxuICAgICAgICAgIGFjY291bnRfaWQ6IGFjY291bnRJZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdxdWVyeScsXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYSB0cmFuc2FjdGlvbiBzdGF0dXMuXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbkhhc2ggVGhlIHRyYW5zYWN0aW9ucycgaGFzaC5cbiAgICogQHBhcmFtIGFjY291bnRJZCBUaGUgYWNjb3VudCB3aG8gaW5pdGlhdGVkIHRoZSB0cmFuc2F0aW9uLiBUT0RPOiBNaWdodCBub3QgYmUgcmVhbGx5IG5lY2Vzc2FyeSB0byBwYXNzIHRoaXMuXG4gICAqIEByZXR1cm5zIFRoZSB0cmFuc2FjdGlvbiByZXN1bHRcbiAgICovXG4gIHB1YmxpYyB0cmFuc2FjdGlvblN0YXR1cyA9IGFzeW5jIChcbiAgICB0cmFuc2FjdGlvbkhhc2g6IHN0cmluZyxcbiAgICBhY2NvdW50SWQ6IHN0cmluZ1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5ycGNDYWxsKHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFyYW1zOiBbdHJhbnNhY3Rpb25IYXNoLCBhY2NvdW50SWRdLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ3R4JyxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRyYW5zYWN0aW9uIHN0YXR1cyB3aXRoIGFsbCByZWNlaXB0cy5cbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uSGFzaCBUaGUgdHJhbnNhY3Rpb25zJyBoYXNoLlxuICAgKiBAcGFyYW0gYWNjb3VudElkIFRoZSBhY2NvdW50IHdobyBpbml0aWF0ZWQgdGhlIHRyYW5zYXRpb24uIFRPRE86IE1pZ2h0IG5vdCBiZSByZWFsbHkgbmVjZXNzYXJ5IHRvIHBhc3MgdGhpcy5cbiAgICogQHJldHVybnMgVGhlIHRyYW5zYWN0aW9uIHJlc3VsdCB3aXRoIGFsbCByZWNlaXB0cy5cbiAgICovXG4gIHB1YmxpYyB0cmFuc2FjdGlvblN0YXR1c1dpdGhSZWNlaXB0cyA9IGFzeW5jIChcbiAgICB0cmFuc2FjdGlvbkhhc2g6IHN0cmluZyxcbiAgICBhY2NvdW50SWQ6IHN0cmluZ1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5ycGNDYWxsKHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFyYW1zOiBbdHJhbnNhY3Rpb25IYXNoLCBhY2NvdW50SWRdLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ0VYUEVSSU1FTlRBTF90eF9zdGF0dXMnLFxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogR2V0IE5FQVIgY29uZmlndXJhdGlvbiBvYmplY3QuIERlZmF1bHRzIHRvIHRlc3RuZXQuXG4gICAqIEBwYXJhbSBuZXR3b3JrTmFtZVxuICAgKiBAcGFyYW0gY29udHJhY3RBZGRyZXNzXG4gICAqL1xuICBwcml2YXRlIGdldE5lYXJDb25maWcobmV0d29ya05hbWU6IHN0cmluZywgY29udHJhY3RBZGRyZXNzPzogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChuZXR3b3JrTmFtZSkge1xuICAgICAgY2FzZSBOZXR3b3JrLnRlc3RuZXQ6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmV0d29ya0lkOiAndGVzdG5ldCcsXG4gICAgICAgICAgbm9kZVVybDogJ2h0dHBzOi8vcnBjLnRlc3RuZXQubmVhci5vcmcnLFxuICAgICAgICAgIGNvbnRyYWN0TmFtZTogY29udHJhY3RBZGRyZXNzIHx8IFNUT1JFX0ZBQ1RPUllfQ09OVFJBQ1RfTkFNRSxcbiAgICAgICAgICB3YWxsZXRVcmw6ICdodHRwczovL3dhbGxldC50ZXN0bmV0Lm5lYXIub3JnJyxcbiAgICAgICAgICBoZWxwZXJVcmw6ICdodHRwczovL2hlbHBlci50ZXN0bmV0Lm5lYXIub3JnJyxcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIE5ldHdvcmsubWFpbjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuZXR3b3JrSWQ6ICdtYWlubmV0JyxcbiAgICAgICAgICBub2RlVXJsOiAnaHR0cHM6Ly9ycGMubWFpbm5ldC5uZWFyLm9yZycsXG4gICAgICAgICAgY29udHJhY3ROYW1lOiBjb250cmFjdEFkZHJlc3MgfHwgU1RPUkVfRkFDVE9SWV9DT05UUkFDVF9OQU1FLFxuICAgICAgICAgIHdhbGxldFVybDogJ2h0dHBzOi8vd2FsbGV0Lm1haW5uZXQubmVhci5vcmcnLFxuICAgICAgICAgIGhlbHBlclVybDogJ2h0dHBzOi8vaGVscGVyLm1haW5uZXQubmVhci5vcmcnLFxuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5ldHdvcmtJZDogJ3Rlc3RuZXQnLFxuICAgICAgICAgIG5vZGVVcmw6ICdodHRwczovL3JwYy50ZXN0bmV0Lm5lYXIub3JnJyxcbiAgICAgICAgICBjb250cmFjdE5hbWU6IGNvbnRyYWN0QWRkcmVzcyB8fCBTVE9SRV9GQUNUT1JZX0NPTlRSQUNUX05BTUUsXG4gICAgICAgICAgd2FsbGV0VXJsOiAnaHR0cHM6Ly93YWxsZXQudGVzdG5ldC5uZWFyLm9yZycsXG4gICAgICAgICAgaGVscGVyVXJsOiAnaHR0cHM6Ly9oZWxwZXIudGVzdG5ldC5uZWFyLm9yZycsXG4gICAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==