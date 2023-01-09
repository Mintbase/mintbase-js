import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';


export const ownedStoresQuery = gql`
query ${QUERY_OPS_PREFIX}_GetOwnedStores($ownedId: String!) {
  nft_contracts(where: {owner_id: {_eq: $ownedId}}) {
    id
  }
}
`;
