export const API_VERSION: number = 1
export const API_BASE_NEAR_MAINNET = 'https://mintbase.hasura.app/v1/graphql'
export const API_BASE_NEAR_TESTNET = 'https://mintbase.hasura.app/v1/graphql'
export const BASE_ARWEAVE_URI = 'https://arweave.net'

export const DEFAULT_APP_NAME = 'Mintbase.js'
export const NEAR_LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key'

// TODO: pull this from somewhere else?
export const STORE_FACTORY_CONTRACT_NAME =
  process.env.CONTRACT_NAME || 'mintbase13.testnet'
export const MARKET_ACCOUNT = `0.${STORE_FACTORY_CONTRACT_NAME}`

export const STORE_CONTRACT_VIEW_METHODS = [
  'check_access',
  'get_token_owner',
  'get_name',
  'get_marketplace',
]
export const STORE_CONTRACT_CALL_METHODS = [
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
]
