import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../constants';
import { getErrorMessage } from '../errorHandling';


export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
}

export const fetchGraphQl = async <T, V = Record<string, unknown>>({
  query,
  variables,
}: {
  query: DocumentNode | string;
  variables?: V;
}): Promise<GqlFetchResult<T>> => {
  try {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT);
    return {
      data: await client.request<T>(query, variables),
    };

  } catch (error:unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
