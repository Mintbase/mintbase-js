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
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
require("isomorphic-unfetch");
const graphql_request_1 = require("graphql-request");
const types_1 = require("./types");
const constants_1 = require("./constants");
const queries_1 = require("./queries");
class API {
    constructor(config) {
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
    fetchMarketplace(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const listings = yield graphql_request_1.request(this.apiBaseUrl, queries_1.FETCH_MARKETPLACE, {
                limit: limit || this.defaultLimit,
                offset: offset || 0,
            });
            const promises = listings.list.map((list) => __awaiter(this, void 0, void 0, function* () {
                const metadata = yield this.fetchArweave(list.token.thingId);
                return Object.assign(Object.assign({}, list), { metadata: metadata });
            }));
            const result = yield Promise.all(promises);
            return result;
        });
    }
    /**
     * Fetches token metadata.
     * @param tokenId the token identifier
     *
     * @returns token metadata
     */
    fetchMetadata(tokenId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                tokenId: `${tokenId}:${storeId}`,
            });
            if (result.token.length === 0)
                throw new Error(`${tokenId} is not a valid token.`);
            const token = result.token[0];
            const metadata = yield this.fetchArweave(token.thingId);
            return metadata;
        });
    }
    /**
     * Fetches lists w/ no metadata.
     * @param limit
     * @param offset
     */
    fetchLists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield graphql_request_1.request(this.apiBaseUrl, queries_1.GET_LATEST_LIST, {
                groupId: id,
            });
            return list;
        });
    }
    fetchThing() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not yet implemented');
        });
    }
    fetchToken(tokenId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                tokenId: `${tokenId}:${storeId}`,
            });
            if (result.token.length === 0)
                throw new Error(`${tokenId} is not a valid token`);
            const token = result.token[0];
            return token;
        });
    }
    fetchArweave(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(`${constants_1.BASE_ARWEAVE_URI}/${id}`);
            const result = yield request.json();
            return result;
        });
    }
    fetchOwnerTokens(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKENS_BY_OWNER_ID, {
                ownerId: accountId,
            });
            return result.token;
        });
    }
    isOwner(tokenId, accountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield graphql_request_1.request(this.apiBaseUrl, queries_1.GET_TOKEN_BY_ID, {
                tokenId: tokenId,
            });
            if (result.token.length === 0)
                return false;
            const token = result.token[0];
            return token.ownerId === accountAddress;
        });
    }
    custom(query, variables) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield graphql_request_1.request(this.apiBaseUrl, query, variables);
            return result;
        });
    }
}
exports.API = API;
//# sourceMappingURL=api.js.map