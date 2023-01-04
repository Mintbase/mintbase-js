import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const getTokenProvenance = gql`
query ${QUERY_OPS_PREFIX}_getTokenProvenance(
    $tokenId: String!
    $contractAddress: String!
    $limit: Int
    $offset: Int
  ) {
    nft_activities(
      where: {
        token_id: { _eq: $tokenId }
        nft_contract_id: { _eq: $contractAddress }
      }
      order_by: { timestamp: desc }
      limit: $limit
      offset: $offset
    ) {
      price
      action_receiver
      action_sender
      tx_sender
      kind
      timestamp
      receipt_id
    }
    nft_activities_aggregate(
      where: {
        token_id: { _eq: $tokenId }
        nft_contract_id: { _eq: $contractAddress }
      }
      order_by: { timestamp: desc }
    ) {
      aggregate {
        count
      }
    }
  }`;
