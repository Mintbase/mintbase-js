import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { errorContractAddress, errorToken } from './tokenProvenance.errors';
import { getTokenProvenance } from './tokenProvenance.query';
import { TokenProvenanceData } from './tokenProvenance.types';

export const tokenProvenance = async (
  tokenId: string | number,
  contractAddress: string,
  pagination?: Pagination,
): Promise<ParsedDataReturn<TokenProvenanceData>> => {

  // check if contract address is part of Near
  const validContractAddress =
    contractAddress.endsWith('.near') || contractAddress.endsWith('.testnet');

  // check if tokenId is a valid positive number
  const validTokenId = (): boolean =>
    typeof tokenId === 'string'
      ? /^\d+$/.test(tokenId)
      : /^\d+$/.test(tokenId.toString());

  const validArgs = validTokenId() && validContractAddress;

  if (!validArgs) {
    if (!validContractAddress) {
      console.error(errorContractAddress.message);

      return { error: errorContractAddress.message };
    }

    if (!validTokenId()) {
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
      offset: pagination?.offset ?? 12,
    },
  });

  const errorMsg = error ? `Error fetching token provenance from ${error}` : '';

  return parseData<TokenProvenanceData>(data, error, errorMsg);
};
