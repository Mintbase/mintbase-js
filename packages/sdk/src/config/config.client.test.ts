/**
 * @jest-environment jsdom
 */

import { MBJS_CONFIG_PARAMS, NEAR_NETWORKS } from '../types';
import { MAINNET_MOCK, TESTNET_MOCK } from './config.mocks';


describe('test mbjs namespace', () => {

  beforeEach(() => {
    jest.resetModules();
  });


  it('should set CONFIG_KEYS with testnet values', () => {

    // had to require module because jest was running the file before process.env be set on the test so it always failed.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');


    jest.spyOn(configModule, 'setGlobalEnv');


    const config: MBJS_CONFIG_PARAMS = {
      network: NEAR_NETWORKS.TESTNET,
      contractAddress:  TESTNET_MOCK.contractAddress,
      callbackUrl: TESTNET_MOCK.callbackUrl,
    };

    configModule.mbjs.config(config);


    expect(configModule.setGlobalEnv).toHaveBeenCalledWith(config);
    expect(configModule.mbjs.keys).toEqual(TESTNET_MOCK);
   
  });


  it('should set CONFIG_KEYS with mainnet values', () => {


    // had to require module because jest was running the file before process.env be set on the test so it always failed.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');


    jest.spyOn(configModule, 'setGlobalEnv');


    const config: MBJS_CONFIG_PARAMS = {
      network: NEAR_NETWORKS.MAINNET,
      contractAddress:  MAINNET_MOCK.contractAddress,
      callbackUrl: MAINNET_MOCK.callbackUrl,
    };

    configModule.mbjs.config(config);


    expect(configModule.setGlobalEnv).toHaveBeenCalledWith(config);
    expect(configModule.mbjs.keys).toEqual(MAINNET_MOCK);
   
  });

});
