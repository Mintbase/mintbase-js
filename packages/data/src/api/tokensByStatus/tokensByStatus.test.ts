/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';
import { TokensByStatus, tokensByStatus } from './tokensByStatus';

jest.mock('graphql-request');

describe('getTokensFromMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokensByStatus> => Promise.reject(errMessage),
    }));
    await expect(tokensByStatus('test.id')).rejects.toThrow(exploded);
  });

  it('should show correct values for each type', async () => {
    const unburnedTokensMock = getNodeObjectFromTokenIds(['27', '28', '30']);
    const burnedTokensMock = getNodeObjectFromTokenIds(['29']);
    const listedTokensMock = getNodeObjectFromTokenIds(['27', '28']);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<any> =>
        Promise.resolve({
          listedTokens: listedTokensMock,
          burnedTokens: burnedTokensMock,
          unburnedTokens: unburnedTokensMock,
        }),
    }));

    const { listedTokens, burnedTokens, unlistedTokens } = await tokensByStatus('test.id');
    expect(listedTokens).toStrictEqual(['27', '28']);
    expect(burnedTokens).toStrictEqual(['29']);
    expect(unlistedTokens).toStrictEqual(['30']);
  });
});

function getNodeObjectFromTokenIds(tokenIds: string[]): { nodes: { token_id: string }[] } {
  const arr: { token_id: string }[] = [];
  tokenIds.forEach((token: string) => {
    arr.push({ token_id: token });
  });
  console.log(arr, tokenIds);
  return { nodes: arr };
}
