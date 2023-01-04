import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { getTokenProvenance } from './tokenProvenance.query';
import { TokenProvenanceData } from './tokenProvenance.types';

export const ownedTokens = async (
  ownerId: string,
  { limit, offset = 0 }: Pagination,
): Promise<ParsedDataReturn<TokenProvenanceData>> => {
  const { data, error } = await fetchGraphQl<TokenProvenanceData>({
    query: getTokenProvenance,
    variables: {
      ownerId,
      limit,
      offset,
    },
  });

  const errorMsg = error ? `Error fetching token provenance, ${error}` : '';

  return parseData<TokenProvenanceData>(data, error, errorMsg);
};
