import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenOwnersByMetadataIdQuery } from './tokenOwnersByMetadataId.query';
import { TokenOwnersByMetadataIdQueryResult } from './tokenOwnersByMetadataId.types';

export const tokenOwnersByMetadataId = async (
  tokenId: string,
  contractAddress: string,
): Promise<ParsedDataReturn<TokenOwnersByMetadataIdQueryResult>> => {
  const { data, error } = await fetchGraphQl<TokenOwnersByMetadataIdQueryResult>({
    query: tokenOwnersByMetadataIdQuery,
    variables: {
      tokenId,
      contractAddress,
    },
  });

  const errorMsg = error ? `Error fetching token owners by metadata id, ${error}` : '';

  return parseData<TokenOwnersByMetadataIdQueryResult>(
    data,
    error,
    errorMsg,
  );
};
