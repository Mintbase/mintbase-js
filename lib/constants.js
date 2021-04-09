"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUD_STORAGE_CONFIG = exports.STORE_CONTRACT_CALL_METHODS = exports.STORE_CONTRACT_VIEW_METHODS = exports.MARKET_ACCOUNT = exports.STORE_FACTORY_CONTRACT_NAME = exports.NEAR_LOCAL_STORAGE_KEY_SUFFIX = exports.DEFAULT_APP_NAME = exports.CLOUD_POST_METADATA_URI = exports.CLOUD_GET_FILE_METADATA_URI = exports.CLOUD_BASE_URI = exports.BASE_ARWEAVE_URI = exports.API_BASE_NEAR_TESTNET = exports.API_BASE_NEAR_MAINNET = exports.API_VERSION = void 0;
exports.API_VERSION = 1;
exports.API_BASE_NEAR_MAINNET = 'https://mintbase.hasura.app/v1/graphql';
exports.API_BASE_NEAR_TESTNET = 'https://mintbase.hasura.app/v1/graphql';
exports.BASE_ARWEAVE_URI = 'https://arweave.net';
exports.CLOUD_BASE_URI = 'https://us-central1-omni-base-1.cloudfunctions.net';
const CLOUD_GET_FILE_METADATA_URI = (fileName) => `${exports.CLOUD_BASE_URI}/arweave/file/${fileName}`;
exports.CLOUD_GET_FILE_METADATA_URI = CLOUD_GET_FILE_METADATA_URI;
const CLOUD_POST_METADATA_URI = () => `${exports.CLOUD_BASE_URI}/arweave/metadata/`;
exports.CLOUD_POST_METADATA_URI = CLOUD_POST_METADATA_URI;
exports.DEFAULT_APP_NAME = 'Mintbase.js';
exports.NEAR_LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key';
// TODO: pull this from somewhere else?
exports.STORE_FACTORY_CONTRACT_NAME = process.env.CONTRACT_NAME || 'mintbase13.testnet';
exports.MARKET_ACCOUNT = `0.${exports.STORE_FACTORY_CONTRACT_NAME}`;
exports.STORE_CONTRACT_VIEW_METHODS = [
    'check_access',
    'get_token_owner',
    'get_name',
    'get_marketplace', //REMOVED
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
    'set_marketplace', //REMOVED
];
exports.CLOUD_STORAGE_CONFIG = {
    apiKey: 'AIzaSyAwZOiBAke2iUnLPp-hf4-uUKbL6lhaY0I',
    // process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: 'omni-base-1.firebaseapp.com',
    databaseURL: 'https://omni-base-1.firebaseio.com',
    projectId: 'omni-base-1',
    storageBucket: 'gs://omni-base-1.appspot.com', //process.env.FIRSTORE_BUCKET_URL,
};
//# sourceMappingURL=constants.js.map