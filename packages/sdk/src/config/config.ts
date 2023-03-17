/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */
import { FT_ADDRESSES } from '../constants';
import {
  MbJsKeysObject,
  MARKET_CONTRACT_ADDRESS,
  Network,
  MINTBASE_CONTRACTS,
  NEAR_NETWORKS,
  ConfigOptions,
  GRAPHQL_ENDPOINTS,
  RPC_ENDPOINTS,
} from '../types';

// to create a new key you have to specify here on the configuration and MbJsKeysObject + add on the setGlobalEnv

export const isProcessEnv = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK);
export const isDebugMode = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK === NEAR_NETWORKS.TESTNET);
export const hasContractAddress =  Boolean(typeof window == 'undefined' && process?.env?.CONTRACT_ADDRESS);
export const hasCallbackUrl =  Boolean(typeof window == 'undefined' && process?.env?.CALLBACK_URL);

export const DEFAULT_API_KEY = 'anon';

const defaultContractAddress = isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET];

// set startup defaults
// if users set vars on process.env it will come by default setting up the config on the server.
const startupConfig: MbJsKeysObject = {
  network: isProcessEnv ? process.env.NEAR_NETWORK : NEAR_NETWORKS.MAINNET,
  graphqlUrl: isProcessEnv ? GRAPHQL_ENDPOINTS[process.env.NEAR_NETWORK] : GRAPHQL_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  nearRpcUrl:  isProcessEnv  ? RPC_ENDPOINTS[process.env.NEAR_NETWORK] : RPC_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  callbackUrl: hasCallbackUrl ? process.env.CALLBACK_URL : '',
  // will check for process.env.CONTRACT_ADDRESS if not will setup mintbase contract according to the network, if not will setup testnet contract
  contractAddress: hasContractAddress ? process.env.CONTRACT_ADDRESS : defaultContractAddress,
  marketAddress:  isProcessEnv ? MARKET_CONTRACT_ADDRESS[process.env.NEAR_NETWORK] : MARKET_CONTRACT_ADDRESS[NEAR_NETWORKS.TESTNET],
  mbContract: isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET],
  apiKey: isProcessEnv ? process.env.MINTBASE_API_KEY : DEFAULT_API_KEY,
  debugMode: isDebugMode ? true : false,
  ftAddresses: isProcessEnv ? FT_ADDRESSES[process.env.NEAR_NETWORK] : FT_ADDRESSES[NEAR_NETWORKS.TESTNET],
  isSet:  isProcessEnv ? true : false,
};

// config is scoped globally as to avoid version mismatches from conflicting
// (force singleton at scope vs. module resolution)
const config = startupConfig;
globalThis.mbjs = startupConfig;

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
    ftAddresses: FT_ADDRESSES[configObj.network],
    isSet: true,
  };

  config.network = globalConfig.network;
  config.graphqlUrl = globalConfig.graphqlUrl;
  config.callbackUrl = globalConfig.callbackUrl;
  config.contractAddress = globalConfig.contractAddress;
  config.marketAddress = globalConfig.marketAddress;
  config.mbContract = globalConfig.mbContract;
  config.debugMode = globalConfig.debugMode;
  config.nearRpcUrl = globalConfig.nearRpcUrl;
  config.apiKey = globalConfig.apiKey;
  config.ftAddresses = globalConfig.ftAddresses;
  config.isSet = globalConfig.isSet;

  return globalConfig;
};

// client-side / manual set method
const setConfig = (configObj: ConfigOptions = config): MbJsKeysObject => {
  return setGlobalEnv(configObj);
};

export const mbjs = {
  config: setConfig,
  keys:  config,
};
