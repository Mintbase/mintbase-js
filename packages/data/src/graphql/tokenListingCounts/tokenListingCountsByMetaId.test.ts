import { tokenListingCountsByMetaId, TokenListingQueryResults } from './tokenListingCountsByMetaId';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../fetch';

jest.mock('graphql-request');

const METADATA_ID_FOR_TEST = 'run.mintbase1.near:7517c09a546d39cdbbd12e07a8c1de8f';

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
    await expect(tokenListingCountsByMetaId(METADATA_ID_FOR_TEST))
      .rejects
      .toThrow(exploded);
  });

  it('should use the upper bound of token counts for display', async () => {
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

    const result = await tokenListingCountsByMetaId(METADATA_ID_FOR_TEST);
    expect(result.displayTotalListings).toBe(1);

  });
});
