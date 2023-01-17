import { GraphQLClient } from 'graphql-request';
import { metadataByMetadataId } from './metadataByMetadataId';
import { metadataByMetadataIdMock } from './metadataByMetadataId.mock';
import { MetadataByMetadataIdQueryResult } from './metadataByMetadataId.types';

jest.mock('graphql-request');

describe('getMetadataByMetadataId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<MetadataByMetadataIdQueryResult> =>
        Promise.resolve(metadataByMetadataIdMock),
    }));
    const result = await metadataByMetadataId('test');
    expect(result?.data).toStrictEqual(metadataByMetadataIdMock);
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<MetadataByMetadataIdQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await metadataByMetadataId('test');

    expect(call).toStrictEqual({ error: errMessage });
  });
});
