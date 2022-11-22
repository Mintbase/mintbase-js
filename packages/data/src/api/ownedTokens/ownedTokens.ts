import { Pagination, Token } from '../../types';
import { fetchGraphQl } from '../../graphql/fetch';
import { ownedTokensQuery } from './ownedTokens.query';

export type OwnedTokensQueryResult = {
  tokens: Token[];
}

export const ownedTokens = async (
  ownerId: string,
  { limit, offset = 0 }: Pagination,
): Promise<Token[]> => {
  const { data, error } = await fetchGraphQl<OwnedTokensQueryResult>({
    query: ownedTokensQuery,
    variables: {
      ownerId,
      limit,
      offset,
    },
  });

  if (error) {
    console.error('Error fetching token listing counts', error.message);
    throw error;
  }

  return data.tokens;
};
