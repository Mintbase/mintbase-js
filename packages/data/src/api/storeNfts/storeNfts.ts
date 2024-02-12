import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { storeNftsQuery } from './storeNfts.query';
import { StoreNftsProps, StoreNftsResult } from './storeNfts.types';

export const storeNfts = async ({
  contractAddress,
  showOnlyListed,
  pagination,
  network,
}: StoreNftsProps): Promise<ParsedDataReturn<StoreNftsResult>> => {
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
