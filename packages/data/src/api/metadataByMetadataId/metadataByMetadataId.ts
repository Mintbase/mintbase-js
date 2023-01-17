import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { metadataByMetadataIdQuery } from './metadataByMetadataId.query';
import { MetadataByMetadataIdQueryResult } from './metadataByMetadataId.types';

export const metadataByMetadataId = async (
  metadataId: string,
  network?: Network,
): Promise<ParsedDataReturn<MetadataByMetadataIdQueryResult>> => {
  const { data, error } = await fetchGraphQl<MetadataByMetadataIdQueryResult>({
    query: metadataByMetadataIdQuery,
    variables: {
      metadataId,
    },
    ...(network && { network: network }),
  });

  const errorMsg = error
    ? `Error fetching metadata by metadata id, ${error}`
    : '';

  return parseData<MetadataByMetadataIdQueryResult>(data, error, errorMsg);
};
