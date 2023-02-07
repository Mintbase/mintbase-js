import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { contractAttributesQuery } from './contractAttributes.query';
import { ContractAttributesDataResults } from './contractAttributes.types';


export const contractAttributes = async (
  contractAddress: string,
  network?: Network,
): Promise<ParsedDataReturn<ContractAttributesDataResults>> => {
  const { data, error } = await fetchGraphQl<ContractAttributesDataResults>({
    query: contractAttributesQuery,
    variables: {
      contractAddress,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching contract attributes, ${error}` : '';

  return parseData(data, error, errorMsg);
};
