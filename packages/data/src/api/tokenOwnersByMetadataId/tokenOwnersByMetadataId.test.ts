import { GraphQLClient } from 'graphql-request';
import { tokenOwnersByMetadataId } from './tokenOwnersByMetadataId';
import { tokenOwnersByMetadataIdMock } from './tokenOwnersByMetadataId.mock';
import { TokenOwnersByMetadataIdQueryResult } from './tokenOwnersByMetadataId.types';

jest.mock('graphql-request');

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
    const { data, error } = await tokenOwnersByMetadataId('teammintbase.mintbase1.near:0fd038b1fc7d86de6f8c816d5669accc', { limit: 2 } );
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

    const call = await tokenOwnersByMetadataId('test');

    expect(call).toStrictEqual({ error: errMessage });
  });
});
