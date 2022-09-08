import BN from 'bn.js'
import { MetadataField } from './types'

export const CLOUD_URI = process.env.MINTBASEJS_CLOUD_URI
export const API_VERSION = process.env.MINTBASEJS_API_VERSION || '1'

export const API_BASE_NEAR_MAINNET =
  process.env.MINTBASEJS_API_BASE_NEAR_MAINNET ||
  'https://mintbase-mainnet.hasura.app/'
export const API_BASE_NEAR_TESTNET =
  process.env.MINTBASEJS_API_BASE_NEAR_TESTNET ||
  'https://mintbase-testnet.hasura.app/'
export const BASE_ARWEAVE_URI = 'https://arweave.net'

export const DEFAULT_APP_NAME = 'Mintbase.js'
export const NEAR_LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key'

// TODO: pull this from somewhere else?
export const FACTORY_CONTRACT_NAME =
  process.env.MINTBASEJS_FACTORY_CONTRACT_NAME || 'mintspace2.testnet'

export const STORE_CONTRACT_VIEW_METHODS = []

export const STORE_CONTRACT_CALL_METHODS = [
  'nft_batch_mint',
  'nft_batch_approve',
  'nft_approve',
  'grant_minter',
  'revoke_minter',
  'burn_tokens',
  'nft_revoke_all',
  'nft_revoke',
  'nft_batch_burn',
  'nft_batch_transfer',
  'nft_transfer',
  'set_icon_base64',
  'set_base_uri',
  'transfer_store_ownership',
  'new',
  'batch_change_minters'
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

export const MAX_GAS = new BN('225000000000000')
export const ONE_YOCTO = new BN('1')
export const ZERO = new BN('0')
export const DEPLOY_STORE_COST = new BN('7000000000000000000000000')

export const VALID_FILE_FORMATS: { [key: string]: string[] } = {
  [MetadataField.Media]: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
  [MetadataField.Animation_url]: [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
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
  invalidKeyPair: 'No valid key pair',
  undefinedAccountId: 'Account Id is undefined',
  undefinedKeyStore: 'Key Store is undefined',
  walletNotConnected: 'Wallet is not connected',
  invalidRoyalties: 'Royalty percentage is invalid',
}

export const MIME_TYPES = {
  gltf: 'model/gltf+json',
  glb: 'model/gltf-binary',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  ogg: 'audio/ogg',
  webm: 'video/webm',
  mp4: 'video/mp4',
  mpeg: 'audio/mpeg',
  mp3: 'audio/mp3',
}
export const TWENTY_FOUR = 24
export const SEVENTY_TWO = 72

export const MINTBASE_32x32_BASE64_DARK_LOGO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEXUlEQVRYR8VXW4hVVRj+vrX3OYbFNBl2eSsoa8pkxMJmzpGGoIwMY0wwImuCXmKKkiikKayHQIpAwbdAswskBYqJSlANek7TUOPURGKCWdmFkJnsoZnhzNn/F2vcZ9gez2UfEVoP+2Gv///Xt771X4mUq6enpz2Kogck3S2pk+R1ki736iT/kfQzyW/N7PNsNrtvcHDwTBrTbCbU1dV1cxiGGyWtA3BJM/l4f1rSLjPbPDQ0dKyRTl0AS5YsubStre11AP0AwiYHi+SJmJGFCdmypG3T09MDIyMjk7Vs1ASQy+VuIrkbQEezG3vqJfXGTzHhnFtlZttIuoTuUQC9hULheLW98wDkcrnbARwkeWWzw+P9ewCsB/AYgBkz6yW5lmRfUl/SOMmVhUJhJPn/HAD+5gCKLRzubS0AMO59MTa828z2Oud2VF8gBtGdZGIOQPzmX6ehPWk4iqKOIAg+BnCr/y/pJUmnnHPv1WHw6NTU1B0Vn5gDkM/ntwB4NiXtc2KS9kdR1B+G4aMA/pD0kaQHGwDwILcUi8UNs37jPz7UgiD4PoW318Qn6QSA/STbJc2T9EkjAAB8dCwuFos/zgLI5/M7YydqlYBa8vvMbFcTAJ6FncVisY/5fP4KT10LSaYZyFQAAEyHYXitB+BD6N1mVlvYTwsAZraeuVxuR3XMNjpM0mFJW0n+VUfub0mnSS6S5JxznQBeBpDMkBXV7R7AKEkv1HRJGiLpvX0rgHYzGyB5S5yuZ/VJHioUCv25XO4Vn/0AHDCzD51z35DMViWnUf8EEwC8H6RZj5O8Py5M3pF+D4JghZn9lFDeB+AtAF9U/vmw9CBJ3lt1yIQHYIks1gzEapJPSlodJ53xcrncmclkTiUOOwRgM8n9iX8Pk/S+tqqKAWsZgJmddM6971kzs+f9W5P0VbOyZmZmZjyo5yStcc4djKJoE8kxkvNrAWjlCVZLugHAYefcpJmtIzkAIKii7ldJL5jZkTAMF0t6A8CNNeidaMkJAXjqNwLobvZWafYljbYahhcVAIDtrSaiiwpgNhGlSMVjAI5J8m3Xm3FILapD8UKSd9XwiVriZ1Ox36lXjCRtMLPPwjC8s1QqHRgeHv6tu7v7IefcNYkQG8tkMqPlcnmNrylm9q9z7lMAlzXyg7li5IXqlOOvADwN4EsAPoOdLpVKHdlsdm/SCUku8/UdwIo4NzxF8noALzYAcG45jlmobkjelnTc014xRPI+Sa8BWJ4w7lsyH8qVtUfSHpLv1ANwXkPiBWu0ZEeiKOoLgsAzMd+nXTNb7pz7geTsQBLfuIvkqwBWnu3I9ASAZSSfqQOgdkvmhaubUpKboij6IAiCpSSH/aAB4JEqw9+VSqXeTCZzm6Q/nXNXA/A94rxqAA2b0opwjbb8JADfzy8FcFWdW01K8kwtqFdZU7XlCRCpB5M0GQ9A+sGkYrDF0awejgsbzZLW/rfhtPpKTcbzM5J+uZDx/D8+0FUx/4DhyAAAAABJRU5ErkJggg=='
