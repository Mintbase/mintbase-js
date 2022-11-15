import { Pagination } from '../types';
import { fetchGraphQl } from '../graphql/fetch';
import { ownedTokensQuery } from './ownedTokens.query';

export type OwnedTokens = {
  lastTransferredAt: string;
  tokenId: string;
  contractId: string;
  baseUri: string;
  metadataId: string;
  title: string;
  minter: string;
  media: string;
  document: string;
  animationUrl: string;
}

export type OwnedTokensQueryResult = {
  tokens: OwnedTokens[];
}

export const ownedTokens = async (
  ownerId: string,
  { limit, offset = 0 }: Pagination,
): Promise<OwnedTokens[]> => {
  const { data, error } = await fetchGraphQl<OwnedTokensQueryResult>({
    query: ownedTokensQuery,
    variables: {
      ownerId,
      limit,
      offset,
    },
  });

  if (error) {
    console.error('Error fetching token listing counts', error.message);
    throw error;
  }

  return data.tokens;
};
