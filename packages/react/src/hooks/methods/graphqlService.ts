import { GraphQLClient, Variables } from 'graphql-request';

export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
};

export const baseUrl = 'https://graph.mintbase.xyz/testnet';

export const graphQLService = async <T>({
  query,
  variables,
}: {
  query: string;
  variables?: Variables;
}): Promise<GqlFetchResult<T>> => {
  const headers = {
    'content-type': 'application/json',
    'mb-api-key': 'anon',
    'Access-Control-Allow-Origin': '*',
  };

  const queryLoad = (): Promise<T> => new GraphQLClient(baseUrl, { headers }).request<T>(query, variables);

  try {
    const data = await queryLoad();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: `Query Error: ${error}` };
  }
};
