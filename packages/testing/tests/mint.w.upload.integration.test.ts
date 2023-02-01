/* eslint-disable @typescript-eslint/camelcase */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { execute, mint } from '@mintbase-js/sdk/src';
import { uploadBuffer } from '@mintbase-js/storage';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../src/utils';

test('upload media and mint tokens', async () => {

  const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
  const signingAccount = await connect('mb_alice.testnet', keyStore);

  // upload media to arweave
  const media = readFileSync(resolve(__dirname + '/../test-upload.jpg'));
  const { id: mediaId, mimeType } = await uploadBuffer(
    media,
    'test-upload.jpg',
  );

  const metadata = {
    title: 'A very fine NFT',
    description: 'Hopefully this will show up now',
    media: `https://arweave.net/${mediaId}`,
    media_type: mimeType,
    media_size: media.length,
  };

  // upload metadata json
  const { id: referenceId } = await uploadBuffer(
    Buffer.from(JSON.stringify(metadata)),
    'metadata.json',
  );

  const result = (await execute(
    { account: signingAccount },

    mint({
      contractAddress: TEST_TOKEN_CONTRACT,
      ownerId: 'mb_alice.testnet',
      metadata: {
        reference: referenceId,
        media: mediaId,
      },
    }),

  )) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});
