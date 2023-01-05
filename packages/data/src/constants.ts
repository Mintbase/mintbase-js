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


export const NEAR_DATA_ENV = mbjs.envs.network ||  hostBasedNetworkDefault;

console.log(mbjs, mbjs.envs, mbjs.envs.network, NEAR_DATA_ENV,  'data package mbjs import test');


export const GRAPHQL_ENDPOINT = `https://interop-${mbjs.envs.network }.hasura.app/v1/graphql`;

console.log(GRAPHQL_ENDPOINT, 'graphql endpoint');

export const QUERY_OPS_PREFIX = 'mintbase_js_data_';
