/* eslint-disable @typescript-eslint/camelcase */
import { fetchGraphQl } from '../../graphql/fetch';
import { Attribute, NftAttributesQueryResult, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { attributesByMetaIdQuery } from './attributesByMetaId.query';

export const attributesByMetaId = async (
  nft_metadata_id: string,
): Promise<ParsedDataReturn<Attribute[]>> => {


  const { data, error } = await fetchGraphQl<NftAttributesQueryResult>({
    query: attributesByMetaIdQuery,
    variables: {
      nft_metadata_id,
    },
  });

  const errorMsg = `Error fetching attributes for nft_metadata_id, ${error?.message}`;

  return parseData<Attribute[]>(data?.nft_attributes,error,errorMsg);

};

