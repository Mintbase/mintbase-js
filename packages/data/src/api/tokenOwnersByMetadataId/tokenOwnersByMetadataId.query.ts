import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokenOwnersByMetadataIdQuery= gql`
  query ${QUERY_OPS_PREFIX}_getTokenOwnersByMetadataIdQuery(
    $metadataId: String!
    $limit: Int!
    $offset: Int!
  ) {
    token: mb_views_nft_tokens(
      where: {
        metadata_id: { _eq: $metadataId }
        burned_timestamp: { _is_null: true }
      }
      limit: $limit
      offset: $offset
    ) {
      token_id
      owner
    }
    mb_views_nft_tokens_aggregate(
      where: {
        metadata_id: { _eq: $metadataId }
        burned_timestamp: { _is_null: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
