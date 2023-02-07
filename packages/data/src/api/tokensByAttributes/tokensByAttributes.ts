import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenOwnerQuery } from './tokenOwner.query';
import { TokenOwnerQueryResult } from './tokenOwner.types';

export const tokenOwner = async (
  tokenId: string,
  contractAddress: string,
  network?: Network,  
): Promise<ParsedDataReturn<string>> => {
  const { data, error } = await fetchGraphQl<TokenOwnerQueryResult>({
    query: tokenOwnerQuery,
    variables: {
      tokenId,
      contractAddress,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching token owner, ${error}` : '';

  return parseData<string>(
    data?.mb_views_nft_tokens[0]?.owner,
    error,
    errorMsg,
  );
};
