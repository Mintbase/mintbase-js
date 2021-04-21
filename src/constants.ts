export const API_VERSION = 1
export const API_BASE_NEAR_MAINNET = 'https://mintbase.hasura.app/v1/graphql'
export const API_BASE_NEAR_TESTNET = 'https://mintbase.hasura.app/v1/graphql'
export const BASE_ARWEAVE_URI = 'https://arweave.net'

export const CLOUD_BASE_URI = process.env.MINTBASEJS_CLOUD_URI
export const CLOUD_GET_FILE_METADATA_URI = (fileName: string): string =>
  `${CLOUD_BASE_URI}/arweave/file/${fileName}`
export const CLOUD_POST_METADATA_URI = (): string =>
  `${CLOUD_BASE_URI}/arweave/metadata/`

export const DEFAULT_APP_NAME = 'Mintbase.js'
export const NEAR_LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key'

// TODO: pull this from somewhere else?
export const STORE_FACTORY_CONTRACT_NAME =
  process.env.CONTRACT_NAME || 'moontbase.testnet'
export const MARKET_ACCOUNT = `0.${STORE_FACTORY_CONTRACT_NAME}`

export const STORE_CONTRACT_VIEW_METHODS = [
  'check_access', // REMOVED ?
  'get_token_owner', // REMOVED
  'get_name', // REMOVED
  'get_marketplace', //REMOVED
]

export const STORE_CONTRACT_CALL_METHODS = [
  'mint_tokens',
  'nft_batch_approve',
  'nft_approve',
  'grant_access', // REMOVED
  'revoke_access', // REMOVED
  'transfer_from', // REMOVED
  'batch_burn',
  'batch_transfer',
  'grant_minter',
  'renounce_minter', // REMOVED
  'set_icon_base64',
  'transfer', // REMOVED
  'set_base_uri',
  'new',
  'destroy', //REMOVED
  'list_tokens', //REMOVED
  'set_marketplace', //REMOVED
]

export const CLOUD_STORAGE_CONFIG = {
  apiKey: process.env.MINTBASEJS_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.MINTBASEJS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.MINTBASEJS_FIREBASE_DATABASE_URL,
  projectId: process.env.MINTBASEJS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.MINTBASEJS_FIRSTORE_BUCKET_URL,
}

export const DEFAULT_ROYALY_PERCENT = 1000
