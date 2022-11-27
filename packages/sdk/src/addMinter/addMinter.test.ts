/* eslint-disable @typescript-eslint/camelcase */
import { addMinter } from '../addMinter/addMinter';
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';

describe('add minter unit tests', () => {
  const nftContractId = 'test.nft.contract';
  const minter = 'test';


  test('add minter', () => {
    const args = addMinter({
      nftContractId: nftContractId,
      minterId: minter,
    });
  
    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.ADD_MINTER,
      args: {
        account_id: minter,
      },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });
});
