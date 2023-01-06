import { GraphQLClient } from 'graphql-request';
import { tokenMetadata } from './tokenMetadata';
import { TokenMetadataQueryResult } from './tokenMetadata.type';
import { tokenMetadataMock } from './tokenMetadata.mock';

jest.mock('graphql-request');

describe('getTokenOwnerByTokenIdAndContractId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenMetadataQueryResult> =>
        Promise.resolve(tokenMetadataMock),
    }));
    const result = await tokenMetadata('test.id', 'contract.id');
    expect(result?.data).toStrictEqual(tokenMetadataMock);
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenMetadataQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenMetadata('test.id', 'contract.id');

    expect(call).toStrictEqual({ error: errMessage });
  });
});
