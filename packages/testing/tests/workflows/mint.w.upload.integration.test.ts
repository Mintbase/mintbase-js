/* eslint-disable @typescript-eslint/camelcase */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  LICENSE_TEST_TOKEN_CONTRACT,
  TEST_TOKEN_CONTRACT,
} from '../../src/constants';
import { execute, mint } from '@mintbase-js/sdk/src';
import { uploadBuffer } from '@mintbase-js/storage';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore, writeGasTelemetryToFirestore } from '../../src/utils';

// const USE_TEST_CONTRACT = TEST_TOKEN_CONTRACT;
const USE_TEST_CONTRACT = LICENSE_TEST_TOKEN_CONTRACT;

test('upload media and mint tokens', async () => {

  const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
  const signingAccount = await connect('mb_alice.testnet', keyStore);

  // upload media to arweave
  const media = readFileSync(resolve(__dirname + '/../../observatory.jpg'));
  const mediaTwo = readFileSync(resolve(__dirname + '/../../gas-station.jpg'));
  const { id: mediaIdOne, mimeType: mimeTypeOne } = await uploadBuffer(
    media,
    'observatory.jpg',
  );

  const { id: mediaIdTwo, mimeType: mimeTypeTwo } = await uploadBuffer(
    mediaTwo,
    'gas-station.jpg',
  );

  const metadata = {
    title: 'Telemetry For Gas I',
    description: 'These assets are used in integration tests to calculate current gas costs for minting',
    media: `https://arweave.net/${mediaIdOne}`,
    media_type: mimeTypeOne,
    media_size: media.length,
  };

  // upload metadata json
  const { id: referenceIdOne } = await uploadBuffer(
    Buffer.from(JSON.stringify(metadata)),
    'metadata.json',
  );

  const { id: referenceIdTwo } = await uploadBuffer(
    Buffer.from(JSON.stringify({
      ...metadata,
      media: `https://arweave.net/${mediaIdTwo}`,
      media_type: mimeTypeTwo,
      media_size: mediaTwo.length,
      title: 'Telemetry For Gas II',
    })),
    'metadata.json',
  );

  const randInt = (): number => Number(Math.random().toString().slice(2, 19));

  const results = (await execute(
    { account: signingAccount },

    mint({
      contractAddress: USE_TEST_CONTRACT,
      ownerId: 'mb_alice.testnet',
      metadata: {
        reference: referenceIdOne,
        media: mediaIdOne,
      },
      royalties: { test: 0.23, test1: 0.12654, test2: 0.04421 },
      tokenIdsToMint: [randInt()],
    }),

  )) as FinalExecutionOutcome[];


  // add up gas used doing this
  const gasBurnt = results.reduce((acc: number, outcome: FinalExecutionOutcome) => {
    return acc + outcome.receipts_outcome[0].outcome.gas_burnt;
  }, 0);

  await writeGasTelemetryToFirestore({
    gasBurnt,
    mintedCount: results.length,
    receipts: results.map((outcome: FinalExecutionOutcome) => outcome.receipts_outcome[0].id),
    lastUpdated: new Date(),
  });

  expect(results.length).toBeGreaterThan(0);
});
