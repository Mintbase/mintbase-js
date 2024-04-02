import { transferContractOwnership } from '@mintbase-js/sdk/src/transferContractOwnership/transferContractOwnership';
import { execute } from '@mintbase-js/sdk/src';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { gql } from 'graphql-request';
import { fetchGraphQl } from '../../../data/src/graphql/fetch';

test('transfer contract ownership', async () => {
  const bob = 'mb_bob.testnet';
  const alice = 'mb_alice.testnet';
  const aliceKey = await authenticatedKeyStore([alice]);
  const bobKey = await authenticatedKeyStore([bob]);
  const aliceAccount = await connect(alice, aliceKey);
  const bobAccount = await connect(bob, bobKey);

  // maybe move this into mb-data if this query provides further utility
  const { data } = await fetchGraphQl<{ nft_contracts: Array<{ owner_id: string }> }>({
    query: gql`query MyQuery {
      nft_contracts(where: {id: {_eq: "qrq9m4sfaf.mintspace2.testnet"}}) {
        owner_id
      }
    }`,
  });

  if (data?.nft_contracts[0]?.owner_id === 'mb_alice.testnet') {
    const aliceToBob = (await execute(
      { account: aliceAccount },
      transferContractOwnership({
        contractAddress: 'qrq9m4sfaf.mintspace2.testnet',
        nextOwner: bob,
      }),
    ))  as FinalExecutionOutcome;
    expect(aliceToBob.receipts_outcome).not.toBeUndefined();
  } else {

    const bobToAlice = (await execute(
      { account: bobAccount },
      transferContractOwnership({
        contractAddress: 'qrq9m4sfaf.mintspace2.testnet',
        nextOwner: alice,
      }),
    )) as FinalExecutionOutcome;

    expect(bobToAlice.receipts_outcome).not.toBeUndefined();
  }
});
