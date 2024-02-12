import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokenOwnerQuery } from './tokenOwner.query';
import { TokenOwnerProps, TokenOwnerQueryResult } from './tokenOwner.types';

export const tokenOwner = async ({
  tokenId,
  contractAddress,
  network,
}: TokenOwnerProps,
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
