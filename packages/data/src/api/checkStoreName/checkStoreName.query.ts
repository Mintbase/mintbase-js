import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const checkStoreNameQuery = gql`
  query ${QUERY_OPS_PREFIX}_CheckStore($name: String!) {
    nft_contracts(where: { name: { _eq: $name } }) {
      name
    }
  }
`;
