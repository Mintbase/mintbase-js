/* eslint-disable @typescript-eslint/camelcase */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { execute, mint, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk/src';
import { uploadFileToArweave } from '@mintbase-js/storage';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';

import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../src/utils';


// NOTE: you will need to inject a MINTBASE_API_KEY into the env to run this test.
//TODO FIX THIS
test('upload media and mint tokens', async () => {

  const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
  const signingAccount = await connect('mb_alice.testnet', keyStore);

  // upload media to arweave
  const media = readFileSync(resolve(__dirname + '/../test-upload.jpg'));
  const { id: mediaId, mimeType } = await uploadFileToArweave(
    media,
    'test-upload.jpg',
  );

  const metadata = {
    media: `https://arweave.net/${mediaId}`,
    media_type: mimeType,
    media_size: media.length,
  };

  // upload metadata json
  const { id: referenceId } = await uploadFileToArweave(
    Buffer.from(JSON.stringify(metadata)),
    'metadata.json',
  );
  console.log('got a reference!', referenceId);

  const result = (await execute(
    {
      ...mint({
        nftContractId: TEST_TOKEN_CONTRACT,
        ownerId: 'mb_bob.testnet',
        reference: metadata.media,
      }),
      gas: MAX_GAS,
      deposit: ONE_YOCTO,
    },
    { account: signingAccount },
  )) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});
