// import mbjs from '@mintbase-js/sdk/config

// mbjs.config({envvars ... })

import { MBJS_CONFIG_OBJ, NEAR_NETWORK } from './configObj';
import { execute } from './execute';

const CONFIG_OBJ: MBJS_CONFIG_OBJ = {
  network: 'testnet' as NEAR_NETWORK,
};


const mbjs = {
  config: (configObj: MBJS_CONFIG_OBJ): MBJS_CONFIG_OBJ => {
    CONFIG_OBJ.network = configObj.network;
    console.log(CONFIG_OBJ, 'CONFIG_OBJ');
    return null;
  },
  envs: CONFIG_OBJ,
  execute: execute,
};


export default mbjs;
