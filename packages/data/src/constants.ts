import { mbjs } from '@mintbase-js/sdk';
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

console.log(mbjs, mbjs.envs, 'data package mbjs import test');

export const NEAR_DATA_ENV = mbjs.envs.network ||  hostBasedNetworkDefault;

export const GRAPHQL_ENDPOINT = `https://interop-${NEAR_DATA_ENV}.hasura.app/v1/graphql`;
export const QUERY_OPS_PREFIX = 'mintbase_js_data_';
