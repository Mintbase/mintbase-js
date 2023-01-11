/**
 * mbjs Namespace to set the config vars on all mintbase-js packages, as also retrieve the global keys in any part of the application.
 */


import { MbJsKeysObject, MARKET_CONTRACT_ADDRESS, TOKEN_FACTORY_ADDRESS, Network, MINTBASE_CONTRACTS, NEAR_NETWORKS, MBJS_CONFIG_PARAMS } from '../types';


const CONFIG_KEYS: MbJsKeysObject = { 
  network: 'testnet',
  graphqlUrl:  '',
  nearRpcUrl: '',
  callbackUrl: '',
  contractAddress: '',
  marketAddress: '',
  tokenAddress: '',
  mbContract: '',
  debugMode: false,
  isSet: false,
}; 

export const mbjs = {
  config: (configObj: MBJS_CONFIG_PARAMS): null => { 


    // adding support to proccess.env
    if (typeof window == 'undefined' && process?.env.NEAR_NETWORK) {

      const MB_MARKET_ADDRESS = MARKET_CONTRACT_ADDRESS[process.env.NEAR_NETWORK];
      const MB_TOKEN_ADDRESS = TOKEN_FACTORY_ADDRESS[process.env.NEAR_NETWORK];


      const globalConfig: MbJsKeysObject = {
        network: process.env.NEAR_NETWORK as Network,
        graphqlUrl: `https://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql` || '',
        nearRpcUrl:  `https://rpc.${process.env.NEAR_NETWORK}.near.org`,
        callbackUrl: process?.env?.CALLBACK_URL || configObj.callbackUrl || '',
        contractAddress: process?.env?.CONTRACT_ADDRESS || configObj.contractAddress || '',
        marketAddress: MB_MARKET_ADDRESS,
        tokenAddress:MB_TOKEN_ADDRESS,
        debugMode: process.env.NEAR_NETWORK == NEAR_NETWORKS.TESTNET,
        mbContract: MINTBASE_CONTRACTS[process.env.NEAR_NETWORK],
        isSet: true,
      }; 

      CONFIG_KEYS.network = process.env.NEAR_NETWORK as Network;
      CONFIG_KEYS.graphqlUrl = globalConfig.graphqlUrl;
      CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
      CONFIG_KEYS.contractAddress = globalConfig.contractAddress;
      CONFIG_KEYS.marketAddress = globalConfig.marketAddress;
      CONFIG_KEYS.tokenAddress = globalConfig.tokenAddress;
      CONFIG_KEYS.mbContract = globalConfig.mbContract;
      CONFIG_KEYS.debugMode = globalConfig.debugMode;
      CONFIG_KEYS.nearRpcUrl = globalConfig.nearRpcUrl;
      CONFIG_KEYS.isSet = globalConfig.isSet;
      
    } else {

      const MB_MARKET_ADDRESS = MARKET_CONTRACT_ADDRESS[configObj.network];
      const MB_TOKEN_ADDRESS = TOKEN_FACTORY_ADDRESS[configObj.network];

      const globalConfig = {
        network: configObj.network || 'testnet',
        graphqlUrl: `https://interop-${configObj.network}.hasura.app/v1/graphql` || '',
        nearRpcUrl:  `https://rpc.${configObj.network}.near.org`,
        callbackUrl: configObj.callbackUrl || '',
        contractAddress: configObj.contractAddress || '',
        marketAddress: MB_MARKET_ADDRESS,
        tokenAddress:MB_TOKEN_ADDRESS,
        debugMode: configObj.network == NEAR_NETWORKS.TESTNET,
        mbContract: MINTBASE_CONTRACTS[configObj.network],
        isSet: true,
      }; 

      CONFIG_KEYS.network = globalConfig.network;
      CONFIG_KEYS.graphqlUrl = globalConfig.graphqlUrl;
      CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
      CONFIG_KEYS.contractAddress = globalConfig.contractAddress;
      CONFIG_KEYS.marketAddress = globalConfig.marketAddress;
      CONFIG_KEYS.tokenAddress = globalConfig.tokenAddress;
      CONFIG_KEYS.mbContract = globalConfig.mbContract;
      CONFIG_KEYS.debugMode = globalConfig.debugMode;
      CONFIG_KEYS.nearRpcUrl = globalConfig.nearRpcUrl;
      CONFIG_KEYS.isSet = globalConfig.isSet;
    }
    
    return null;
  },
  keys: CONFIG_KEYS,
};
