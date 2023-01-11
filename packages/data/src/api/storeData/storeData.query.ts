import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const storeDataQuery = gql`
query ${QUERY_OPS_PREFIX}_getStoreData($contractAddress: [String!]) {
    nft_contracts(where: { id: { _in: $contractAddress } }) {
      id
      name
      is_mintbase
      owner_id
    }
  }
`;
