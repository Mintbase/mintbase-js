import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../constants';

export class GraphqlFetchingError extends Error {
  constructor(msg: string) {
    super();
    this.message = msg;
  }
}

export type GqlFetchResult<T> = {
  data?: T;
  error?: GraphqlFetchingError;
}

export const fetchGraphQl= async <T, V = Record<string, unknown>>({
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

  } catch (error) {
    return {
      error: new GraphqlFetchingError(error?.message || error),
    };
  }
};
