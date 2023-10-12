import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { accountsByPublicKeyQuery } from './accountsByPublicKey.query';
import { AccountsByPublicKeyResults } from './accountsByPublicKey.type';

export const accountsByPublicKey = async (
  publicKey: string,
  network?: Network,
): Promise<ParsedDataReturn<string[]>> => {


  const { data, error } = await fetchGraphQl<AccountsByPublicKeyResults>({
    query: accountsByPublicKeyQuery,
    variables: { publicKey },
    ...(network && { network:network }),
  });

  const errorMsg = error ? `Error fetching accounts by public key, ${error}` : '';

  const accountIds = data.accounts.map(a => a.id);

  return parseData<string[]>(accountIds, error, errorMsg);

};
