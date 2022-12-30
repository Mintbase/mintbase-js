import { Pagination, ParsedDataReturn, Token } from '../../types';
import { fetchGraphQl } from '../../graphql/fetch';
import { ownedTokensQuery } from './ownedTokens.query';
import { parseData } from '../../utils';

export type OwnedTokensQueryResult = {
  tokens: Token[];
}

export const ownedTokens = async (
  ownerId: string,
  { limit, offset = 0 }: Pagination,
): Promise<ParsedDataReturn<Token[]>> => {
  
  const { data, error } = await fetchGraphQl<OwnedTokensQueryResult>({
    query: ownedTokensQuery,
    variables: {
      ownerId,
      limit,
      offset,
    },
  });

  const errorMsg = error? `Error fetching token listing counts, ${error}`: '';

  return parseData<Token[]>(data?.tokens,error,errorMsg);

};
