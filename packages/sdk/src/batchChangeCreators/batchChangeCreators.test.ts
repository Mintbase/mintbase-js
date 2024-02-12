/* eslint-disable @typescript-eslint/camelcase */
import { batchChangeCreators } from './batchChangeCreators';
import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';

describe('batch change minters tests', () => {
  const contractAddress = 'test.nft.contract';
  const minter = ['test'];
  const manyMinters = ['test', 'test2', 'test3'];
  const otherManyMinters = ['test4', 'test5'];


  test('batch add and remove one minter', () => {
    const args = batchChangeCreators({
      contractAddress: contractAddress,
      addCreators: minter,
      removeCreators: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_CREATORS,
      args: {
        grant: minter,
        revoke: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
  test('batch add one minter', () => {
    const args = batchChangeCreators({
      contractAddress: contractAddress,
      addCreators: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_CREATORS,
      args: {
        grant: minter,
        revoke: undefined,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('batch remove one minter', () => {
    const args = batchChangeCreators({
      contractAddress: contractAddress,
      removeCreators: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_CREATORS,
      args: {
        grant: undefined,
        revoke: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('batch add and remove multiple minters', () => {
    const args = batchChangeCreators({
      contractAddress: contractAddress,
      addCreators: manyMinters,
      removeCreators: otherManyMinters,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_CREATORS,
      args: {
        grant: manyMinters,
        revoke: otherManyMinters,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('expect throw', () => {

    expect(()=> batchChangeCreators({
      contractAddress: contractAddress,
    })).toThrow();
  });

});
