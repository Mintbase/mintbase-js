import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const storeDataQuery = gql`
query ${QUERY_OPS_PREFIX}_getStoreData(
    $offset: Int = 0
    $condition: mb_views_nft_metadata_unburned_bool_exp
  ) @cached {
    mb_views_nft_metadata_unburned(
      where: $condition
      offset: $offset
      order_by: { minted_timestamp: desc }
      limit: 10
    ) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      metadataId: metadata_id
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
