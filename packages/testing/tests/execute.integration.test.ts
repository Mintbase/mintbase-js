import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { ownedTokens, Token } from '@mintbase-js/data';
import { burn, execute, mint } from '@mintbase-js/sdk';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { authenticatedKeyStore } from '../src/utils';

describe('execute integration test', () => {
  test('execute single call', async () =>{
    const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
    const signingAccount = await connect('mb_alice.testnet', keyStore);

    const result = (await execute(
      { account: signingAccount },
      mint({
        contractAddress: TEST_TOKEN_CONTRACT,
        ownerId: 'mb_bob.testnet',
        metadata: {
          reference: 'OzOg7k329BMjb-ib3AZ3cCrxf5KpChzyBAobHtulxRE',
        },
        noMedia: true,
      }),
    )) as FinalExecutionOutcome;

    expect(result.receipts_outcome).not.toBeUndefined();
  });


  test('execute with multiple methods and composition', async () => {
    const account = 'mb_alice.testnet';
    const keyStore = await authenticatedKeyStore([account]);
    const signingAccount = await connect(account, keyStore);
    const { data: tokens } = await ownedTokens(account, { limit: 10 }) as { data: Token[] };

    if (tokens.length < 2) {
      throw `${account} needs more tokens to burn to run this test..`;
    }

    const [tokenToBurnOne, tokenToBurnTwo] = tokens;

    const burnCall1 = burn({
      contractAddress: tokenToBurnOne.contractId,
      tokenIds: [tokenToBurnOne.tokenId],
    });

    const burnCall2 = burn({
      contractAddress: tokenToBurnTwo.contractId,
      tokenIds: [tokenToBurnTwo.tokenId],
    });

    const mintCall = mint({
      contractAddress: TEST_TOKEN_CONTRACT,
      ownerId: 'mb_alice.testnet',
      metadata: {
        reference: 'OzOg7k329BMjb-ib3AZ3cCrxf5KpChzyBAobHtulxRE',
      },
      noMedia: true,
    });

    const composed = [mintCall, mintCall];

    const result = await execute(
      { account: signingAccount },
      burnCall1,
      ...composed,
      burnCall2,
    ) as FinalExecutionOutcome;

    expect(result[0].receipts_outcome).not.toBeUndefined();
    expect(result[1].receipts_outcome).not.toBeUndefined();
    expect(result[2].receipts_outcome).not.toBeUndefined();
    expect(result[3].receipts_outcome).not.toBeUndefined();
  });
});
