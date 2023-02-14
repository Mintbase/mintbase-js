import { mbjs } from '@mintbase-js/sdk';
import { META_SERVICE_HOST, MINTBASE_API_KEY_HEADER } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { AttributesFilters, FilteredMetadataQueryResult, FilteredMetadataResult } from './tokensByAttributes.types';

export { AttributesFilters, FilteredMetadataQueryResult, FilteredMetadataResult };

export const tokensByAttributes = async (
  contractId: string,
  filters: AttributesFilters,
): Promise<ParsedDataReturn<FilteredMetadataQueryResult>> => {

  let data;
  let error: string;

  try {
    const res = await fetch(`${META_SERVICE_HOST}/${contractId}/filter`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: { 'Content-type': 'application/json', 
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      },
    });

    if (!res.ok) {
      error = 'Error fetching filtered data';
      throw new Error(error);
    }

    data = await res.json();
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
  const { data, error } = await tokensByAttributes(contractId, filters);
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
};
