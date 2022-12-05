/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { mint, MintOptions } from './mint';

describe('mint method tests', () => {
  const nftContractId = 'test.nft.contract';
  const reference = 'test';
  const ownerId = 'test';
  const options = {
    splits: { test: 0.5, test2: 0.5 },
    amount: 2,
    royaltyPercentage: 0.5,
  };

  const optionsWithInvalidPercentage = {
    splits: { test: 2 },
    amount: 2,
    royaltyPercentage: 1,
  };

  const optionsWithInvalidAmount = {
    splits: { test: 2 },
    amount: 300,
    royaltyPercentage: 0.5,
  };

  const optionsWithInvalidSplits: MintOptions =  {
    splits:{
      test0: 0,
      test1: 1,
      test2: 2,
      test3: 3,
      test4: 4,
      test5: 5,
      test6: 6,
      test7: 7,
      test8: 8,
      test9: 9,
      test10: 10,
      test11: 11,
      test12: 12,
      test13: 13,
      test14: 14,
      test15: 15,
      test16: 16,
      test17: 17,
      test18: 18,
      test19: 19,
      test20: 20,
      test21: 21,
      test22: 22,
      test23: 23,
      test24: 24,
      test25: 25,
      test26: 26,
      test27: 27,
      test28: 28,
      test29: 29,
      test30: 30,
      test31: 31,
      test32: 32,
      test33: 33,
      test34: 34,
      test35: 35,
      test36: 36,
      test37: 37,
      test38: 38,
      test39: 39,
      test40: 40,
      test41: 41,
      test42: 42,
      test43: 43,
      test44: 44,
      test45: 45,
      test46: 46,
      test47: 47,
      test48: 48,
      test49: 49,
      test50: 50,
      test51: 51,
    }, 
    amount: 1,
    royaltyPercentage: 0.5,
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
          percentage: 5000,
          split_between: {
            test: 5000,
            test2: 5000,
          },
        },
        split_owners: {
          test: 5000,
          test2: 5000,
        },
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('mint with invalid percentage', () => {
    expect(()=> mint({
      nftContractId: nftContractId,
      reference: reference,
      ownerId: ownerId,
      options: optionsWithInvalidPercentage,
    })).toThrow();

  });

  test('mint with invalid amount', () => {
    
    expect(()=> mint({
      nftContractId: nftContractId,
      reference: reference,
      ownerId: ownerId,
      options: optionsWithInvalidAmount,
    })).toThrow();


  });

  test('mint with invalid splits', () => {
 
    expect((() => mint({
      nftContractId: nftContractId,
      reference: reference,
      ownerId: ownerId,
      options: optionsWithInvalidSplits,
    }))).toThrow();
  });
});
