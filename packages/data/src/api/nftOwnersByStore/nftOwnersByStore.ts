import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { nftOwnersByStoreQuery } from './nftOwnersByStore.query';
import { NftOwnersByStoreQueryResult } from './nftOwnersByStore.types';

export const nftOwnersByStore = async (
  storeId: string,
  network?: Network,
): Promise<ParsedDataReturn<string[]>> => {
  const { data, error } = await fetchGraphQl<NftOwnersByStoreQueryResult>({
    query: nftOwnersByStoreQuery,
    variables: {
      storeId,
    },
    ...(network && { network: network }),
  });

  const errorMsg = error
    ? `Error fetching NFT owners by store, ${error}`
    : '';

  return parseData<string[]>(data.nft_tokens.map(t => t.owner), error, errorMsg);
};
