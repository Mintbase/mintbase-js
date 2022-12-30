/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLClient } from 'graphql-request';
import { tokensByStatus } from './tokensByStatus';
import { TOKEN_RESULT_MOCK }  from './tokenByStatus.mock';
import { TokenByStatusQueryResults, TokensByStatus } from './tokenByStatus.types';

jest.mock('graphql-request');

describe('getTokensFromMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  // it('should handle errors', async () => {
  //   const errMessage = 'exploded';
  //   const exploded = new GraphqlFetchingError(errMessage);
  //   (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
  //     request: (): Promise<TokensByStatus> => Promise.reject(errMessage),
  //   }));
  //   await expect(tokensByStatus('test.id')).rejects.toThrow(exploded);
  // });


  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokensByStatus> => Promise.reject(new Error(errMessage)),
    }));

    const call = await tokensByStatus('test.id');

    expect(call).toStrictEqual({ error: errMessage });

  });

  it('should show correct values for each type', async () => {
  
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: (): Promise<TokenByStatusQueryResults> =>
        Promise.resolve(TOKEN_RESULT_MOCK),
    }));

    const { data } = await tokensByStatus('test.id');

    const { listedTokens, burnedTokens, unlistedTokens } = data as TokensByStatus;

    expect(listedTokens).toStrictEqual([TOKEN_RESULT_MOCK.listedTokens.nodes[0].token_id]);
    expect(burnedTokens).toStrictEqual([TOKEN_RESULT_MOCK.burnedTokens.nodes[0].token_id]);
    expect(unlistedTokens).toStrictEqual([TOKEN_RESULT_MOCK.unburnedTokens.nodes[0].token_id, TOKEN_RESULT_MOCK.unburnedTokens.nodes[1].token_id]);
  });
});
