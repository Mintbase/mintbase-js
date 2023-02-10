import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { checkStoreNameQuery } from './checkStoreName.query';
import { StoreNameResults } from './checkStoreName.types';


export const checkStoreName = async (
  name: string,
  network?: Network,
): Promise<ParsedDataReturn<StoreNameResults>> => {
  const { data, error } = await fetchGraphQl<StoreNameResults>({
    query: checkStoreNameQuery,
    variables: {
      name,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching store name data, ${error}` : '';

  return parseData(data, error, errorMsg);
};
