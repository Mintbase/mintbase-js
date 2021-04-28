import BN from 'bn.js'

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
  process.env.CONTRACT_NAME || 'mintspace.testnet'
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
  'grant_minter',
  'revoke_minter',
  'burn_tokens',
  'nft_revoke_all',
  'create_store',
  'nft_revoke',
  'batch_burn',
  'batch_transfer',
  'set_icon_base64',
  'set_base_uri',
  'new',
]

export const MARKET_CONTRACT_VIEW_METHODS = []

export const MARKET_CONTRACT_CALL_METHODS = [
  'make_offer',
  'accept_and_transfer',
  'withdraw_offer',
]

export const CLOUD_STORAGE_CONFIG = {
  apiKey: process.env.MINTBASEJS_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.MINTBASEJS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.MINTBASEJS_FIREBASE_DATABASE_URL,
  projectId: process.env.MINTBASEJS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.MINTBASEJS_FIRSTORE_BUCKET_URL,
}

export const DEFAULT_ROYALY_PERCENT = 1000

export const MAX_GAS = new BN('300000000000000')
export const ONE_YOCTO = new BN('1')
export const ZERO = new BN('0')
export const LIST_COST = new BN('100000000000000000000000')
export const DEPLOY_STORE_COST = new BN('100000000000000000000000')
