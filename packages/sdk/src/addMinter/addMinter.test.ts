/* eslint-disable @typescript-eslint/camelcase */
import { addMinter } from '../addMinter/addMinter';
import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';

describe('add minter unit tests', () => {
  const contractAddress = 'test.nft.contract';
  const minter = 'test';


  test('add minter', () => {
    const args = addMinter({
      contractAddress: contractAddress,
      minterId: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: [minter],
        revoke: undefined,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
});
