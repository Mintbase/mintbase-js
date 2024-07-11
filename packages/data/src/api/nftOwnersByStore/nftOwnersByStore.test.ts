import { GraphQLClient } from 'graphql-request';
import { nftOwnersByStore } from './nftOwnersByStore';
import { NftOwnersByStoreQueryResult } from './nftOwnersByStore.types';

jest.mock('graphql-request');

describe('getMetadataByMetadataId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<NftOwnersByStoreQueryResult> =>
        Promise.resolve({
          nft_tokens: [{ owner: 'owner1.near' }, { owner: 'owner2.near' }],
        }),
    }));

    const result = await nftOwnersByStore('test');
    expect(result?.data).toStrictEqual(['owner1.near', 'owner2.near']);
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<NftOwnersByStoreQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await nftOwnersByStore('test');

    expect(call).toStrictEqual({ error: errMessage });
  });
});
