import { connect, FinalExecutionOutcome } from '@mintbase-js/auth';
import { ownedTokens, tokensByStatus } from '@mintbase-js/data';
import { burn, ContractCall, execute, mint, NearContractCall } from '@mintbase-js/sdk';
import { TEST_TOKEN_CONTRACT } from '../src/constants';
import { authenticatedKeyStore } from '../src/utils';

describe('execute integration test', () => {
  test('execute single call', async () =>{
    const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
    const signingAccount = await connect('mb_alice.testnet', keyStore);
  
    const result = (await execute(
      { account: signingAccount },
      mint({
        nftContractId: TEST_TOKEN_CONTRACT,
        ownerId: 'mb_bob.testnet',
        reference: 'https://arweave.net/OzOg7k329BMjb-ib3AZ3cCrxf5KpChzyBAobHtulxRE',
      }),
    )) as FinalExecutionOutcome;
  
    expect(result.receipts_outcome).not.toBeUndefined();
  });


  test('execute with multiple methods and composition', async () => {
    const account = 'mb_alice.testnet';
    const keyStore = await authenticatedKeyStore([account]);
    const signingAccount = await connect(account, keyStore);
    const token = await ownedTokens(account, { limit: 1 });
  
    if (!token) {
      throw `${account} ran out of owned tokens to burn! Mint some more...`;
    }
    const { listedTokens, unlistedTokens } = await tokensByStatus(
      token[0].metadataId,
      account,
    );
  
    const tokensToBurn: string[] = [];
  
    if (unlistedTokens.length > 1) {
      tokensToBurn.push(unlistedTokens[0]);
      tokensToBurn.push(unlistedTokens[1]);
    } 

    if (tokensToBurn.length < 1) {
      console.error('No unburned tokens for burn integration test, mint some more');
      return;
    }
    
    const burnCall1 = burn({
      nftContractId: TEST_TOKEN_CONTRACT,
      tokenIds: [tokensToBurn[0]],
    });

    const burnCall2 = burn({
      nftContractId: TEST_TOKEN_CONTRACT,
      tokenIds: [tokensToBurn[1]],
    });
    

    const mintCall = mint({
      nftContractId: TEST_TOKEN_CONTRACT,
      ownerId: 'mb_bob.testnet',
      reference: 'https://arweave.net/OzOg7k329BMjb-ib3AZ3cCrxf5KpChzyBAobHtulxRE',
    });
    
    const composed: NearContractCall  = [mintCall, mintCall] as ContractCall[];

    const result = (await execute(  
      { account: signingAccount },
      burnCall1, composed, burnCall2,
      
    )) as FinalExecutionOutcome;
  
    expect(result[0].receipts_outcome).not.toBeUndefined();
    expect(result[1].receipts_outcome).not.toBeUndefined();
    expect(result[2].receipts_outcome).not.toBeUndefined();
    expect(result[3].receipts_outcome).not.toBeUndefined();
  
  });
});
