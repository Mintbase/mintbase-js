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
  variables?: any;
  network?: Network | null | undefined;
}): Promise<GqlFetchResult<T>> => {

  let networkObj = network;

  if (!network) {
    networkObj = mbjs?.keys?.network as Network;
  }

  if (networkObj && !isValidNetwork(networkObj)) {
    return { error: 'Please add a valid Network' };
  }

  if (!networkObj) {
    return { error: 'Please set a network.' };
  }

  const endpointReady = isValidNetwork(networkObj) && networkObj;

  const graphqlEndpoint = GRAPHQL_ENDPOINTS[networkObj] ?? mbjs?.keys?.graphqlUrl;

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
