/* eslint-disable @typescript-eslint/camelcase */
import { batchChangeMinters } from './batchChangeMinters';
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';

describe('batch change minters tests', () => {
  const nftContractId = 'test.nft.contract';
  const minter = ['test'];
  const manyMinters = ['test', 'test2', 'test3'];
  const otherManyMinters = ['test4', 'test5'];


  test('batch add and remove one minter', () => {
    const args = batchChangeMinters({
      nftContractId: nftContractId,
      addMinters: minter,
      removeMinters: minter,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: minter,
        revoke: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
  test('batch add one minter', () => {
    const args = batchChangeMinters({
      nftContractId: nftContractId,
      addMinters: minter,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: minter,
        revoke: undefined,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('batch remove one minter', () => {
    const args = batchChangeMinters({
      nftContractId: nftContractId,
      removeMinters: minter,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: undefined,
        revoke: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('batch add and remove multiple minters', () => {
    const args = batchChangeMinters({
      nftContractId: nftContractId,
      addMinters: manyMinters,
      removeMinters: otherManyMinters,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: manyMinters,
        revoke: otherManyMinters,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('expect throw', () => {

    expect(()=> batchChangeMinters({
      nftContractId: nftContractId,
    })).toThrow();
  });

});
