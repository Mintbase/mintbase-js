import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { ownedStoresQuery } from './ownedStores.query';
import { OwnedStoresData } from './ownedStores.types';


export const ownedStores = async (
  ownerId: string,
  network?: Network,
): Promise<ParsedDataReturn<OwnedStoresData>> => {
  const { data, error } = await fetchGraphQl<OwnedStoresData>({
    query: ownedStoresQuery,
    variables: {
      ownerId,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error? `Error fetching stores from ${ownerId}, ${error}`: '';

  return parseData<OwnedStoresData>(data, error, errorMsg);

};
