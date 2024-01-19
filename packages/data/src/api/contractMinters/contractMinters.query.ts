import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const contractMintersQuery = gql`
query ${QUERY_OPS_PREFIX}_getContractMinters($contractAddress: [String!]) {
  mb_store_minters(where: {nft_contract_id: {_eq: $contractAddress}}) {
    minter_id
  }
  }
`;
