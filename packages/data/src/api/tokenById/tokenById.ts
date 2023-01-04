import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData, validContractAddress, validTokenId } from '../../utils';

import { errorContractAddress, errorToken } from './tokenById.errors';
import { tokenByIdQuery } from './tokenById.query';
import { TokenByIdResults } from './tokenById.types';


export const tokenById = async (
  tokenId: string | number,
  contractAddress: string,
): Promise<ParsedDataReturn<TokenByIdResults>> => {
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

  const { data, error } = await fetchGraphQl<TokenByIdResults>({
    query: tokenByIdQuery,
    variables: {
      tokenId,
      contractAddress,
    },
  });

  const errorMsg = error ? `Error fetching token listing counts, ${error}` : '';

  return parseData(data, error, errorMsg);

};
