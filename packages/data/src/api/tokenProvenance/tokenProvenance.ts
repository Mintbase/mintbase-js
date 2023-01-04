import { Pagination, ParsedDataReturn, Token } from '../../types';
import { fetchGraphQl } from '../../graphql/fetch';
import { parseData } from '../../utils';
import { getTokenProvenance } from './tokenProvenance.query';

export type OwnedTokensQueryResult = {
  tokens: Token[];
};

export const ownedTokens = async (
  ownerId: string,
  { limit, offset = 0 }: Pagination,
): Promise<ParsedDataReturn<Token[]>> => {
  const { data, error } = await fetchGraphQl<OwnedTokensQueryResult>({
    query: getTokenProvenance,
    variables: {
      ownerId,
      limit,
      offset,
    },
  });

  const errorMsg = error ? `Error fetching token provenance, ${error}` : '';

  return parseData<Token[]>(data?.tokens, error, errorMsg);
};
