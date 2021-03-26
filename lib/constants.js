"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORE_CONTRACT_CALL_METHODS = exports.STORE_CONTRACT_VIEW_METHODS = exports.MARKET_ACCOUNT = exports.STORE_FACTORY_CONTRACT_NAME = exports.NEAR_LOCAL_STORAGE_KEY_SUFFIX = exports.DEFAULT_APP_NAME = exports.BASE_ARWEAVE_URI = exports.API_BASE_NEAR_TESTNET = exports.API_BASE_NEAR_MAINNET = exports.API_VERSION = void 0;
exports.API_VERSION = 1;
exports.API_BASE_NEAR_MAINNET = 'https://mintbase.hasura.app/v1/graphql';
exports.API_BASE_NEAR_TESTNET = 'https://mintbase.hasura.app/v1/graphql';
exports.BASE_ARWEAVE_URI = 'https://arweave.net';
exports.DEFAULT_APP_NAME = 'Mintbase.js';
exports.NEAR_LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key';
// TODO: pull this from somewhere else?
exports.STORE_FACTORY_CONTRACT_NAME = process.env.CONTRACT_NAME || 'mintbase13.testnet';
exports.MARKET_ACCOUNT = "0." + exports.STORE_FACTORY_CONTRACT_NAME;
exports.STORE_CONTRACT_VIEW_METHODS = [
    'check_access',
    'get_token_owner',
    'get_name',
    'get_marketplace',
];
exports.STORE_CONTRACT_CALL_METHODS = [
    'mint_tokens',
    'grant_access',
    'revoke_access',
    'transfer_from',
    'batch_burn',
    'batch_transfer',
    'grant_minter',
    'renounce_minter',
    'set_icon_base64',
    'transfer',
    'set_base_uri',
    'new',
    'destroy',
    'list_tokens',
    'set_marketplace',
];
//# sourceMappingURL=constants.js.map