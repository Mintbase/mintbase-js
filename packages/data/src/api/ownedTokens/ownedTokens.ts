import { Pagination, ParsedDataReturn, Token } from '../../types';
import { fetchGraphQl } from '../../graphql/fetch';
import { ownedTokensQuery } from './ownedTokens.query';
import { parseData } from '../../utils';
import { Network } from '@mintbase-js/sdk';

export type OwnedTokensQueryResult = {
  tokens: Token[];
}

interface OwnedTokensProps {
  ownerId: string;
  pagination: Pagination;
  network?: Network;
}

export const ownedTokens = async (
  { ownerId, pagination: { limit, offset = 0 }, network }: OwnedTokensProps,
): Promise<ParsedDataReturn<Token[]>> => {

  const { data, error } = await fetchGraphQl<OwnedTokensQueryResult>({
    query: ownedTokensQuery,
    variables: {
      ownerId,
      limit,
      offset,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching ownedTokens, ${error}` : undefined;

  return parseData<Token[]>(data?.tokens, error, errorMsg);

};

export const ownedTokensThrowOnError = async (
  ownerId: string,
  pagination: Pagination,
  network?: Network,
): Promise<Token[]> => {
  const { data, error } = await ownedTokens({ ownerId, pagination, network });
  if (error) {
    console.error(`An error occurred fetching ownedTokens ${error}`);
    throw new Error(error);
  }
  return data;
};
