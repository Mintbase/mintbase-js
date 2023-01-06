import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenMetadataQuery } from './tokenMetadata.query';
import { TokenMetadataQueryResult } from './tokenMetadata.type';

export const tokenMetadata = async (
  tokenId: string,
  contractAddress: string,
): Promise<ParsedDataReturn<TokenMetadataQueryResult>> => {
  const { data, error } = await fetchGraphQl<TokenMetadataQueryResult>({
    query: tokenMetadataQuery,
    variables: {
      tokenId,
      contractAddress,
    },
  });

  const errorMsg = error ? `Error fetching token owner, ${error}` : '';

  return parseData<TokenMetadataQueryResult>(
    data,
    error,
    errorMsg,
  );
};
