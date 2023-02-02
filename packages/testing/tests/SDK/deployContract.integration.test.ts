import { deployContract } from '@mintbase-js/sdk/src/deployContract/deployContract';
import { execute } from '@mintbase-js/sdk/src';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';

test('deploy contract', async () => {
  const account = 'mb_alice.testnet';
  const keyStore = await authenticatedKeyStore([account]);
  const signingAccount = await connect(account, keyStore);

  const contractOptions = {
    name: makeRandomString(10),
    ownerId: account,
    metadata: {
      symbol: 'test',
    },
  };

  const result = await execute(
    { account: signingAccount },
    deployContract(contractOptions),
  ) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});


function makeRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
