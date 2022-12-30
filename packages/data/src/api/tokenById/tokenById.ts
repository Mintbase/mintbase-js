import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';

import { errorContractAddress, errorToken } from './tokenById.errors';
import { tokenByIdQuery } from './tokenById.query';
import { TokenByIdResults } from './tokenById.types';


export const tokenById = async (
  tokenId: string | number,
  contractAddress: string,
): Promise<ParsedDataReturn<TokenByIdResults>> => {
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

  const { data, error } = await fetchGraphQl<TokenByIdResults>({
    query: tokenByIdQuery,
    variables: {
      tokenId,
      contractAddress,
    },
  });

  const errorMsg = `Error fetching token listing counts, ${error.message}`;


  return parseData(data, error, errorMsg);

};
