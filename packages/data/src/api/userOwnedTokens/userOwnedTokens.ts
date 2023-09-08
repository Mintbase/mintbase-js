import { mbjs } from '@mintbase-js/sdk';
import { META_SERVICE_HOST, META_SERVICE_HOST_TESTNET, MINTBASE_API_KEY_HEADER } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { ORDER_BY_VALUE, UserTokensQueryResult, UserTokensFilter } from './userOwnedTokens.types';

export { UserTokensQueryResult, ORDER_BY_VALUE, UserTokensFilter };

export const getUserOwnedTokens = async (
  accountId: string,
  filters: UserTokensFilter,
): Promise<ParsedDataReturn<UserTokensQueryResult>> => {
  
  let data;
  let error: string;

  const { limit, offset, orderBy, listedFilter } = filters;

  const useHost = mbjs.keys.network === 'testnet'
    ? META_SERVICE_HOST_TESTNET
    : META_SERVICE_HOST;

  try {
    const res = await fetch(`${useHost}/human/${accountId}/owned?offset=${offset}&limit=${limit}&orderBy=${orderBy}&listedFilter=${listedFilter}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json',
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      },
    });

    if (!res.ok) {
      error = 'Error fetching human owned nfts';
      throw new Error(error);
    }

    data = await res.json();
  } catch (err) {
    error = `Error fetching human owned nfts, ${err}`;
  }


  return parseData<UserTokensQueryResult>(
    data,
    error,
    error,
  );
};
