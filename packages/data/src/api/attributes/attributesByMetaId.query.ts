import { gql } from 'graphql-request';
import { QUERY_OPS_PREFIX } from '../../constants';

export const attributesByMetaIdQuery = gql`
query ${QUERY_OPS_PREFIX}_getAttributesByMetaId(
  $nft_metadata_id: String!
) {
    nft_attributes(where: {nft_metadata_id: {_eq: $nft_metadata_id}}){
      attribute_display_type
      attribute_value
      attribute_type
    }
}`;


