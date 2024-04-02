import { GraphQLClient } from 'graphql-request';
import { tokensByStatus, tokensByStatusThrowOnError } from './tokensByStatus';
import { TOKEN_RESULT_MOCK }  from './tokenByStatus.mock';
import { TokenByStatusQueryResults, TokensByStatus } from './tokenByStatus.types';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');

const props = {
  metadataId: 'dogeflower.mintbase1.near%3A5ef2d9b0651172d90dc173af0726b5fc',
  ownedBy: 'maxknivets.near',
  network: 'mainnet' as Network,
};

describe('getTokensFromMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokensByStatus> => Promise.reject(new Error(errMessage)),
    }));

    const call = await tokensByStatus({ metadataId: props.metadataId });

    expect(call).toStrictEqual({ error: errMessage });

  });

  it('should show correct values for each type', async () => {

    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: (): Promise<TokenByStatusQueryResults> =>
        Promise.resolve(TOKEN_RESULT_MOCK),
    }));

    const { data } = await tokensByStatus({ metadataId: props.metadataId });

    const { listedTokens, burnedTokens, unlistedTokens } = data as TokensByStatus;

    expect(listedTokens).toStrictEqual([TOKEN_RESULT_MOCK.listedTokens.nodes[0].token_id]);
    expect(burnedTokens).toStrictEqual([TOKEN_RESULT_MOCK.burnedTokens.nodes[0].token_id]);
    expect(unlistedTokens).toStrictEqual([TOKEN_RESULT_MOCK.unburnedTokens.nodes[0].token_id, TOKEN_RESULT_MOCK.unburnedTokens.nodes[1].token_id]);
  });

  it('should throw when calling via throw on error', () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokensByStatus> => Promise.reject(new Error(errMessage)),
    }));
    expect(tokensByStatusThrowOnError('test.id')).rejects.toBe(errMessage);
  });
});
