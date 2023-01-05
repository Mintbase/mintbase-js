export type NEAR_NETWORK = 'testnet' | 'mainnet'


export type MBJS_CONFIG_OBJ = {
  network: NEAR_NETWORK;
  graphql_url?: string;
  callbackUrl?: string;
  isSet: boolean;
}
