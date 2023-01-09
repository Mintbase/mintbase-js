// import mbjs from '@mintbase-js/sdk/config

// mbjs.config({envvars ... })

import { MBJS_CONFIG_OBJ, MbJsKeysObject, NEAR_NETWORK } from './configObj';

declare global {
  interface Window { mintbase: MbJsKeysObject }
}

const CONFIG_KEYS: MbJsKeysObject = { 
  network: '',
  graphqlUrl:  '',
  callbackUrl: '',
  contractAddress: '',
  isSet: false,
}; 

export const mbjs = {
  config: (configObj: MBJS_CONFIG_OBJ): null => { 


    // adding support to proccess.env
    if (typeof window == 'undefined' && process?.env.NEAR_NETWORK) {
      const globalConfig = {
        network: process.env.NEAR_NETWORK || 'testnet',
        graphqlUrl: `https://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql` || '',
        callbackUrl: process?.env?.CALLBACK_URL || configObj.callbackUrl || '',
        isSet: true,
      }; 

      CONFIG_KEYS.network = process.env.NEAR_NETWORK as NEAR_NETWORK;
      CONFIG_KEYS.graphqlUrl = globalConfig.graphqlUrl;
      CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
      CONFIG_KEYS.isSet = globalConfig.isSet;
      
    } else {

      const globalConfig = {
        network: configObj.network || 'testnet',
        graphqlUrl: `https://interop-${configObj.network}.hasura.app/v1/graphql` || '',
        callbackUrl: configObj.callbackUrl || '',
        isSet: true,
      }; 

      CONFIG_KEYS.network = globalConfig.network;
      CONFIG_KEYS.graphqlUrl = globalConfig.graphqlUrl;
      CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
      CONFIG_KEYS.isSet = globalConfig.isSet;
    }


    return null;
  },
  keys: CONFIG_KEYS,
};
