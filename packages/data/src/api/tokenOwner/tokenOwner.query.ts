import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokenOwnerQuery = gql`
query ${QUERY_OPS_PREFIX}_getTokenOwner(
  $tokenId: String!
  $contractAddress: String!
) {
  mb_views_nft_tokens(
    where: {
      nft_contract_id: { _eq: $contractAddress }
      token_id: { _eq: $tokenId }
    }
    limit: 1
  ) {
    owner
  }
}
`;
