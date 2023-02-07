import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const contractAttributesQuery = gql`
query ${QUERY_OPS_PREFIX}_getContractAttributes($contractAddress: String!) {
  nft_attributes(
    where: {nft_contract_id: {_eq: $nft_metadata_id}}
    distinct_on: attribute_type
  ) {
    attribute_type
  }
  nft_attributes_aggregate(where: {nft_contract_id: {_eq: $nft_metadata_id}}
    distinct_on: attribute_type) {
    aggregate {
      count
    }
  }
}
`;
