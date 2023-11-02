import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { KeyActivityQueryResults } from './keyActivity.types';
import { keyActivityQuery } from './keyActivity.query';


export const keyActivity = async (accountId: string, network?: Network): Promise<ParsedDataReturn<KeyActivityQueryResults>> => {
  const { data, error } = await fetchGraphQl<KeyActivityQueryResults>({
    query: keyActivityQuery,
    variables: { accountId },
    ...(network && { network:network }),
  });

  const errorMsg = error? `Error fetching token listing by status', ${error}`: '';

  return parseData(data, error, errorMsg);
};
