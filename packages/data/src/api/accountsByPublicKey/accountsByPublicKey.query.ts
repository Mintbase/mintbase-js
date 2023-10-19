import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const accountsByPublicKeyQuery = gql`
  query ${QUERY_OPS_PREFIX}_accountsByPublicKey(
    $publicKey: String!
  ) {
    accounts: access_keys(
      where: {
        public_key: { _eq: $publicKey }
        removed_at: { _is_null: true }
      }
    ) {
      id: account_id
    }
  }
`;
