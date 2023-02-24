import { NEAR_NETWORKS } from '@mintbase-js/sdk/lib/types';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { connect } from './account';

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
