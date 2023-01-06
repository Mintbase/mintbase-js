import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const tokenMetadataQuery = gql`
query ${QUERY_OPS_PREFIX}_getTokenMetadata(
  $tokenId: String!
  $contractAddress: String!
) {
    mb_views_nft_tokens(
        where: {
        nft_contract_id: { _eq: $contractAddress }
        token_id: { _eq: $tokenId }
        }
        limit: 1
    ) {
        baseUri: base_uri
        burned_receipt_id
        burned_timestamp
        copies
        description
        expires_at
        issued_at
        last_transfer_receipt_id
        last_transfer_timestamp
        media
        minter
        media_hash
        mint_memo
        nft_contract_is_mintbase
        minted_receipt_id
        minted_timestamp
        metadata_id
        document: reference_blob(path: "$.document")
        animationUrl: reference_blob(path: "$.animation_url")
        extra: reference_blob(path: "$.extra")
        reference
        reference_hash
        starts_at
        title
        updated_at
        owner
        royalties
        royalties_percent
        token_id
    }
}`;
