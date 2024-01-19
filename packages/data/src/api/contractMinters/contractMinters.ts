import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { contractMintersQuery } from './contractMinters.query';
import {  ContractMintersResults } from './contractMinters.types';


export const contractMinters = async (
  contractAddress: string,
  network?: Network,
): Promise<ParsedDataReturn<string[]>> => {
  const { data, error } = await fetchGraphQl<ContractMintersResults>({
    query: contractMintersQuery,
    variables: {
      contractAddress,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching contract minters, ${error}` : '';

  const minters = data?.mb_store_minters?.map((minter) => minter.minter_id);

  return parseData(minters, error, errorMsg);
};
