import { addMinter } from '@mintbase-js/sdk/src/addMinter/addMinter';
import { removeMinter } from '@mintbase-js/sdk/src/removeMinter/removeMinter';
import { execute } from '@mintbase-js/sdk/src';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';

test('add and remove minter integration test', async () => {
  const minterId = 'mb_bob.testnet';
  const owner = 'mb_alice.testnet';
  const nftContractId = 'mb_store.mintspace2.testnet';
  const keyStore = await authenticatedKeyStore([owner]);
  const signingAccount = await connect(owner, keyStore);


  const add = addMinter({
    nftContractId: nftContractId,
    minterId: minterId,
  });

  const remove = removeMinter({
    nftContractId: nftContractId,
    minterId: minterId,
  });

  await execute(
    { account: signingAccount },
    add, remove,
  );
});

