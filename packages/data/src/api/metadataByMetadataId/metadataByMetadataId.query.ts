import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const metadataByMetadataIdQuery = gql`
  query ${QUERY_OPS_PREFIX}_getMetadataByMetadataIdQuery(
    $metadataId: String!
  ) {
    metadata: nft_metadata(
      where: {
        id: { _eq: $metadataId }
      }
    ) {
      nft_contracts {
        id
        baseUri: base_uri
      }
      title
      description
      media
      document: reference_blob(path: "$.document")
      animationUrl: reference_blob(path: "$.animation_url")
      extra: reference_blob(path: "$.extra")
    }

    tokenCount: nft_tokens_aggregate(
      where: {
        metadata_id: {_eq: $metadataId }
      }
    ) {
      aggregate {
        count
      }
    }

    minters: nft_tokens(
      distinct_on: minter
      where: {
        burned_timestamp: { _is_null: true },
        metadata_id: {_eq: $metadataId }
      }
    ) {
      minter
    }

    rollingAuctionCount: mb_views_active_listings_aggregate (
      where: {
      metadata_id: {_eq: $metadataId }
      kind: { _eq: "auction" }
      }
  ) {
      aggregate {
      count
      }
  }

  simpleSaleCount: mb_views_active_listings_aggregate (
    where: {
    metadata_id: {_eq: $metadataId }
    kind: { _eq: "simple" }
    }
  ) {
    aggregate {
    count
    }
  }
  
  listings: mb_views_active_listings (
    where: {
    metadata_id: {_eq: $metadataId }
    }
    limit: 1,
    order_by: { price: desc }
  ) {
    kind
    price
    market_id
    token {
      token_id
      minter
      nft_contract_id
      owner
      splits
      royalties
    }
  }
}
`;
