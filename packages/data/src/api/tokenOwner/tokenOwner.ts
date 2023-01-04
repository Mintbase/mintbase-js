import { fetchGraphQl } from "../../graphql/fetch";
import { ParsedDataReturn, TokenOwner } from "../../types";
import { parseData } from "../../utils";
import { tokenOwnerQuery } from "./tokenOwner.query";

export type TokenOwnerQueryResult = {
  mb_views_nft_tokens: TokenOwner[];
};

export const tokenOwner = async (
  tokenId: string,
  contractAddress: string
): Promise<ParsedDataReturn<string>> => {
  const { data, error } = await fetchGraphQl<TokenOwnerQueryResult>({
    query: tokenOwnerQuery,
    variables: {
      tokenId,
      contractAddress,
    },
  });

  const errorMsg = error ? `Error fetching token listing counts, ${error}` : "";

  return parseData<string>(data?.mb_views_nft_tokens[0].owner, error, errorMsg);
};
