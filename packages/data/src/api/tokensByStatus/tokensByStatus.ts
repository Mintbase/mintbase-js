import { NftTokensAggregate } from '../../graphql/codegen/graphql';
import { fetchGraphQl } from '../../graphql/fetch';
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

export const tokensByStatus = async (metadataId: string, ownedBy?: string): Promise<TokensByStatus> => {
  const { data, error } = await fetchGraphQl<TokenByStatusQueryResults>({
    query: tokensByStatusQuery,
    variables: {
      metadataId,
      ownedBy,
    },
  });

  console.log(data);

  if (error) {
    console.error('Error fetching token listing by status', error.message);
    throw error;
  }
  const listedTokens = getTokenArrayFromNodes(data.listedTokens.nodes);
  const burnedTokens = getTokenArrayFromNodes(data.burnedTokens.nodes);
  const unburnedTokens = getTokenArrayFromNodes(data.unburnedTokens.nodes);
  const unlistedTokens = unburnedTokens.filter((el: string) => !listedTokens.includes(el));

  return {
    listedTokens,
    burnedTokens,
    unlistedTokens,
  };
};

function getTokenArrayFromNodes(nodes: { token_id: string }[]): string[] {
  const arr: string[] = [];
  nodes.forEach((token: { token_id: string }) => {
    arr.push(token.token_id);
  });
  return arr;
}
