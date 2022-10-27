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

export const fetchGraphQl= async <T>({
  query,
  variables,
}: {
  query: DocumentNode | string;
  variables?: Record<string, unknown>;
}): Promise<GqlFetchResult<T>> => {
  try {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT);
    const data = await client.request<T>(query, variables);
    return { data };

  } catch (error) {
    return {
      error: new GraphqlFetchingError(error?.message || error),
    };
  }
};
