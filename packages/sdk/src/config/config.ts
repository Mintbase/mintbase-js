/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */


import { MbJsKeysObject, MARKET_CONTRACT_ADDRESS, Network, MINTBASE_CONTRACTS, NEAR_NETWORKS, MBJS_CONFIG_PARAMS, GRAPHQL_ENDPOINTS, RPC_ENDPOINTS } from '../types';

// to create a new key you have to specify here on the CONFIG_KEYS and MbJsKeysObject + add on the setGlobalEnv


export const isProcessEnv = Boolean(typeof window == 'undefined' && process?.env?.NEAR_NETWORK);


export const CONFIG_KEYS: MbJsKeysObject = {
  network: typeof window == 'undefined' && process.env.NEAR_NETWORK ? process.env.NEAR_NETWORK : NEAR_NETWORKS.TESTNET,
  graphqlUrl: '',
  nearRpcUrl: '',
  callbackUrl:  typeof window == 'undefined' && process.env.CALLBACK_URL ? process.env.CALLBACK_URL : '' ,
  contractAddress: typeof window == 'undefined' && process.env.CONTRACT_ADDRESS ? process.env.CONTRACT_ADDRESS :  '',
  marketAddress: '',
  mbContract: MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET],
  debugMode: false,
  isSet: false,
};

export const setGlobalEnv = (configObj: MBJS_CONFIG_PARAMS): MbJsKeysObject => {
  const MB_MARKET_ADDRESS = MARKET_CONTRACT_ADDRESS[configObj.network];


  const globalConfig: MbJsKeysObject = {
    network: configObj.network as Network,
    graphqlUrl: GRAPHQL_ENDPOINTS[configObj.network] || '',
    nearRpcUrl: RPC_ENDPOINTS[configObj.network],
    callbackUrl:   configObj.callbackUrl || '',
    contractAddress: configObj.contractAddress || '',
    marketAddress: MB_MARKET_ADDRESS,
    debugMode: configObj.network == NEAR_NETWORKS.TESTNET,
    mbContract: MINTBASE_CONTRACTS[configObj.network],
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
  CONFIG_KEYS.isSet = globalConfig.isSet;

  return globalConfig;
};
 

export const setConfigProcessEnv = (): MbJsKeysObject => {
  let callbackUrl = '';
  let contractAddress = '';

  if (process?.env.CALLBACK_URL) {
    callbackUrl = process?.env.CALLBACK_URL;
  }

  if (process?.env.CONTRACT_ADDRESS) {
    contractAddress = process?.env.CONTRACT_ADDRESS;
  }

  const configObjProcess = { network: process.env.NEAR_NETWORK as Network, callbackUrl: callbackUrl, contractAddress: contractAddress };
   
  return setGlobalEnv(configObjProcess);
};

const mbjsConfig = (configObj: MBJS_CONFIG_PARAMS = CONFIG_KEYS): MbJsKeysObject => {
  return setGlobalEnv(configObj);
};

export const mbjs = {
  config: mbjsConfig,
  keys: isProcessEnv? setConfigProcessEnv() : CONFIG_KEYS,
};
