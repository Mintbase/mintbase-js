import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const nftOwnersByStoreQuery = gql`
  query ${QUERY_OPS_PREFIX}_getNftOwnersByStoreQuery(
    $storeId: String!
  ) {
  nft_tokens(
    distinct_on: owner,
    where: { nft_contract_id: { _eq: $contractId } }
  ) {
    owner
  }
}
`;
