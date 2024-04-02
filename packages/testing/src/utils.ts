import { KeyPair, InMemoryKeyStore, KeyStore  } from '@mintbase-js/auth';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Firestore } from '@google-cloud/firestore';
import { SECRETS_REPO_PATH } from './constants';

const NEAR_NETWORK = process.env.NEAR_NETWORK || 'testnet';

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
      NEAR_NETWORK,
      account,
      KeyPair.fromString(gcpPK),
    );
  }

  return keyStore;
};


const GCP_PROJECT = 'omni-cloud-1';
const TELEMETRY_COLLECTION = 'telemetry';
const TELEMETRY_REF = 'gas';

const db = new Firestore({
  projectId: GCP_PROJECT,
});

export type GasTelemetryDoc = {
  gasBurnt: number;
  mintedCount: number;
  receipts: string[];
  lastUpdated: Date;
};

export const writeGasTelemetryToFirestore = async(
  data: GasTelemetryDoc,
): Promise<void> => {
  await db
    .collection(TELEMETRY_COLLECTION)
    .doc(TELEMETRY_REF)
    .set(data);
};
