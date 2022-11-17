import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';
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
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedTokensQueryResult> => Promise.reject(errMessage),
    }));
    await expect(ownedTokens('test.id', { limit: 1 }))
      .rejects
      .toThrow(exploded);
  });
});
