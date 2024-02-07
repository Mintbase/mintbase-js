import { GAS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES } from '../types';
import { createMetadata } from './createMetadata';
import { mbjs } from '../config/config';

describe('createMetadata method tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContractV2}`;
  // const contractAddressV2 = 'test.mintbase2.near';
  const reference = 'test';
  const media = 'test';

  test('createMetadata without options', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      price: 1,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.CREATE_METADATA,
      args: {
        metadata: {
          reference: reference,
          media: media,
        },
        price: `1${'0'.repeat(24)}`,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        last_possible_mint: null,
      },
      deposit: '7470000000000000000000',
      gas: GAS,
    });
  });

  // TODO: test new features
  test('createMetadata with floating point royalties and amount', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      royalties: { test: 0.23, test1: 0.12654, test2: 0.04421 },
      price: 1,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.CREATE_METADATA,
      args: {
        metadata: {
          reference: reference,
          media: media,
        },
        price: `1${'0'.repeat(24)}`,
        metadata_id: null,
        royalty_args: {
          percentage: 4008,
          split_between: {
            test: 5739,
            test1: 3158,
            test2: 1103,
          },
        },
        minters_allowlist: null,
        max_supply: null,
        last_possible_mint: null,
      },
      deposit: '9870000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with too many royalties', () => {
    expect(() => {
      createMetadata({
        contractAddress: contractAddress,
        metadata: { reference, media },
        royalties: { test: 0.3, test1: 0.25 },
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  });

  test('createMetadata with no reference', () => {
    expect(() => {
      createMetadata({
        contractAddress: contractAddress,
        metadata: { media },
        royalties: { test: 0.3, test1: 0.25 },
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.NO_REFERENCE);
  });

  test('createMetadata with no media', () => {
    expect(() => {
      createMetadata({
        contractAddress: contractAddress,
        metadata: { reference },
        royalties: { test: 0.3, test1: 0.25 },
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.NO_MEDIA);
  });

  test('createMetadata with negative royalties', () => {
    expect(() => {
      createMetadata({
        contractAddress: contractAddress,
        metadata: { reference, media },
        royalties: { test: -0.3, test1: 0.4 },
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.NEGATIVE_ROYALTIES);
  });
});
