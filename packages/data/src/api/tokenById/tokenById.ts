import { fetchGraphQl, GraphqlFetchingError } from '../../graphql/fetch';
import { errorContractAddress, errorToken } from './tokenById.errors';

import { tokenByIdQuery } from './tokenbyId.query';

import { TokenByIdResults } from './tokenById.types';

interface TokenByIdData {
  data?: TokenByIdResults | null;
  error: string | GraphqlFetchingError;
}

export const tokenById = async (
  tokenId: string | number,
  contractAddress: string,
): Promise<TokenByIdData> => {
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
    console.log(validArgs, validContractAddress, 'validContractAddress');

    if (!validContractAddress) {
      console.error(errorContractAddress.message);

      return { data: undefined, error: errorContractAddress.message };
    }

    if (!validTokenId()) {
      console.error(errorToken.message);

      return { data: undefined, error: errorToken.message };
    }
  }

  const fetchData = async (): Promise<TokenByIdData> => {
    const { data, error } = await fetchGraphQl<TokenByIdResults>({
      query: tokenByIdQuery,
      variables: {
        tokenId,
        contractAddress,
      },
    });

    if (error) {
      console.error('Error fetching token listing counts', error.message);
      throw error;
    }

    return { data, error };
  };

  const res = await fetchData();

  return { data: res.data, error: res.error };
};
