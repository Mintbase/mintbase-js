import { mbjs } from '@mintbase-js/sdk';
import { META_SERVICE_HOST, META_SERVICE_HOST_TESTNET, MINTBASE_API_KEY_HEADER } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { objectWithCamelKeys, parseData } from '../../utils';
import { AttributesFilters, FilteredMetadataQueryResult, FilteredMetadataResult, TokensByAttributesProps } from './tokensByAttributes.types';

export { AttributesFilters, FilteredMetadataQueryResult, FilteredMetadataResult };

export const tokensByAttributes = async ({
  contractId,
  filters,
  network,
}: TokensByAttributesProps,
): Promise<ParsedDataReturn<FilteredMetadataQueryResult>> => {

  let data: { results: FilteredMetadataResult[], totalRecords: number };
  let error: string;

  const networkFinal = network  || mbjs.keys.network;

  const useHost = networkFinal === 'testnet'
    ? META_SERVICE_HOST_TESTNET
    : META_SERVICE_HOST;

  const filtersString = JSON.stringify(filters);
  const filtersBase64 = Buffer.from(filtersString).toString('base64');

  try {
    const res = await fetch(`${useHost}/stores/${contractId}/filter?args=${filtersBase64}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json',
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      },
    });

    if (!res.ok) {
      error = 'Error fetching filtered data';
      throw new Error(error);
    }

    data = await res.json();
    // transform results to camel case
    data.results = data.results.map(objectWithCamelKeys) as FilteredMetadataResult[];

  } catch (err) {
    error = `Error fetching filtered data, ${err}`;
  }


  return parseData<FilteredMetadataQueryResult>(
    data,
    error,
    error,
  );
};

export const tokensByAttributesThrowOnError = async (
  contractId: string,
  filters: AttributesFilters,
): Promise<FilteredMetadataQueryResult> => {
  const { data, error } = await tokensByAttributes({ contractId, filters });
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
};
