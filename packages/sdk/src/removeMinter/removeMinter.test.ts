/* eslint-disable @typescript-eslint/camelcase */
import { removeMinter } from '../removeMinter/removeMinter';
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';

describe('remove minter unit tests', () => {
  const nftContractId = 'test.nft.contract';
  const minter = 'test';


  test('remove minter', () => {
    const args = removeMinter({
      nftContractId: nftContractId,
      minterId: minter,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.REMOVE_MINTER,
      args: {
        account_id: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
});
