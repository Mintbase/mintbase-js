import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const dynamicNftMetadataQuery = gql`
query ${QUERY_OPS_PREFIX}_dynamicNftMetadata(
    $contractAddress: String!
    $internalMetadataId: numeric!
    $isActive: Boolean!
  ) @cached {
    nft_metadata(
      where: {
        nft_contract_id: { _eq: $contractAddress }
        mb_internal_id: { _eq: $internalMetadataId }
        is_active: { _eq: $isActive }
      }
    ) {
      metadataId: id
      contractAddress: nft_contract_id
      internalMetadataId: mb_internal_id
      reference
      referenceBlob: reference_blob
      media
      document: reference_blob(path: "$.document")
      animationUrl: reference_blob(path: "$.animation_url")
      extra: reference_blob(path: "$.extra")
      price
      mintersAllowlist: minters_allowlist
      royalties
      royaltyPercent: royalty_percent
      maxSupply: max_supply
      lastPossibleMint: last_possible_mint
      isLocked: is_locked
      isActive: is_active
    }
    nft_metadata_aggregate(where: {
      nft_contract_id: { _eq: $contractAddress }
      mb_internal_id: { _eq: $internalMetadataId }
    }) {
      aggregate {
        count
      }
    }
  }
`;
