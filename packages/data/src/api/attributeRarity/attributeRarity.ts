import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { attributeRarityQuery } from './attributeRarity.query';
import { AttributeRarityResults } from './attributeRarity.type';

export const attributeRarity = async (
  contractId: string,
  attributeType: string,
  attributeValue: string,
  network?: Network,
): Promise<ParsedDataReturn<string>> => {


  const { data, error } = await fetchGraphQl<AttributeRarityResults>({
    query: attributeRarityQuery,
    variables: {
      contractId,
      attributeType: attributeType || '',
      attributeValue: attributeValue || '',
    },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching attribute rarity, ${error}` : '';

  const rarity = `${(data?.amountValues?.aggregate?.count / data?.totalTypes?.aggregate?.count * 100).toFixed(2)}%`;

  return parseData<string>(rarity, error, errorMsg);

};
