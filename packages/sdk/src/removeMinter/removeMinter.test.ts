/* eslint-disable @typescript-eslint/camelcase */
import { removeMinter } from '../removeMinter/removeMinter';
import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';

describe('remove minter unit tests', () => {
  const contractAddress = 'test.nft.contract';
  const minter = 'test';


  test('remove minter', () => {
    const args = removeMinter({
      contractAddress: contractAddress,
      minterId: minter,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_CHANGE_MINTERS,
      args: {
        grant: undefined,
        revoke: [minter],
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
});
