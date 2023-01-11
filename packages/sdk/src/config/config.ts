/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */


import { MbJsKeysObject, MARKET_CONTRACT_ADDRESS, Network, MINTBASE_CONTRACTS, NEAR_NETWORKS, MBJS_CONFIG_PARAMS, GRAPHQL_ENDPOINTS, RPC_ENDPOINTS } from '../types';


const CONFIG_KEYS: MbJsKeysObject = {
  network: 'testnet',
  graphqlUrl: '',
  nearRpcUrl: '',
  callbackUrl: '',
  contractAddress: '',
  marketAddress: '',
  mbContract: MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET],
  debugMode: false,
  isSet: false,
};


const setGlobalEnv = (configObj: MBJS_CONFIG_PARAMS, network: Network, callbackUrl, contractAddress): null => {
  const MB_MARKET_ADDRESS = MARKET_CONTRACT_ADDRESS[network];


  const globalConfig: MbJsKeysObject = {
    network: network as Network,
    graphqlUrl: GRAPHQL_ENDPOINTS[network] || '',
    nearRpcUrl: RPC_ENDPOINTS[network],
    callbackUrl: callbackUrl|| configObj.callbackUrl || '',
    contractAddress: contractAddress || configObj.contractAddress || '',
    marketAddress: MB_MARKET_ADDRESS,
    debugMode: network == NEAR_NETWORKS.TESTNET,
    mbContract: MINTBASE_CONTRACTS[network],
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

  return null;
};
 

const mbjsConfig = (configObj: MBJS_CONFIG_PARAMS = CONFIG_KEYS): null => {
  // adding support to proccess.env
  if (typeof window == 'undefined' && process?.env.NEAR_NETWORK) {

    let callbackUrl = '';
    let contractAddress = '';

    if (process?.env.CALLBACK_URL) {
      callbackUrl = process?.env.CALLBACK_URL;
    }

    if (process?.env.CONTRACT_ADDRESS) {
      contractAddress = process?.env.CONTRACT_ADDRESS;
    }


    setGlobalEnv(configObj, process.env.NEAR_NETWORK as Network , callbackUrl, contractAddress);
    return null;
  } else {
    setGlobalEnv(configObj, configObj.network,  configObj.callbackUrl, configObj.contractAddress);
    return null;
  }
};

export const mbjs = {
  config: mbjsConfig,
  keys: CONFIG_KEYS,
};
