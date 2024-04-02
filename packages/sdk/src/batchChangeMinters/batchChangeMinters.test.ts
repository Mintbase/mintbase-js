import { batchChangeMinters } from './batchChangeMinters';
import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { mbjs } from '../config/config';

describe('batch change minters tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContract}`;
  const minter = ['test'];
  const manyMinters = ['test', 'test2', 'test3'];
  const otherManyMinters = ['test4', 'test5'];


  test('batch add and remove one minter', () => {
    const args = batchChangeMinters({
      contractAddress: contractAddress,
      addMinters: minter,
      removeMinters: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
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
      contractAddress: contractAddress,
      addMinters: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
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
      contractAddress: contractAddress,
      removeMinters: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
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
      contractAddress: contractAddress,
      addMinters: manyMinters,
      removeMinters: otherManyMinters,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
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
      contractAddress: contractAddress,
    })).toThrow();
  });

});
