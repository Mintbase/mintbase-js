import { GraphQLClient } from 'graphql-request';
import { tokenOwnersByMetadataId } from './tokenOwnersByMetadataId';
import { tokenOwnersByMetadataIdMock } from './tokenOwnersByMetadataId.mock';
import { TokenOwnersByMetadataIdQueryResult } from './tokenOwnersByMetadataId.types';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');


const props = {
  metadataId: 'teammintbase.mintbase1.near:0fd038b1fc7d86de6f8c816d5669accc',
  pagination: { limit:10, offset: 0 },
  network: 'mainnet' as Network,
};


describe('getTokenOwnersByMetadataId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnersByMetadataIdQueryResult> =>
        Promise.resolve(tokenOwnersByMetadataIdMock),
    }));
    const { data, error } = await tokenOwnersByMetadataId(props);
    expect(data).toStrictEqual(tokenOwnersByMetadataIdMock);
    expect(error).toBeFalsy();
    expect(data?.mb_views_nft_tokens).toBeDefined();
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnersByMetadataIdQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenOwnersByMetadataId(props);

    expect(call).toStrictEqual({ error: errMessage });
  });
});
