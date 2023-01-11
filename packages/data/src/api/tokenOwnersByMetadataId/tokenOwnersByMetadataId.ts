import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenOwnersByMetadataIdQuery } from './tokenOwnersByMetadataId.query';
import { TokenOwnersByMetadataIdQueryResult } from './tokenOwnersByMetadataId.types';

export const tokenOwnersByMetadataId = async (
  metadataId: string,
  pagination?: Pagination,
  network?: Network,  
): Promise<ParsedDataReturn<TokenOwnersByMetadataIdQueryResult>> => {
  const { data, error } = await fetchGraphQl<TokenOwnersByMetadataIdQueryResult>({
    query: tokenOwnersByMetadataIdQuery,
    variables: {
      metadataId,
      limit: pagination?.limit ?? 12,
      offset: pagination?.offset ?? 0,
    },
    network: network ?? '',
  });

  const errorMsg = error ? `Error fetching token owners by metadata id, ${error}` : '';

  return parseData<TokenOwnersByMetadataIdQueryResult>(
    data,
    error,
    errorMsg,
  );
};
