import BN from 'bn.js'
import { MetadataField } from './types'

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

export const STORE_CONTRACT_VIEW_METHODS = []

export const STORE_CONTRACT_CALL_METHODS = [
  'mint_tokens',
  'nft_batch_approve',
  'nft_approve',
  'grant_minter',
  'revoke_minter',
  'burn_tokens',
  'nft_revoke_all',
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

export const FACTORY_CONTRACT_VIEW_METHODS = []
export const FACTORY_CONTRACT_CALL_METHODS = ['create_store']

export const CLOUD_STORAGE_CONFIG = {
  apiKey: process.env.MINTBASEJS_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.MINTBASEJS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.MINTBASEJS_FIREBASE_DATABASE_URL,
  projectId: process.env.MINTBASEJS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.MINTBASEJS_FIRSTORE_BUCKET_URL,
}

export const DEFAULT_ROYALTY_PERCENT = 1000

export const MAX_GAS = new BN('300000000000000')
export const ONE_YOCTO = new BN('1')
export const ZERO = new BN('0')
export const DEPLOY_STORE_COST = new BN('7000000000000000000000000')

export const VALID_FILE_FORMATS: { [key: string]: string[] } = {
  [MetadataField.Image]: ['image/jpeg', 'image/png', 'image/gif'],
  [MetadataField.Animation_url]: [
    'audio/ogg',
    'video/webm',
    'video/mp4',
    'audio/mpeg',
    'audio/mp3',
    'model/gltf-binary',
    'model/gltf+json',
    'application/octet-stream',
  ],
  [MetadataField.Document]: ['application/pdf'],
}

export const FILE_UPLOAD_SIZE_LIMIT = 31457280 // 30MB

export const REGEX_URL = new RegExp(
  '^' +
    // protocol identifier (optional)
    // short syntax // still required
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD identifier name, may end with dot
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
  'i'
)

export const ERROR_MESSAGES = {
  fileSizeExceeded: 'File size exceeded',
  fileTypeNotAccepted: 'File type not accepted',
  fileNoExtension: 'File does not have extension',
  metadataSet: 'Failed at setting metadata',
  metadataEmpty: 'Metadata is empty',
  notString: 'Value is not of type string',
  badUrl: 'URL is not well formatted',
  uploadFileAndSet: 'Failed at uploading and setting metadata field',
  uploadFile: 'Failed at uploading file',
  uploadCloud: 'Failed at uploading file to the cloud',
  uploadMetadata: 'Failed at uploading metadata',
  decentralizedStorageFailed: 'Failed storing on Arweave',
}

export const MIME_TYPES = {
  gltf: 'model/gltf+json',
  glb: 'mobel/gltf-binary',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  ogg: 'audio/ogg',
  webm: 'video/webm',
  mp4: 'video/mp4',
  mpeg: 'audio/mpeg',
  mp3: 'audio/mp3',
}
export const TWENTY_FOUR = 24
export const SEVENTY_TWO = 72
