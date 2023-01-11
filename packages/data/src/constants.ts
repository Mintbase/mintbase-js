export type NearDataEnv = 'mainnet' | 'testnet' | 'sandbox';

export const DataNetwork = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  SANDBOX: 'sandbox',
};

let hostBasedNetworkDefault = DataNetwork.MAINNET;

if (globalThis?.window?.location.host.includes(DataNetwork.TESTNET)) {
  hostBasedNetworkDefault = DataNetwork.TESTNET;
}

if (globalThis?.window?.location.host.includes(DataNetwork.SANDBOX)) {
  hostBasedNetworkDefault = DataNetwork.SANDBOX;
}

export const NEAR_DATA_ENV = process.env.NEAR_DATA_ENV ||
  hostBasedNetworkDefault;

export const GRAPHQL_ENDPOINT = `https://interop-${NEAR_DATA_ENV}.hasura.app/v1/graphql`;
export const QUERY_OPS_PREFIX = 'mintbase_js_data_';

export const BINANCE_API = 'https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT';
export const COIN_GECKO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=near%2Cusn%2Cjumbo-exchange&include_last_updated_at=true&vs_currencies=usd%2Ceur%2Ccny';
