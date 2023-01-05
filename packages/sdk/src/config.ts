// import mbjs from '@mintbase-js/sdk/config

// mbjs.config({envvars ... })

import { MBJS_CONFIG_OBJ, NEAR_NETWORK } from './configObj';

declare global {
  interface Window { mintbase: any }
}


const CONFIG_OBJ: MBJS_CONFIG_OBJ = {
  network: 'testnet' as NEAR_NETWORK,
  graphql_url: '',
  isSet: false,
};

export const mbjs = {
  config: (configObj: MBJS_CONFIG_OBJ): MBJS_CONFIG_OBJ => {
    CONFIG_OBJ.network = configObj.network;
    CONFIG_OBJ.graphql_url = `https://interop-${configObj.network}.hasura.app/v1/graphql`;
    CONFIG_OBJ.callbackUrl = configObj.callbackUrl;
    CONFIG_OBJ.isSet = true;

    window.mintbase = CONFIG_OBJ;

    return null;
  },

};
