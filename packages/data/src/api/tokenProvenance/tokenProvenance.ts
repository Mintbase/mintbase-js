import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData, validContractAddress, validTokenId } from '../../utils';
import { errorContractAddress, errorToken } from './tokenProvenance.errors';
import { getTokenProvenance } from './tokenProvenance.query';
import { TokenProvenanceData, TokenProvenanceProps } from './tokenProvenance.types';

export const tokenProvenance = async (
  {
    tokenId,
    contractAddress,
    pagination,
    network,
  }: TokenProvenanceProps,
): Promise<ParsedDataReturn<TokenProvenanceData>> => {

  const isValidTokenId =  validTokenId(tokenId);
  const isValidContractAddress = validContractAddress(contractAddress);

  if (!(isValidTokenId && isValidContractAddress)) {
    if (!isValidContractAddress) {
      console.error(errorContractAddress.message);

      return { error: errorContractAddress.message };
    }

    if (!isValidTokenId) {
      console.error(errorToken.message);

      return { error: errorToken.message };
    }
  }

  const { data, error } = await fetchGraphQl<TokenProvenanceData>({
    query: getTokenProvenance,
    variables: {
      tokenId,
      contractAddress,
      limit: pagination?.limit ?? 12,
      offset: pagination?.offset ?? 0,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching token provenance from ${error}` : '';

  return parseData<TokenProvenanceData>(data, error, errorMsg);
};
