import { META_SERVICE_HOST } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { AttributesFilters, FilteredMetadataResult } from './tokensByAttributes.types';
import 'isomorphic-fetch';

export const tokensByAttributes = async (
  contractId: string,
  filters: AttributesFilters,
): Promise<ParsedDataReturn<FilteredMetadataResult[]>> => {

  let data;
  let error: string;

  try {
    const res = await fetch(`${META_SERVICE_HOST}/${contractId}/filter`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: { 'Content-type': 'application/json' },
    });

    if (!res.ok) {
      error = 'Error fetching filtered data';
      throw new Error(error);
    }

    data = await res.json();
  } catch (err) {
    error = `Error fetching filtered data, ${err}`;
  }

  return parseData<FilteredMetadataResult[]>(
    data,
    error,
    error,
  );
};

export const tokensByAttributesThrowOnError = async (
  contractId: string,
  filters: AttributesFilters,
): Promise<FilteredMetadataResult[]> => {
  const { data, error } = await tokensByAttributes(contractId, filters);
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
};
