import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData, validContractAddress, validTokenId } from '../../utils';
import { errorContractAddress, errorToken } from './tokenProvenance.errors';
import { getTokenProvenanceQuery } from './tokenProvenance.query';
import { TokenProvenanceData } from './tokenProvenance.types';

export const tokenProvenance = async (
  tokenId: string | number,
  contractAddress: string,
  pagination?: Pagination,
  network?: Network,  
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
    query: getTokenProvenanceQuery,
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
