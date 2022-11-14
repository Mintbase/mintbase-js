import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../src/utils';
import { transfer, execute, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk';
import { ownedTokens } from '@mintbase-js/data';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';

test('transfer token between two accounts', async () => {
  // to keep from exhausting tokens, alice or bob are selected at random
  // as transferer and recipient
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const transferToIndex = Math.random() > 0.5 ? 1 : 0;
  const transferFromIndex = transferToIndex === 1 ? 0 : 1;
  const accountFrom = accounts[transferToIndex];
  const accountTo = accounts[transferFromIndex];
  const keyStore = await authenticatedKeyStore([accountFrom]);
  const signingAccount = await connect(accountFrom, keyStore);

  // get tokens owned by the transfer
  const [token] = await ownedTokens(accountFrom, { limit: 1 });
  if (!token) {
    throw `${accountFrom} ran out of tokens to transfer! Mint some more...`;
  }

  const result = await execute({
    ...transfer({
      nftContractId: TEST_TOKEN_CONTRACT,
      transfers: [
        { receiverId: accountTo, tokenId: token.tokenId },
      ],
    }),
    gas: MAX_GAS,
    deposit: ONE_YOCTO,
  },
  { account: signingAccount },
  ) as FinalExecutionOutcome;

  expect(result.receipts_outcome).not.toBeUndefined();
});
