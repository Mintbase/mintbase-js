import { batchChangeMinters } from '@mintbase-js/sdk/src/batchChangeMinters/batchChangeMinters';
import { execute } from '@mintbase-js/sdk/src';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';

test('batch change minters integration test', async () => {
  const minter = ['mb_bob.testnet'];
  const owner = 'mb_alice.testnet';
  const nftContractId = 'mb_store.mintspace2.testnet';
  const keyStore = await authenticatedKeyStore([owner]);
  const signingAccount = await connect(owner, keyStore);


  const add = batchChangeMinters({
    contractAddress: nftContractId,
    addMinters: minter,
  });

  const remove = batchChangeMinters({
    contractAddress: nftContractId,
    removeMinters: minter,
  });

  const result = await execute(
    { account: signingAccount },
    add, remove,
  ) as FinalExecutionOutcome[];

  expect(result[0].receipts_outcome).not.toBeUndefined();
  expect(result[1].receipts_outcome).not.toBeUndefined();
});
