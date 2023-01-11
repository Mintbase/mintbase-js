import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { ownedStoresQuery } from './ownedStores.query';
import { OwnedStoresData } from './ownedStores.types';


export const ownedStores = async (
  ownerId: string,
): Promise<ParsedDataReturn<OwnedStoresData>> => {
  const { data, error } = await fetchGraphQl<OwnedStoresData>({
    query: ownedStoresQuery,
    variables: {
      ownerId,
    },
  });

  const errorMsg = error? `Error fetching stores from ${ownerId}, ${error}`: '';

  return parseData<OwnedStoresData>(data,error,errorMsg);

};
