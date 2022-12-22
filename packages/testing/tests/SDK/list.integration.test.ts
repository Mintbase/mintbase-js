import { TEST_TOKEN_CONTRACT } from '../../src/constants';
import { list } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { tokensByStatus } from '@mintbase-js/data/src/api/tokensByStatus/tokensByStatus';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { ownedTokens } from '@mintbase-js/data';

test('list a token', async () => {
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const listFromIndex = Math.random() > 0.5 ? 1 : 0;
  const accountToListFrom = accounts[listFromIndex];
  const keyStore = await authenticatedKeyStore([accountToListFrom]);
  const signingAccount = await connect(accountToListFrom, keyStore);
  const token = await ownedTokens(accountToListFrom, { limit: 1 });

  if (!token) {
    throw `${accountToListFrom} ran out of owned tokens to list! Mint some more...`;
  }
  const { unlistedTokens } = await tokensByStatus(
    token[0].metadataId,
    accountToListFrom,
  );

  if (unlistedTokens.length <= 0) {
    console.error('No unlisted tokens for list integration test');
    return;
  }

  const tokenToList: string = unlistedTokens[0];

  const result = (await execute(
    { account: signingAccount },
    list({
      nftContractId: TEST_TOKEN_CONTRACT,
      tokenId: tokenToList,
      price: '1',
    }),
  )) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();

});
