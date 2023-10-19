import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const keyActivityQuery = gql`
query ${QUERY_OPS_PREFIX}_KeyActivity($accountId: String) {
  keyActivity: mb_views_access_key_activity(
    order_by: { timestamp: desc }
    where: { account_id: { _eq: $accountId} }
  ) {
    timestamp,
    receiptId: receipt_id,
    publicKey: public_key,
    kind
  }
}
`;
