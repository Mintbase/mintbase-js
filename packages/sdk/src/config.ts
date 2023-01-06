// import mbjs from '@mintbase-js/sdk/config

// mbjs.config({envvars ... })

import { MBJS_CONFIG_OBJ, MbJsKeysObject } from './configObj';

declare global {
  interface Window { mintbase: MbJsKeysObject }
}

const CONFIG_KEYS: MbJsKeysObject = { 
  network: '',
  graphql_url:  '',
  callbackUrl: '',
  isSet: false,
}; 

export const mbjs = {
  config: (configObj: MBJS_CONFIG_OBJ): null => { 
    const globalConfig = {
      network: configObj.network || 'testnet',
      graphqlUrl: `https://interop-${configObj.network}.hasura.app/v1/graphql` || '',
      callbackUrl: configObj.callbackUrl || '',
      isSet: true,
    }; 

    CONFIG_KEYS.network = globalConfig.network;
    CONFIG_KEYS.graphql_url = globalConfig.graphqlUrl;
    CONFIG_KEYS.callbackUrl = globalConfig.callbackUrl;
    CONFIG_KEYS.isSet = globalConfig.isSet;


    console.log(globalConfig, CONFIG_KEYS, 'keys');

    if (globalThis?.window) {
      window.mintbase = globalConfig;
    }

    return null;
  },
  keys: CONFIG_KEYS,
};
