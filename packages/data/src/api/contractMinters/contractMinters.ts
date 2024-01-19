import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { contractMintersQuery } from './contractMinters.query';
import { ContractMintersResults } from './contractMinters.types';


export const contractMinters = async (
  contractAddress: string,
  network?: Network,
): Promise<ParsedDataReturn<ContractMintersResults>> => {
  const { data, error } = await fetchGraphQl<ContractMintersResults>({
    query: contractMintersQuery,
    variables: {
      contractAddress,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching contract minters, ${error}` : '';

  return parseData(data, error, errorMsg);
};
