import { batchChangeMinters } from '../../../sdk/src/batchChangeMinters/batchChangeMinters';
import { execute } from '@mintbase-js/sdk/src';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';

test('batch change minters integration test', async () => {
  const minterIds = ['mb_bob.testnet', 'mb_alice.testnet'];
  const owner = 'mb_alice.testnet';
  const nftContractId = 'mb_store.mintspace2.testnet';
  const keyStore = await authenticatedKeyStore([owner]);
  const signingAccount = await connect(owner, keyStore);


  const add = batchChangeMinters({
    nftContractId: nftContractId,
    addMinters: minterIds,
  });

  const remove = batchChangeMinters({
    nftContractId: nftContractId,
    removeMinters: minterIds,
  });

  await execute(
    { account: signingAccount },
    add, remove,
  );
});
