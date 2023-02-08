import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { Pagination, ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { tokensByAttributesQuery } from './tokensByAttributes.query';
import { AttributesFilters, TokensByAttributesDataResults } from './tokensByAttributes.types';

export const tokenOwner = async (
  filters: AttributesFilters,
): Promise<ParsedDataReturn<string>> => {
  // const { data, error } = await fetchGraphQl<TokensByAttributesDataResults>({
  //   query: tokensByAttributesQuery,
  //   variables: {
  //     contractAddress,
  //     search_fields: null,
  //     limit: pagination?.limit ?? 12,
  //     offset: pagination?.offset ?? 0,
  //   },
  //   ...(network && { network:network }),
  // });

  let data;
  let error: string;

  try {
    const res = await fetch('https://meta.mintbase.xyz/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: { 'Content-type': 'application/json' },
    });

    if (!res.ok) {
      error = 'Error fetching filtered data';
    }

    data = await res.json();
  } catch (err) {
    error = `Error fetching filtered data, ${err}`;
  }


  return parseData<any>(
    data,
    error,
    error,
  );
};
