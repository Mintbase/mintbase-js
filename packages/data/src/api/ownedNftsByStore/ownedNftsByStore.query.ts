import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';


export const ownedNftsByStoreQuery = gql`
query ${QUERY_OPS_PREFIX}_GetOwnedNftsByStore(
    $accountId: String!
    $contractAddress: String!
    $limit: Int!
    $offset: Int!
    $currency: [String!] = ["near"]
  ) {
    earnings_aggregate: nft_earnings_aggregate(
      where: { receiver_id: { _eq: $accountId }, currency: { _in: $currency } }
    ) {
      aggregate {
        sum {
          amount
        }
        count
      }
    }
   token: mb_views_nft_tokens(order_by: {}, 
   where: {_and: [{burned_timestamp: {_is_null: true}}, {owner: {_eq: $accountId}}, 
   {nft_contract_id: {_eq: $contractAddress}}, {metadata_id: {_is_null: false}}]}, 
   limit: $limit, offset: $offset, distinct_on: metadata_id) 
   {
     metadataId: metadata_id
     nftContractId: nft_contract_id
      minter
      title
      media
      reference
     baseUri: base_uri
     mintedTimestamp: minted_timestamp
      animationUrl: reference_blob(path: "$.animation")
      mediaFromRef: reference_blob(path: "$.media")
      listings(
        where: {
          accepted_at: { _is_null: true }
          unlisted_at: { _is_null: true }
          invalidated_at: { _is_null: true }
        }
        order_by: { price: asc }
      ) {
        price
      }
    }
    tokens_aggregate: mb_views_nft_tokens_aggregate(
      where: {
        _and: [
          { burned_timestamp: { _is_null: true } }
          { owner: { _eq: $accountId } }
          { nft_contract_id: { _eq: $contractAddress } }
        ]
      }
      distinct_on: metadata_id
    ) {
      aggregate {
        count
      }
    }
  }
  `;
