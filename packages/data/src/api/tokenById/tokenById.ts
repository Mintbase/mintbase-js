import { fetchGraphQl } from "../../graphql/fetch";
import { errorContractAddress, errorToken } from "./tokenById.mock";
import { tokenByIdQuery } from "./tokenbyId.query";

import { TokenByIdResults } from "./tokenById.types";

export const checkParams = (tokenId: string, contractAddress: string) => {
  if (typeof tokenId !== "string") {
    return errorToken;
  } else if (typeof contractAddress !== "string") {
    return errorContractAddress;
  } else {
    return { valid: true, message: "" };
  }
};

export const tokenById = async (
  tokenId: string,
  contractAddress: string
): Promise<TokenByIdResults> => {
  const { valid, message } = checkParams(tokenId, contractAddress);

  if (valid) {
    const { data, error } = await fetchGraphQl<TokenByIdResults>({
      query: tokenByIdQuery,
      variables: {
        tokenId,
        contractAddress,
      },
    });

    // log and rethrow for now...
    // question: do we want to use the same { error, data } pattern in these
    // methods as well?
    if (error) {
      console.error("Error fetching token listing counts", error.message);
      throw error;
    }

    if (data) {
      return data;
    }
  } else {
    console.error(message);
    return null;
  }
};
