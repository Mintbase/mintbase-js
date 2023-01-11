import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { storeDataQuery } from './storeData.query';
import { StoreDataResults } from './storeData.types';


export const storeData = async (
  contractAddress: string | string[],
  network?: Network,
): Promise<ParsedDataReturn<StoreDataResults>> => {
  const { data, error } = await fetchGraphQl<StoreDataResults>({
    query: storeDataQuery,
    variables: {
      contractAddress,
    },
    network: network ?? '',
  });

  const errorMsg = error ? `Error fetching store data, ${error}` : '';

  return parseData(data, error, errorMsg);
};
