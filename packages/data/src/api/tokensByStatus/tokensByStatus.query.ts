import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokensByStatusQuery = gql`
query ${QUERY_OPS_PREFIX}_tokensByStatus (
  $metadataId: String!
  $ownedBy: String
) {
  # unburned tokens count
  unburnedTokens: nft_tokens_aggregate(
    where: {
      metadata_id: { _eq: $metadataId }
      burned_timestamp: { _is_null: true }
      owner: { _eq: $ownedBy}
    }
  ) {
    nodes {
        token_id
      }
  }

  burnedTokens: nft_tokens_aggregate(
    where: {
      metadata_id: { _eq: $metadataId }
      burned_timestamp: { _is_null: false }
      owner: { _eq: $ownedBy}
    }
  ) {
    nodes {
        token_id
      }
  }


  #listed tokens
    listedTokens: mb_views_active_listings_aggregate(
      where: {
        metadata_id: { _eq: $metadataId }
        listed_by: { _eq: $ownedBy}
      }
    ) {
        nodes {
            token_id
          }
  }

}
`;
