/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */
import { FT_ADDRESSES, RPC_ENDPOINTS } from '../constants';
import {
  MbJsKeysObject,
  MARKET_CONTRACT_ADDRESS,
  Network,
  MINTBASE_CONTRACTS,
  MINTBASE_CONTRACTS_V2,
  NEAR_NETWORKS,
  ConfigOptions,
  GRAPHQL_ENDPOINTS,
  NEAR_RPC_ENDPOINTS,
} from '../types';

// to create a new key you have to specify here on the configuration and MbJsKeysObject + add on the setGlobalEnv

export const isProcessEnv = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK);
export const hasRpcEnv = Boolean(typeof window == 'undefined' && process?.env?.RPC);
export const isDebugMode = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK === NEAR_NETWORKS.TESTNET);
export const hasContractAddress =  Boolean(typeof window == 'undefined' && process?.env?.CONTRACT_ADDRESS);
export const hasCallbackUrl =  Boolean(typeof window == 'undefined' && process?.env?.CALLBACK_URL);

const RPC_noRPCenv = isProcessEnv ? NEAR_RPC_ENDPOINTS[process.env.NEAR_NETWORK] :  NEAR_RPC_ENDPOINTS[NEAR_NETWORKS.MAINNET];

export const DEFAULT_API_KEY = 'anon';


const defaultContractAddress = isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.MAINNET];

// set startup defaults
// if users set vars on process.env it will come by default setting up the config on the server.
const startupConfig: MbJsKeysObject = {
  network: isProcessEnv ? process.env.NEAR_NETWORK : NEAR_NETWORKS.MAINNET,
  graphqlUrl: isProcessEnv ? GRAPHQL_ENDPOINTS[process.env.NEAR_NETWORK] : GRAPHQL_ENDPOINTS[NEAR_NETWORKS.MAINNET],
  nearRpcUrl:  isProcessEnv && hasRpcEnv ? RPC_ENDPOINTS[process.env.RPC][process.env.NEAR_NETWORK] : RPC_noRPCenv,
  callbackUrl: hasCallbackUrl ? process.env.CALLBACK_URL : '',
  // will check for process.env.CONTRACT_ADDRESS if not will setup mintbase contract according to the network, if not will setup testnet contract
  contractAddress: hasContractAddress ? process.env.CONTRACT_ADDRESS : defaultContractAddress,
  marketAddress:  isProcessEnv ? MARKET_CONTRACT_ADDRESS[process.env.NEAR_NETWORK] : MARKET_CONTRACT_ADDRESS[NEAR_NETWORKS.MAINNET],
  mbContract: isProcessEnv ? MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS[NEAR_NETWORKS.MAINNET],
  mbContractV2: isProcessEnv ? MINTBASE_CONTRACTS_V2[process.env.NEAR_NETWORK] : MINTBASE_CONTRACTS_V2[NEAR_NETWORKS.MAINNET],
  apiKey: isProcessEnv ? process.env.MINTBASE_API_KEY : DEFAULT_API_KEY,
  connectProxyAddress: null,
  debugMode: isDebugMode ? true : false,
  ftAddresses: isProcessEnv ? FT_ADDRESSES[process.env.NEAR_NETWORK] : FT_ADDRESSES[NEAR_NETWORKS.MAINNET],
  isSet:  isProcessEnv ? true : false,
  checkVersions: true,
};

// config is scoped globally as to avoid version mismatches from conflicting
// (force singleton at scope vs. module resolution)
const config = startupConfig;
globalThis.mbjs = config;

export const setGlobalEnv = (configObj: ConfigOptions): MbJsKeysObject => {
  const globalConfig: MbJsKeysObject = {
    network: configObj.network as Network,
    graphqlUrl: GRAPHQL_ENDPOINTS[configObj.network],
    rpc: configObj.rpc,
    nearRpcUrl: configObj.rpc ? RPC_ENDPOINTS[configObj.rpc][configObj.network]: NEAR_RPC_ENDPOINTS[configObj.network],
    callbackUrl: configObj.callbackUrl,
    contractAddress: configObj.contractAddress ?? MINTBASE_CONTRACTS[configObj.network],
    marketAddress: MARKET_CONTRACT_ADDRESS[configObj.network],
    debugMode: configObj.network == NEAR_NETWORKS.TESTNET,
    mbContract: MINTBASE_CONTRACTS[configObj.network],
    mbContractV2: MINTBASE_CONTRACTS_V2[configObj.network],
    apiKey: configObj.apiKey ?? DEFAULT_API_KEY,
    connectProxyAddress: null,
    ftAddresses: FT_ADDRESSES[configObj.network],
    isSet: true,
    checkVersions: true,
  };

  config.network = globalConfig.network;
  config.rpc = globalConfig.rpc;
  config.graphqlUrl = globalConfig.graphqlUrl;
  config.callbackUrl = globalConfig.callbackUrl;
  config.contractAddress = globalConfig.contractAddress;
  config.marketAddress = globalConfig.marketAddress;
  config.mbContract = globalConfig.mbContract;
  config.mbContractV2 = globalConfig.mbContractV2;
  config.debugMode = globalConfig.debugMode;
  config.nearRpcUrl = globalConfig.nearRpcUrl;
  config.apiKey = globalConfig.apiKey;
  config.connectProxyAddress = globalConfig.connectProxyAddress;
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
