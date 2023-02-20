/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */


import { MbJsKeysObject, MARKET_CONTRACT_ADDRESS, Network, MINTBASE_CONTRACTS, NEAR_NETWORKS, ConfigOptions, GRAPHQL_ENDPOINTS, RPC_ENDPOINTS } from '../types';

// to create a new key you have to specify here on the CONFIG_KEYS and MbJsKeysObject + add on the setGlobalEnv

export const isProcessEnv = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK);
export const isDebugMode = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK === NEAR_NETWORKS.TESTNET);
export const hasContractAddress =  Boolean(typeof window == 'undefined' && process?.env?.CONTRACT_ADDRESS);
export const hasCallbackUrl =  Boolean(typeof window == 'undefined' && process?.env?.CALLBACK_URL);

export const DEFAULT_API_KEY = 'anon';

const defaultContractAddress = isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET];

// if users set vars on process.env it will come by default setting up the config on the server.
export const CONFIG_KEYS: MbJsKeysObject = {
  network: isProcessEnv ? process.env.NEAR_NETWORK : NEAR_NETWORKS.TESTNET,
  graphqlUrl: isProcessEnv ? GRAPHQL_ENDPOINTS[process.env.NEAR_NETWORK] : GRAPHQL_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  nearRpcUrl:  isProcessEnv  ? RPC_ENDPOINTS[process.env.NEAR_NETWORK] : RPC_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  callbackUrl: hasCallbackUrl ? process.env.CALLBACK_URL : '',
  // will check for process.env.CONTRACT_ADDRESS if not will setup mintbase contract according to the network, if not will setup testnet contract
  contractAddress: hasContractAddress ? process.env.CONTRACT_ADDRESS : defaultContractAddress,
  marketAddress:  isProcessEnv ? MARKET_CONTRACT_ADDRESS[process.env.NEAR_NETWORK] : MARKET_CONTRACT_ADDRESS[NEAR_NETWORKS.TESTNET],
  mbContract: isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET],
  apiKey: isProcessEnv ? process.env.MINTBASE_API_KEY : DEFAULT_API_KEY,
  debugMode: isDebugMode ? true : false,
  isSet:  isProcessEnv ? true : false,
};

export const setGlobalEnv = (configObj: ConfigOptions): MbJsKeysObject => {
  const globalConfig: MbJsKeysObject = {
    network: configObj.network as Network,
    graphqlUrl: GRAPHQL_ENDPOINTS[configObj.network],
    nearRpcUrl: RPC_ENDPOINTS[configObj.network],
    callbackUrl: configObj.callbackUrl,
    contractAddress: configObj.contractAddress ?? MINTBASE_CONTRACTS[configObj.network],
    marketAddress: MARKET_CONTRACT_ADDRESS[configObj.network],
    debugMode: configObj.network == NEAR_NETWORKS.TESTNET,
    mbContract: MINTBASE_CONTRACTS[configObj.network],
    apiKey: configObj.apiKey ?? DEFAULT_API_KEY,
    isSet: true,
  };

  CONFIG_KEYS.network = globalConfig.network;
  CONFIG_KEYS.graphqlUrl = globalConfig.graphqlUrl;
  CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
  CONFIG_KEYS.contractAddress = globalConfig.contractAddress;
  CONFIG_KEYS.marketAddress = globalConfig.marketAddress;
  CONFIG_KEYS.mbContract = globalConfig.mbContract;
  CONFIG_KEYS.debugMode = globalConfig.debugMode;
  CONFIG_KEYS.nearRpcUrl = globalConfig.nearRpcUrl;
  CONFIG_KEYS.apiKey = globalConfig.apiKey;
  CONFIG_KEYS.isSet = globalConfig.isSet;

  return globalConfig;
};

// client-side / manual set method
const setConfig = (configObj: ConfigOptions = CONFIG_KEYS): MbJsKeysObject => {
  return setGlobalEnv(configObj);
};

export const mbjs = {
  config: setConfig,
  keys:  CONFIG_KEYS,
};
