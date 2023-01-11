import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { getErrorMessage } from '../errorHandling';
import { mbjs, Network } from '@mintbase-js/sdk';


export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
}

export const fetchGraphQl = async <T, V = Record<string, unknown>>({
  query,
  variables,
  network,
}: {
  query: DocumentNode | string;
  variables?: V;
  network?: Network | '';
}): Promise<GqlFetchResult<T>> => {

  const endpointReady =  mbjs?.keys?.isSet || network?.length > 0; 

  let graphqlEndpoint = mbjs?.keys.graphqlUrl ?? '';

  if (network && network.length > 0) {
    graphqlEndpoint = `https://interop-${network}.hasura.app/v1/graphql`;
  }

  if (endpointReady) {

    try {
      const client = new GraphQLClient(graphqlEndpoint);
      return {
        data: await client.request<T>(query, variables),
      };
    
    } catch (error:unknown) {
      return {
        error: getErrorMessage(error),
      };
    }
  }

  return { data: null, error: null };

};
