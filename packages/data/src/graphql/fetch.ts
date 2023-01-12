import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { getErrorMessage } from '../errorHandling';
import { GRAPHQL_ENDPOINTS, mbjs, NEAR_NETWORKS, Network } from '@mintbase-js/sdk';

const isValidNetwork = (network: Network): boolean =>  network === NEAR_NETWORKS.MAINNET || network ===  NEAR_NETWORKS.TESTNET;


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
  network?: Network | null | undefined;
}): Promise<GqlFetchResult<T>> => {

  const networkfromConfig =  mbjs?.keys?.isSet && mbjs?.keys?.network;

  if (network && !isValidNetwork(network)) {
    return { error: 'Please add a valid Network' };
  }

  if (!network && !networkfromConfig) {
    return { error: 'Please set a network.' };
  }

  const endpointReady = isValidNetwork(network) && network || isValidNetwork(mbjs?.keys?.network) && networkfromConfig; 

  let graphqlEndpoint = mbjs?.keys?.graphqlUrl;

  if (network && isValidNetwork) {
    graphqlEndpoint = GRAPHQL_ENDPOINTS[network];
  }


  if (endpointReady && graphqlEndpoint) {

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
