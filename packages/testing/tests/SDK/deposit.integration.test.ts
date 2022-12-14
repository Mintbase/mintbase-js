import { depositStorage } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';

test('deposit storage for current account', async () => {
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const burnFromIndex = Math.random() > 0.5 ? 1 : 0;
  const accountToDepositFrom = accounts[burnFromIndex];
  const keyStore = await authenticatedKeyStore([accountToDepositFrom]);
  const signingAccount = await connect(accountToDepositFrom, keyStore);

  const result = (await execute(
  
    { account: signingAccount },
    depositStorage({}),
  )) as FinalExecutionOutcome; 


  expect(result.receipts_outcome).not.toBeUndefined();

});
