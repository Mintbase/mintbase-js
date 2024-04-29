import { GAS, MAX_GAS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { FT_METHOD_NAMES, TOKEN_METHOD_NAMES } from '../types';
import { mintOnMetadata } from './mintOnMetadata';
import { mbjs } from '../config/config';

describe('mintOnMetadata method tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContractV2}`;
  // const contractAddressV2 = 'test.mintbase2.near';
  const ownerId = 'test';

  test('mintOnMetadata without options', () => {
    const args = mintOnMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
      ownerId,
      price: 1,
    });

    expect(args).toEqual([
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.DEPOSIT_STORAGE,
        args: {},
        deposit: '7120000000000000000000',
        gas: GAS,
      },
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.MINT_ON_METADATA,
        args: {
          metadata_id: '1',
          owner_id: ownerId,
          num_to_mint: 1,
          token_ids: null,
        },
        deposit: '1000000000000000000000000',
        gas: GAS,
      },
    ]);
  });

  test('mintOnMetadata with amount', () => {
    const args = mintOnMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
      ownerId,
      amount: 5,
      price: 1,
    });

    expect(args).toEqual([
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.DEPOSIT_STORAGE,
        args: {},
        deposit: '27920000000000000000000',
        gas: GAS,
      },
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.MINT_ON_METADATA,
        args: {
          metadata_id: '1',
          owner_id: ownerId,
          num_to_mint: 5,
          token_ids: null,
        },
        deposit: '5000000000000000000000000',
        gas: GAS,
      },
    ]);
  });

  test('mintOnMetadata with specified token IDs', () => {
    const args = mintOnMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
      ownerId,
      tokenIds: ['1', '2'],
      price: 1,
    });

    expect(args).toEqual([
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.DEPOSIT_STORAGE,
        args: {},
        deposit: '12320000000000000000000',
        gas: GAS,
      },
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.MINT_ON_METADATA,
        args: {
          metadata_id: '1',
          owner_id: ownerId,
          num_to_mint: null,
          token_ids: ['1', '2'],
        },
        deposit: '2000000000000000000000000',
        gas: GAS,
      },
    ]);
  });

  test('mintOnMetadata with amount/token ID length mismatch', () => {
    expect(() => {
      mintOnMetadata({
        contractAddress: contractAddress,
        metadataId: '1',
        ownerId,
        amount: 2,
        tokenIds: ['1', '2', '3'],
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.MUTUAL_EXCLUSIVE_AMOUNT);
  });

  test('mintOnMetadata with empty token IDs', () => {
    expect(() => {
      mintOnMetadata({
        contractAddress: contractAddress,
        metadataId: '1',
        ownerId,
        tokenIds: [],
        price: 1,
      });
    }).toThrow(ERROR_MESSAGES.EMPTY_TOKEN_IDS);
  });

  test('mintOnMetadata using FT', () => {
    const usdcAddress = 'wnear.near';
    const usdcDecimals = 6;
    const args = mintOnMetadata({
      contractAddress: contractAddress,
      metadataId: '1',
      ownerId,
      price: 1,
      ftAddress: usdcAddress,
      ftDecimals: usdcDecimals,
    });

    expect(args).toEqual([
      {
        contractAddress: contractAddress,
        methodName: TOKEN_METHOD_NAMES.DEPOSIT_STORAGE,
        args: {},
        deposit: '7120000000000000000000',
        gas: GAS,
      },
      {
        contractAddress: usdcAddress,
        methodName: FT_METHOD_NAMES.FT_TRANSFER_CALL,
        args: {
          receiver_id: contractAddress,
          amount: `1${'0'.repeat(6)}`,
          msg: JSON.stringify({
            metadata_id: '1',
            owner_id: ownerId,
            num_to_mint: 1,
            token_ids: null,
          }),
          memo: null,
        },
        deposit: '1',
        gas: MAX_GAS,
      },
    ]);
  });

});
