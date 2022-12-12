import { transferContractOwnership } from '@mintbase-js/sdk/src/transferContractOwnership/transferContractOwnership';
import { ONE_YOCTO } from '@mintbase-js/sdk/src';
import { execute } from '@mintbase-js/sdk/src';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { GAS } from '@mintbase-js/sdk';
import { gql } from 'graphql-request';
import { fetchGraphQl } from '../../../data/src/graphql/fetch';

test('transfer contract ownership', async () => {
  const bob = 'mb_bob.testnet';
  const alice = 'mb_alice.testnet';
  const aliceKey = await authenticatedKeyStore([alice]);
  const bobKey = await authenticatedKeyStore([bob]);
  const aliceAccount = await connect(alice, aliceKey);
  const bobAccount = await connect(bob, bobKey);

  //maybe move this into mb-data if this query provides further utility
  const { data } = await fetchGraphQl<any>({
    query: gql`query MyQuery {
      nft_contracts(where: {id: {_eq: "qrq9m4sfaf.mintspace2.testnet"}}) {
        owner_id
      }
    }`,
  });
  
  if (data.nft_contracts[0].owner_id == 'mb_alice.testnet') {
    const aliceToBob = (await execute(
      {
        ...transferContractOwnership({
          contractId: 'qrq9m4sfaf.mintspace2.testnet',
          nextOwner: bob,
        }),
        gas: GAS,
        deposit: ONE_YOCTO,
      },
      { account: aliceAccount },
    ))  as FinalExecutionOutcome;
    expect(aliceToBob.receipts_outcome).not.toBeUndefined();
  } else {

    const bobToAlice = (await execute(
      transferContractOwnership({
        contractId: 'qrq9m4sfaf.mintspace2.testnet',
        nextOwner: alice,
      }),  
      { account: bobAccount },
    )) as FinalExecutionOutcome;

    expect(bobToAlice.receipts_outcome).not.toBeUndefined();
  }
});

