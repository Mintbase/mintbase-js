import { tokenListingCountsByMetaId, TokenListingQueryResults } from './tokenListingCountsByMetaId';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('tokenListingCountsByMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenListingQueryResults> => Promise.reject(errMessage),
    }));
    await expect(tokenListingCountsByMetaId('test.id'))
      .rejects
      .toThrow(exploded);
  });

  it('should use the upper bound of token counts for display', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const makeAggregate = (val: string): any => ({
      aggregate: {
        count: val,
      },
    });

    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenListingQueryResults> => Promise.resolve({
        tokensCount: makeAggregate('1'),
        simpleListingsCount: makeAggregate('1'),
        auctionListingsCount: makeAggregate('1'),
      }),
    }));

    const result = await tokenListingCountsByMetaId('test.id');
    expect(result.displayTotalListings).toBe(1);

  });
});
