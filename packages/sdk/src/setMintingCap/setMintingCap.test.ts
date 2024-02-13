import { mbjs } from '../config/config';
import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { setMintingCap } from './setMintingCap';


describe('set minting cap unit tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContractV2}`;

  test('set minting cap', () => {
    const args = setMintingCap({
      contractAddress,
      mintingCap: 1234,
    });

    expect(args).toEqual({
      contractAddress,
      methodName: TOKEN_METHOD_NAMES.SET_MINTING_CAP,
      args: { minting_cap: 1234 },
      deposit: ONE_YOCTO,
      gas: GAS,
    });
  });

  test('cannot set minting cap for v1 contracts', () => {
    expect(() => setMintingCap({
      contractAddress: `test.${mbjs.keys.mbContract}`,
      mintingCap: 1234,
    })).toThrow();
  });
});
