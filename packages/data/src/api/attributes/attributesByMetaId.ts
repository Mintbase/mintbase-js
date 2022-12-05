/* eslint-disable @typescript-eslint/camelcase */
import { fetchGraphQl } from '../../graphql/fetch';
import { attributesByMetaIdQuery } from './attributesByMetaId.query';

export type NftAttributesQueryResult = {
  nft_attributes: Attribute[];
}

export type Attribute = {
  attribute_display_type?: string | null;
  attribute_value?: string | null;
  attribute_type?: string | null;
}

export const attributesByMetaId = async (
  nft_metadata_id: string,
): Promise<Attribute[]> => {
  const { data, error } = await fetchGraphQl<NftAttributesQueryResult>({
    query: attributesByMetaIdQuery,
    variables: {
      nft_metadata_id,
    },
  });
  if (error) {
    console.error('Error fetching attributes for nft_metadata_id', error.message);
    throw error;
  }
  return data.nft_attributes;
};

