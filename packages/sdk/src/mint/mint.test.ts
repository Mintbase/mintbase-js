import { GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { TOKEN_METHOD_NAMES } from '../types';
import { mint } from './mint';

describe('mint method tests', () => {
  const contractAddress = 'test.nft.contract';
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
        num_to_mint:  1,
        royalty_args: null,
        token_ids_to_mint: null,
      },
      deposit: '5750000000000000000000',
      gas: GAS,
    });
  });

  test('mint with options', () => {
    const args = mint({
      contractAddress: contractAddress,
      metadata: { reference, media },
      ownerId: ownerId,
      royalties: { test: 0.25, test1: 0.25 },
      tokenIdsToMint: [123, 456],
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
        num_to_mint:  2,
        royalty_args: {
          percentage: 5000,
          split_between: {
            test: 5000,
            test1: 5000,
          },
        },
        token_ids_to_mint: [123, 456],
      },
      deposit: '14150000000000000000000',
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
        tokenIdsToMint: [123, 456],
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
        tokenIdsToMint: [123, 456],
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
        tokenIdsToMint: [123, 456],
      });
    }).toThrow(ERROR_MESSAGES.NO_MEDIA);
  });

  test('mint with negative royalties', () => {
    expect(() => {
      mint({
        contractAddress: contractAddress,
        metadata: { reference, media },
        ownerId: ownerId,
        royalties: { test: -0.3, test1: 0.4 },
        tokenIdsToMint: [123, 456],
      });
    }).toThrow(ERROR_MESSAGES.NEGATIVE_ROYALTIES);
  });


});
