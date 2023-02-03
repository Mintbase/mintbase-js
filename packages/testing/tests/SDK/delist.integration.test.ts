import { delist } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { tokensByStatus, ownedTokens } from '@mintbase-js/data/lib/unwrap';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { TEST_TOKEN_CONTRACT } from '../../src/constants';

test('delist a token', async () => {
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const listFromIndex = Math.random() > 0.5 ? 1 : 0;
  const accountToListFrom = accounts[listFromIndex];
  const keyStore = await authenticatedKeyStore([accountToListFrom]);
  const signingAccount = await connect(accountToListFrom, keyStore);
  const token = await ownedTokens(accountToListFrom, { limit: 1 });

  if (!token) {
    throw `${accountToListFrom} ran out of owned tokens to list! Mint some more...`;
  }

  const { listedTokens } = await tokensByStatus(
    token[0].metadataId,
    accountToListFrom,
  );

  if (listedTokens.length <= 0) {
    console.error('No listed tokens for list integration test');
    return;
  }

  const result = (await execute(
    { account: signingAccount },
    delist({
      tokenIds: [listedTokens[0]],
      contractAddress: TEST_TOKEN_CONTRACT,
    }),
  )) as FinalExecutionOutcome[];

  expect(result[0].receipts_outcome).not.toBeUndefined();
  expect(result[1].receipts_outcome).not.toBeUndefined();
});
