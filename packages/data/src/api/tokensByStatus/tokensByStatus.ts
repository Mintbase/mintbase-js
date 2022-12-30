import { NftTokensAggregate } from '../../graphql/codegen/graphql';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokensByStatusQuery } from './tokensByStatusQuery';

export type TokensByStatus = {
  listedTokens: string[];
  burnedTokens: string[];
  unlistedTokens: string[];
};

export type TokenByStatusQueryResults = {
  listedTokens: NftTokensAggregate;
  burnedTokens: NftTokensAggregate;
  unburnedTokens: NftTokensAggregate;
};

export const tokensByStatus = async (metadataId: string, ownedBy?: string): Promise<ParsedDataReturn<TokensByStatus>> => {
  const { data, error } = await fetchGraphQl<TokenByStatusQueryResults>({
    query: tokensByStatusQuery,
    variables: {
      metadataId,
      ownedBy,
    },
  });

  const errorMsg = `Error fetching token listing by status', ${error.message}`;
  const unburnedTokens = getTokenArrayFromNodes(data.unburnedTokens.nodes);
  const listedTokens =  getTokenArrayFromNodes(data.listedTokens.nodes);

  const finalData = {
  
    listedTokens: getTokenArrayFromNodes(data.listedTokens.nodes),
    burnedTokens: getTokenArrayFromNodes(data.burnedTokens.nodes),
    unlistedTokens: unburnedTokens.filter((el: string) => !listedTokens.includes(el)),
  
  };

  return parseData(finalData, error, errorMsg);
  
};

function getTokenArrayFromNodes(nodes: { token_id: string }[]): string[] {
  const arr: string[] = [];
  nodes.forEach((token: { token_id: string }) => {
    arr.push(token.token_id);
  });
  return arr;
}
