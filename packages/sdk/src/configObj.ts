export type NEAR_NETWORK = 'testnet' | 'mainnet'


export type MBJS_CONFIG_OBJ = {
  network: NEAR_NETWORK;
  graphql_url?: string;
  callbackUrl?: string;
}

export const CONFIG_OBJ: MBJS_CONFIG_OBJ = {
  network: 'testnet',
  graphql_url: '',
  callbackUrl: '',
};
