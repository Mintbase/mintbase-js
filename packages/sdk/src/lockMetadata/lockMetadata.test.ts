import { GAS } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { lockMetadata } from './lockMetadata';
import { mbjs } from '../config/config';

describe('updateMetadata method tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContractV2}`;

  test('updateMetadata without options', () => {
    const args = lockMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.LOCK_METADATA,
      args: {
        metadata_id: '1',
      },
      deposit: '1',
      gas: GAS,
    });
  });
});
