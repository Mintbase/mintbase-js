import { NEAR_NETWORKS } from '../types';
import { MAINNET_MOCK, TESTNET_MOCK } from './config.mocks';

describe('test mbjs namespace', () => {

  beforeEach(() => {
    jest.resetModules();
  });

  it('should set CONFIG_KEYS with process.env TESTNET', () => {
    process.env.NEAR_NETWORK = NEAR_NETWORKS.TESTNET;
    process.env.CONTRACT_ADDRESS = TESTNET_MOCK.contractAddress;
    process.env.CALLBACK_URL = TESTNET_MOCK.callbackUrl;

    // had to require module because jest was running the file before process.env be set on the test so it always failed.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');

    expect(process.env.NEAR_NETWORK).toBeDefined();
    expect(configModule.mbjs.keys).toEqual(TESTNET_MOCK);
  });

  it('should set CONFIG_KEYS with process.env MAINNET', () => {
    process.env.NEAR_NETWORK = NEAR_NETWORKS.MAINNET;
    process.env.CONTRACT_ADDRESS = MAINNET_MOCK.contractAddress;
    process.env.CALLBACK_URL = MAINNET_MOCK.callbackUrl;

    // had to require module because jest was running the file before process.env be set on the test so it always failed.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configModule = require('./config');

    expect(process.env.NEAR_NETWORK).toBeDefined();
    expect(configModule.mbjs.keys).toEqual(MAINNET_MOCK);
  });

});
