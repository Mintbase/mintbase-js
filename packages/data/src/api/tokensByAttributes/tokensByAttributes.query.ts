import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokensByAttributesQuery = gql`
query ${QUERY_OPS_PREFIX}_getTokensByAttributes(
  $contractAddress: String!
  $limit: String!
  $offset: String!
) {
  mb_views_nft_tokens(
    where: {
      nft_contract_id: { _eq: $contractAddress }
    }
    limit: $limit
    $offset: $offset
  ) {
    baseUri: base_uri
    burnedReceiptId: burned_receipt_id
    burnedTimestamp: burned_timestamp
    copies
    description
    expiresAt: expires_at
    issuedAt: issued_at
    lastTransferReceiptId: last_transfer_receipt_id
    lastTransferTimeStamp: last_transfer_timestamp
    media
    minter
    mediaHash: media_hash
    mintMemo: mint_memo
    isMintbaseContract: nft_contract_is_mintbase
    mintedReceiptId: minted_receipt_id
    mintedTimestamp: minted_timestamp
    metadataId: metadata_id
    document: reference_blob(path: "$.document")
    animationUrl: reference_blob(path: "$.animation_url")
    extra: reference_blob(path: "$.extra")
    reference
    referenceHash: reference_hash
    startsAt: starts_at
    title
    updatedAt: updated_at
    owner
    royalties
    royaltiesPercent: royalties_percent
    tokenId: token_id
  }

  mb_views_nft_tokens_aggregate(    where: {
    nft_contract_id: { _eq: $contractAddress }
  }) {
    aggregate {
      count
    }
  }
}
`;
