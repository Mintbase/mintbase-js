import { GAS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES } from '../types';
import { mint } from './mint';
import { mbjs } from '../config/config';

describe('mint method tests', () => {
  const contractAddress = `test.${mbjs.keys.mbContract}`;
  const reference = 'test';
  const media = 'test';
  const ownerId = 'test';

  test('mint without options', () => {
    const args = mint({
      contractAddress: contractAddress,
      metadata: { reference, media },
      ownerId: ownerId,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.MINT,
      args: {
        owner_id: ownerId,
        metadata: {
          reference: reference,
          media: media,
        },
        num_to_mint: 1,
        royalty_args: null,
      },
      deposit: '7470000000000000000000',
      gas: GAS,
    });
  });

  test('mint with floating point royalties and amount', () => {
    const args = mint({
      contractAddress: contractAddress,
      metadata: { reference, media },
      ownerId: ownerId,
      royalties: { test: 0.23, test1: 0.12654, test2: 0.04421 },
      amount: 2,
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.MINT,
      args: {
        owner_id: ownerId,
        metadata: {
          reference: reference,
          media: media,
        },
        num_to_mint: 2,
        royalty_args: {
          percentage: 4008,
          split_between: {
            test: 5739,
            test1: 3158,
            test2: 1103,
          },
        },
      },
      deposit: '15070000000000000000000',
      gas: GAS,
    });
  });

  test('mint with flaoting point royalties without amount or specifying tokenIds', () => {
    const args = mint({
      contractAddress: contractAddress,
      metadata: { reference, media },
      ownerId: ownerId,
      royalties: { test: 0.23, test1: 0.12654, test2: 0.04421 },
    });

    expect(args).toEqual({
      contractAddress: contractAddress,
      methodName: TOKEN_METHOD_NAMES.MINT,
      args: {
        owner_id: ownerId,
        metadata: {
          reference: reference,
          media: media,
        },
        num_to_mint: 1,
        royalty_args: {
          percentage: 4008,
          split_between: {
            test: 5739,
            test1: 3158,
            test2: 1103,
          },
        },
      },
      deposit: '9870000000000000000000',
      gas: GAS,
    });
  });

  test('mint with too many royalties', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { reference, media },
        ownerId: ownerId,
        royalties: { test: 0.3, test1: 0.25 },
      });
    }).toThrow(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  });

  test('mint with no reference', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { media },
        ownerId: ownerId,
        royalties: { test: 0.3, test1: 0.25 },
      });
    }).toThrow(ERROR_MESSAGES.NO_REFERENCE);
  });

  test('mint with no media', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { reference },
        ownerId: ownerId,
        royalties: { test: 0.3, test1: 0.25 },
      });
    }).toThrow(ERROR_MESSAGES.NO_MEDIA);
  });

  test('mint with invalid amount', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { reference },
        noMedia: true,
        noReference: true,
        ownerId: ownerId,
        royalties: { test: 0.2, test1: 0.25 },
        amount: -2,
      });
    }).toThrow(ERROR_MESSAGES.INVALID_AMOUNT);
  });

  test('mint with negative royalties', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { reference, media },
        ownerId: ownerId,
        royalties: { test: -0.3, test1: 0.4 },
      });
    }).toThrow(ERROR_MESSAGES.NEGATIVE_ROYALTIES);
  });
});
