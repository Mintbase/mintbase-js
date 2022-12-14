import { TEST_TOKEN_CONTRACT } from '../../src/constants';
import { burn, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { tokensByStatus } from '@mintbase-js/data/src/api/tokensByStatus/tokensByStatus';
import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { ownedTokens } from '@mintbase-js/data';

test('burn token', async () => {
  const accounts = ['mb_alice.testnet', 'mb_bob.testnet'];
  const burnFromIndex = Math.random() > 0.5 ? 1 : 0;
  const accountToBurnFrom = accounts[burnFromIndex];
  const keyStore = await authenticatedKeyStore([accountToBurnFrom]);
  const signingAccount = await connect(accountToBurnFrom, keyStore);
  const token = await ownedTokens(accountToBurnFrom, { limit: 1 });

  if (!token) {
    throw `${accountToBurnFrom} ran out of owned tokens to burn! Mint some more...`;
  }
  const { listedTokens, unlistedTokens } = await tokensByStatus(
    token[0].metadataId,
    accountToBurnFrom,
  );

  const tokenToBurn: string[] = [];

  if (unlistedTokens.length > 0) {
    tokenToBurn.push(unlistedTokens[0]);
  } else if (listedTokens.length > 0) {
    tokenToBurn.push(listedTokens[0]);
  }
  if (tokenToBurn.length < 0) {
    console.error('No unburned tokens for burn integration test');
    return;
  }

  const result = (await execute(  
    { account: signingAccount },
    burn({
      nftContractId: TEST_TOKEN_CONTRACT,
      tokenIds: tokenToBurn,
    }),
  ));

});
