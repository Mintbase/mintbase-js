import { GraphQLClient } from 'graphql-request';
import { ownedTokens, OwnedTokensQueryResult } from './ownedTokens';

jest.mock('graphql-request');

describe('tokenListingCountsByMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedTokensQueryResult> => Promise.resolve({
        tokens: [{
          tokenId: 'foo',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any],
      }),
    }));
    const result = await ownedTokens('test.id', { limit: 1 });
    expect(result?.data?.length).toBeGreaterThan(0);
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedTokensQueryResult> => Promise.reject(new Error(errMessage)),
    }));

    const call = await ownedTokens('test.id', { limit: 1 });

    expect(call).toStrictEqual({ error: errMessage });

  });

});
