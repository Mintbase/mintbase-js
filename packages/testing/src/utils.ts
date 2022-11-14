import { KeyPair, InMemoryKeyStore, KeyStore  } from '@mintbase-js/sdk';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { SECRETS_REPO_PATH } from './constants';

const NEAR_ENV = process.env.NEAR_ENV || 'testnet';

export const authenticatedKeyStore = async (
  accountsToAuthenticate: string[],
): Promise<KeyStore> => {
  const client = new SecretManagerServiceClient();
  const keyStore = new InMemoryKeyStore();
  for (const account of accountsToAuthenticate) {
    const [version] = await client.accessSecretVersion({
      name: `${SECRETS_REPO_PATH}${account.replace(/\./g, '_')}/versions/1`,
    });
    const payload = version.payload.data.toString();
    const gcpPK = JSON.parse(payload).private_key;

    await keyStore.setKey(
      NEAR_ENV,
      account,
      KeyPair.fromString(gcpPK),
    );
  }

  return keyStore;
};
