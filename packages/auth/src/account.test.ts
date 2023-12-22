import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { connect } from './account';
import { NEAR_NETWORKS } from '@mintbase-js/sdk';

globalThis.mbjs = {
  keys :{
    apiKey: 'omni-site',
    callbackUrl: 'https://www.mintbase.xyz/wallet-callback',
    connectProxyAddress: null,
    contractAddress: 'mintbase1.near',
    debugMode: false,
    ftAddresses: {
      usdc: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
    },
    graphqlUrl: 'https://interop-mainnet.hasura.app/v1/graphql',
    isSet: true,
    marketAddress: 'simple.market.mintbase1.near',
    mbContract: 'mintbase1.near',
    nearRpcUrl: 'https://near-mainnet.api.pagoda.co/rpc/v1',
    network: 'mainnet',
  },
};

describe('connect', () => {
  it('should return an account with connection', async () => {
    const keyStore = new InMemoryKeyStore();
    const account = await connect('mb_alice.testnet', keyStore, 'testnet');
    expect(account.connection).not.toBeNull();
  });

  it('should default network to NEAR_NETWORK', async () => {
    const keyStore = new InMemoryKeyStore();
    const account = await connect('mb_alice.testnet', keyStore);
    expect(account.connection.networkId).toBe(NEAR_NETWORKS.MAINNET);
  });
});
