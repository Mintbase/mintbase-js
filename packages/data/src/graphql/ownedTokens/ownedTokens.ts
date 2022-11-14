import { Pagination } from '../../types';
import { fetchGraphQl } from '../fetch';
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
      limit: 1,
      offset: 0,
    },
  });

  console.log('what the fucking hell....', data, error);

  if (error) {
    console.error('Error fetching token listing counts', error.message);
    throw error;
  }

  return data.tokens;
};
