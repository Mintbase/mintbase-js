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
        ft_contract_id: null,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '2950000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with metadataId', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      metadataId: '1',
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
        ft_contract_id: null,
        metadata_id: '1',
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '2950000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with minters allowlist', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      mintersAllowlist: ['foo', 'bar'],
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
        ft_contract_id: null,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: ['foo', 'bar'],
        max_supply: null,
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '4550000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with maximum supply', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      maxSupply: 10,
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
        ft_contract_id: null,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: 10,
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '2950000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with start/expiry date', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      startsAt: new Date('2021-01-01 00:00:00'),
      expiresAt: new Date('2022-01-01 00:00:00'),
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
        ft_contract_id: null,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        starts_at: '1609455600000000000',
        expires_at: '1640991600000000000',
        is_dynamic: null,
      },
      deposit: '2950000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata which for dynamic NFTs', () => {
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      isDynamic: true,
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
        ft_contract_id: null,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        is_dynamic: true,
        starts_at: null,
        expires_at: null,
      },
      deposit: '2950000000000000000000',
      gas: GAS,
    });
  });

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
        ft_contract_id: null,
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
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '5350000000000000000000',
      gas: GAS,
    });
  });

  test('createMetadata with FT payment', () => {
    const usdcAddress = 'usdc.near';
    const args = createMetadata({
      contractAddress: contractAddress,
      metadata: { reference, media },
      price: 1,
      ftAddress: usdcAddress,
      ftDecimals: 6,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.CREATE_METADATA,
      args: {
        metadata: {
          reference: reference,
          media: media,
        },
        price: `1${'0'.repeat(6)}`,
        ft_contract_id: usdcAddress,
        metadata_id: null,
        royalty_args: null,
        minters_allowlist: null,
        max_supply: null,
        starts_at: null,
        expires_at: null,
        is_dynamic: null,
      },
      deposit: '2950000000000000000000',
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
