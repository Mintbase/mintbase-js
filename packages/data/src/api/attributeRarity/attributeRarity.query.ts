import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const attributeRarityQuery = gql`
  query ${QUERY_OPS_PREFIX}_attributeRarity(
    $contractId: String!
    $attributeType: String!
    $attributeValue: String!
  ) {
    amountValues: nft_attributes_aggregate(
      where: {
        nft_contract_id: { _eq: $contractId }
        attribute_type: { _eq: $attributeType }
        attribute_value: { _eq: $attributeValue }
      }
    ) {
      aggregate {
        count
      }
    }
    totalTypes: nft_attributes_aggregate(
      where: {
        nft_contract_id: { _eq: $contractId }
        attribute_type: { _eq: $attributeType }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
