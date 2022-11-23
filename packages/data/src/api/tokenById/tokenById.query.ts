import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokenByIdQuery = gql`
query ${QUERY_OPS_PREFIX}_tokenById(
    $tokenId: String!
    $contractAddress: String!
  ) {
    tokenData: mb_views_nft_tokens(
      where: {
        nft_contract_id: { _eq: $contractAddress }
        token_id: { _eq: $tokenId }
      }
      limit: 1
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

    tokenListingsAggregate: mb_views_active_listings_aggregate(
      where: {
        token_id: { _eq: $tokenId }
        kind: { _eq: "auction" }
        nft_contract_id: { _eq: $contractAddress }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
