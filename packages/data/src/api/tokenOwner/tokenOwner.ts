import { fetchGraphQl } from "../../graphql/fetch";
import { ParsedDataReturn, TokenOwner } from "../../types";
import { parseData } from "../../utils";
import { tokenOwnerQuery } from "./tokenOwner.query";

export type TokenOwnerQueryResult = {
  tokens: TokenOwner[];
};

export const tokenOwner = async (
  tokenId: string,
  contractId: string
): Promise<ParsedDataReturn<TokenOwner[]>> => {
  const { data, error } = await fetchGraphQl<TokenOwnerQueryResult>({
    query: tokenOwnerQuery,
    variables: {
      tokenId,
      contractId,
    },
  });

  const errorMsg = error ? `Error fetching token listing counts, ${error}` : "";

  return parseData<TokenOwner[]>(data?.tokens, error, errorMsg);
};
