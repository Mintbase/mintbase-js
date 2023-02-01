/**
 * @jest-environment jsdom
 */

import { ConfigOptions, NEAR_NETWORKS } from '../types';
import { MAINNET_MOCK, TESTNET_MOCK } from './config.mocks';

describe('test mbjs namespace', () => {

  beforeEach(() => {
    jest.resetModules();
  });

  it('should set CONFIG_KEYS with testnet values', () => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');

    jest.spyOn(configModule, 'setGlobalEnv');

    const config: ConfigOptions = {
      network: NEAR_NETWORKS.TESTNET,
      contractAddress:  TESTNET_MOCK.contractAddress,
      callbackUrl: TESTNET_MOCK.callbackUrl,
    };

    configModule.mbjs.config(config);

    expect(configModule.setGlobalEnv).toHaveBeenCalledWith(config);
    expect(configModule.mbjs.keys).toEqual(TESTNET_MOCK);

  });

  it('should set CONFIG_KEYS with mainnet values', () => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');

    jest.spyOn(configModule, 'setGlobalEnv');

    const config: ConfigOptions = {
      network: NEAR_NETWORKS.MAINNET,
      contractAddress:  MAINNET_MOCK.contractAddress,
      callbackUrl: MAINNET_MOCK.callbackUrl,
    };

    configModule.mbjs.config(config);

    expect(configModule.setGlobalEnv).toHaveBeenCalledWith(config);
    expect(configModule.mbjs.keys).toEqual(MAINNET_MOCK);

  });

});
