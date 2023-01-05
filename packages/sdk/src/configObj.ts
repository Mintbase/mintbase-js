export type NEAR_NETWORK = 'testnet' | 'mainnet' | 'sandbox'


export type MBJS_CONFIG_OBJ = {
  network: NEAR_NETWORK | '';
  graphql_url?: string;
  callbackUrl?: string;
}

export interface MbJsKeysObject extends MBJS_CONFIG_OBJ  {
 isSet: boolean;
}