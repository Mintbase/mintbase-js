import { TEST_TOKEN_CONTRACT } from '../../src/constants';
import { buy } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { tokensByStatus } from '@mintbase-js/data/lib/unwrap';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { ownedTokens } from '@mintbase-js/data';

test('buy a token', async () => {
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const buyFromIndex = Math.random() > 0.5 ? 1 : 0;
  const buyIndex = buyFromIndex == 1? 0 : 1;
  const accountToBuyFrom = accounts[buyFromIndex];
  const accountToBuy = accounts[buyIndex];
  const keyStore = await authenticatedKeyStore([accountToBuy]);
  const signingAccount = await connect(accountToBuy, keyStore);
  const token = await ownedTokens(accountToBuy, { limit: 1 });

  if (!token) {
    throw `${accountToBuyFrom} ran out of owned tokens to buy! Mint some more...`;
  }
  const { listedTokens } = await tokensByStatus(
    'mb_store.mintspace2.testnet:285633c53dbad8e3493a39849f29092d',
    accountToBuyFrom,
  );
  if (listedTokens.length == 0) {
    console.error('No listed tokens for buy integration test');
    return;
  }
  const tokenToBuy: string = listedTokens[0];


  const result = (await execute(
    { account: signingAccount },
    buy({
      contractAddress: TEST_TOKEN_CONTRACT,
      price: '1',
      tokenId: tokenToBuy,
    }),
  )) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});
