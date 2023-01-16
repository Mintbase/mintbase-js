import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { storeNftsQuery } from './storeNfts.query';
import { StoreNftsResult } from './storeNfts.types';
import { Network } from '@mintbase-js/sdk';

export const storeNfts = async (
  contractAddress: string | string[],
  showOnlyListed?: boolean,
  pagination?: Pagination,
  network?: Network,
): Promise<ParsedDataReturn<StoreNftsResult>> => {
  const { data, error } = await fetchGraphQl<StoreNftsResult>({
    query: storeNftsQuery,
    variables: {
      condition: {
        nft_contract_id: { _in: contractAddress },
        ...(showOnlyListed && { price: { _is_null: false } }),
      },
      limit: pagination?.limit ?? 12,
      offset: pagination?.offset ?? 0,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching store nfts, ${error}` : '';

  return parseData(data, error, errorMsg);
};
