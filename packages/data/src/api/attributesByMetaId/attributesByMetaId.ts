import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { Attribute, NftAttributesQueryResult, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { attributesByMetaIdQuery } from './attributesByMetaId.query';

export const attributesByMetaId = async (
  nft_metadata_id: string,
  network?: Network,
): Promise<ParsedDataReturn<Attribute[]>> => {


  const { data, error } = await fetchGraphQl<NftAttributesQueryResult>({
    query: attributesByMetaIdQuery,
    variables: {
      nft_metadata_id,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching attributes for nft_metadata_id, ${error}` : '';

  return parseData<Attribute[]>(data?.nft_attributes, error, errorMsg);

};

