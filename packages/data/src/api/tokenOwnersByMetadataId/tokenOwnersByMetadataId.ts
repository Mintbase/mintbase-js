import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenOwnersByMetadataIdQuery } from './tokenOwnersByMetadataId.query';
import { TokenOwnersByMetadataIdQueryResult, TokenOwnersByMetadataProps } from './tokenOwnersByMetadataId.types';

export const tokenOwnersByMetadataId = async ({
  metadataId,
  pagination,
  network,
}: TokenOwnersByMetadataProps,
): Promise<ParsedDataReturn<TokenOwnersByMetadataIdQueryResult>> => {
  const { data, error } = await fetchGraphQl<TokenOwnersByMetadataIdQueryResult>({
    query: tokenOwnersByMetadataIdQuery,
    variables: {
      metadataId,
      limit: pagination?.limit ?? 12,
      offset: pagination?.offset ?? 0,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching token owners by metadata id, ${error}` : '';

  return parseData<TokenOwnersByMetadataIdQueryResult>(
    data,
    error,
    errorMsg,
  );
};
