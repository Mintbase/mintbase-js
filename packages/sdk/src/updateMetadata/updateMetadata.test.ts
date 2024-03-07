import { GAS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES } from '../types';
import { updateMetadata } from './updateMetadata';
import { mbjs } from '../config/config';

describe('updateMetadata method tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContractV2}`;
  // const contractAddressV2 = 'test.mintbase2.near';
  const ownerId = 'test';

  test('updateMetadata without options', () => {
    const args = updateMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
      metadata: {reference: "foo", media: "bar"},
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.UPDATE_METADATA,
      args: {
        metadata_id: '1',
        metadata: {reference: "foo", media: "bar"},
      },
      deposit: '1',
      gas: GAS,
    });
  });

  test('updateMetadata with no reference', () => {
    expect(() => {
      updateMetadata({
        contractAddress: contractAddress,
        metadataId: "1",
        metadata: { media: "foo" },
      });
    }).toThrow(ERROR_MESSAGES.NO_REFERENCE);
  });

  test('updateMetadata with no media', () => {
    expect(() => {
      updateMetadata({
        contractAddress: contractAddress,
        metadataId: "1",
        metadata: { reference: "foo" },
      });
    }).toThrow(ERROR_MESSAGES.NO_MEDIA);
  });
});
