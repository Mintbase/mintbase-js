import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../constants';

export const tokenListingCountsByMetaIdQuery = gql`
query ${QUERY_OPS_PREFIX}_tokenCountsByMetaId (
  $metadataId: String!
) {
  # tokens count
  tokensCount: nft_tokens_aggregate(
    where: {
      metadata_id: { _eq: $metadataId }
      burned_timestamp: { _is_null: true }
    }
  ) {
    aggregate {
      count
    }
  }

  # simple listings count
  simpleListingsCount: mb_views_active_listings_aggregate(
    where: {
      metadata_id: { _eq: $metadataId }
      kind: { _eq: "simple" }
      # we should not have to check for burned tokens, as listings will deactivate.
      # token: { burned_timestamp: { _is_null: true } }
    }
  ) {
    aggregate {
      count
    }
  }

  # auction listings count
  auctionListingsCount: mb_views_active_listings_aggregate(
    where: {
      metadata_id: { _eq: $metadataId }
      kind: { _eq: "auction" }
    }
  ) {
    aggregate {
      count
    }
  }
}
`;
