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
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
require("isomorphic-unfetch");
var graphql_request_1 = require("graphql-request");
var types_1 = require("./types");
var constants_1 = require("./constants");
var queries_1 = require("./queries");
var API = /** @class */ (function () {
    function API(config) {
        this.apiBaseUrl = constants_1.API_BASE_NEAR_TESTNET;
        this.defaultLimit = 10;
        this.chainName = types_1.Chain.near;
        this.networkName = types_1.Network.testnet;
        switch (config.chain) {
            case types_1.Chain.near:
                this.apiBaseUrl = config.apiBaseUrl || constants_1.API_BASE_NEAR_TESTNET;
                this.chainName = types_1.Chain.near;
                break;
            default:
                this.apiBaseUrl = config.apiBaseUrl || constants_1.API_BASE_NEAR_TESTNET;
                this.chainName = config.chain;
                break;
        }
    }
    /**
     * Fetches the marketplace and each token's metadata.
     * @param limit
     * @param offset
     */
    API.prototype.fetchMarketplace = function (limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            var listings, promises, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.FETCH_MARKETPLACE, {
                            limit: limit || this.defaultLimit,
                            offset: offset || 0,
                        })];
                    case 1:
                        listings = _a.sent();
                        promises = listings.list.map(function (list) { return __awaiter(_this, void 0, void 0, function () {
                            var metadata;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.fetchArweave(list.token.thingId)];
                                    case 1:
                                        metadata = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, list), { metadata: metadata })];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Fetches token metadata.
     * @param tokenId the token identifier
     *
     * @returns token metadata
     */
    API.prototype.fetchMetadata = function (tokenId, storeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, token, metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                            tokenId: tokenId + ":" + storeId,
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.token.length === 0)
                            throw new Error(tokenId + " is not a valid token.");
                        token = result.token[0];
                        return [4 /*yield*/, this.fetchArweave(token.thingId)];
                    case 2:
                        metadata = _a.sent();
                        return [2 /*return*/, metadata];
                }
            });
        });
    };
    /**
     * Fetches lists w/ no metadata.
     * @param limit
     * @param offset
     */
    API.prototype.fetchLists = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.GET_LATEST_LIST, {
                            groupId: id,
                        })];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list];
                }
            });
        });
    };
    API.prototype.fetchThing = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Not yet implemented');
            });
        });
    };
    API.prototype.fetchToken = function (tokenId, storeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                            tokenId: tokenId + ":" + storeId,
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.token.length === 0)
                            throw new Error(tokenId + " is not a valid token");
                        token = result.token[0];
                        return [2 /*return*/, token];
                }
            });
        });
    };
    API.prototype.fetchArweave = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(constants_1.BASE_ARWEAVE_URI + "/" + id)];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, request.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    API.prototype.fetchOwnerTokens = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKENS_BY_OWNER_ID, {
                            ownerId: accountId,
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.token];
                }
            });
        });
    };
    API.prototype.isOwner = function (tokenId, accountAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                            tokenId: tokenId,
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.token.length === 0)
                            return [2 /*return*/, false];
                        token = result.token[0];
                        return [2 /*return*/, token.ownerId === accountAddress];
                }
            });
        });
    };
    API.prototype.custom = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphql_request_1.request(this.apiBaseUrl, query, variables)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.js.map