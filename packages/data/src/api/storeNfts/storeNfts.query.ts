import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const storeNftsQuery = gql`
query ${QUERY_OPS_PREFIX}_getStoreNfts(
    $offset: Int!
    $limit: Int!
    $condition: mb_views_nft_metadata_unburned_bool_exp
  ) @cached {
    mb_views_nft_metadata_unburned(
      where: $condition
      offset: $offset
      order_by: { minted_timestamp: desc }
      limit: $limit
    ) {
      minted_timestamp
      price
      media
      nft_contract_id
      metadata_id
      title
      base_uri
    }
    mb_views_nft_metadata_unburned_aggregate(where: $condition) {
      aggregate {
        count
      }
    }
  }
`;
