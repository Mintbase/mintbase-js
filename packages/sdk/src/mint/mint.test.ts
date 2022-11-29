/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { mint } from './mint';

describe('burn method calls', () => {
  const nftContractId = 'test.nft.contract';
  const reference = 'test';
  const ownerId = 'test';
  const options = {
    royalties: { 'test': 2 },
    splits: { 'test': 2 },
    amount: 2,
    royaltyPercentage: 2,
  };

  
  test('mint without options', () => {
    const args = mint({
      nftContractId: nftContractId,
      reference: reference,
      ownerId: ownerId,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.MINT,
      args: {
        owner_id: ownerId,
        metadata: {
          reference: reference,
        },
        num_to_mint:  1,
        royalty_args: null,
        split_owners: null,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
  test('mint with options', () => {
    const args = mint({
      nftContractId: nftContractId,
      reference: reference,
      ownerId: ownerId,
      options: options,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.MINT,
      args: {
        owner_id: ownerId,
        metadata: {
          reference: reference,
        },
        num_to_mint:  2,
        royalty_args: {
          percentage: 2,
          split_between: {
            test: 2,
          },
        },
        split_owners: {
          test: 2,
        },
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
});
