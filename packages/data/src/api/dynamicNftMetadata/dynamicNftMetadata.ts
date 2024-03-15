import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { dynamicNftMetadataQuery } from './dynamicNftMetadata.query';
import { DynamicNftMetadataResult, DynamicNftMetadataProps } from './dynamicNftMetadata.types';

export { DynamicNftMetadataResult, DynamicNftMetadataProps };

// TODO: make isActive toggle optional, if not provided load all metadata
export const dynamicNftMetadata = async ({
  contractAddress,
  internalMetadataId,
  isActive,
  network,
}: DynamicNftMetadataProps): Promise<ParsedDataReturn<DynamicNftMetadataResult>> => {
  const { data, error } = await fetchGraphQl<DynamicNftMetadataResult>({
    query: dynamicNftMetadataQuery,
    variables: { contractAddress, internalMetadataId, isActive },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching metadata for dynamic NFT (metadata ID: ${internalMetadataId}): ${error}` : '';

  return parseData(data, error, errorMsg);
};
