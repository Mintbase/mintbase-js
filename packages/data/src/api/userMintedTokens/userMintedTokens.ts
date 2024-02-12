import { Network, mbjs } from '@mintbase-js/sdk';
import { META_SERVICE_HOST, META_SERVICE_HOST_TESTNET, MINTBASE_API_KEY_HEADER } from '../../constants';
import { ParsedDataReturn, UserTokensFilter, UserTokensQueryResult } from '../../types';
import { parseData } from '../../utils';


 interface UserMintedTokensProps {
  accountId: string;
  filters: UserTokensFilter;
  network?: Network;
}

export const getUserMintedTokens = async ({
  accountId,
  filters,
  network,
}: UserMintedTokensProps,
): Promise<ParsedDataReturn<UserTokensQueryResult>> => {

  let data;
  let error: string;

  const { limit, offset, orderBy, listedFilter } = filters;

  const networkFinal = network || mbjs.keys.network;

  const useHost = networkFinal === 'testnet'
    ? META_SERVICE_HOST_TESTNET
    : META_SERVICE_HOST;

  const url = `${useHost}/human/${accountId}/minted?offset=${offset}&limit=${limit}&orderBy=${orderBy}&listedFilter=${listedFilter}`;


  try {
    const res = await fetch(url, {
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
