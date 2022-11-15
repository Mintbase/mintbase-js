import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../constants';

export const ownedTokensQuery = gql`
query ${QUERY_OPS_PREFIX}_getOwnedTokens(
  $ownerId: String!
  $limit: Int
  $offset: Int
) @cached(ttl: 120) {
  tokens: mb_views_nft_owned_tokens(
    where: {
      owner: { _eq: $ownerId }
    }
    limit: $limit
    offset: $offset
  ) {
    lastTransferredAt: last_transfer_timestamp
    tokenId: token_id
    contractId: nft_contract_id
    baseUri: base_uri
    metadataId: metadata_id
    title
    minter
    media
    document: reference_blob(path: "$.document")
    animationUrl: reference_blob(path: "$.animation_url")
  }
}`;
