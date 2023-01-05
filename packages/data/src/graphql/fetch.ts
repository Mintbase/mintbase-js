import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { getErrorMessage } from '../errorHandling';
import { mbjs } from '@mintbase-js/sdk';


export interface NearNetwork { 
  network: 'testnet' | 'mainnet';
}

export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
}

export const fetchGraphQl = async <T, V = Record<string, unknown>>({
  query,
  variables,
  env,
}: {
  query: DocumentNode | string;
  variables?: V;
  env?: string;
}): Promise<GqlFetchResult<T>> => {

  const endpointReady =  env.length > 0; 

  console.log(endpointReady, 'endpointReady');

  let graphqlEndpoint = mbjs.envs?.graphql_url ?? '';

  if (env && env.length > 0) {
    graphqlEndpoint = `https://interop-${env}.hasura.app/v1/graphql`;
  }

  // if (endpointReady) {
  
  // }


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
  

};
