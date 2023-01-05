// import mbjs from '@mintbase-js/sdk/config

// mbjs.config({envvars ... })

import { MBJS_CONFIG_OBJ, NEAR_NETWORK } from './configObj';

declare global {
  interface Window { mintbase: any }
}

let CONFIG_OBJ: any;

export const mbjs = {
  config: (configObj: MBJS_CONFIG_OBJ): any => { 
    const globalConfig = {
      network: configObj.network || 'testnet',
      graphql_url: `https://interop-${configObj.network}.hasura.app/v1/graphql` || '',
      callbackUrl: configObj.callbackUrl || '',
      isSet: true,
    }; 
    CONFIG_OBJ = globalConfig;

    if (globalThis?.window) {
      window.mintbase = globalConfig;
    }

  },
  env: globalThis?.window?.mintbase,
};
