import { Network, mbjs } from '@mintbase-js/sdk';
import { META_SERVICE_HOST, META_SERVICE_HOST_TESTNET, MINTBASE_API_KEY_HEADER } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import { Attributes } from './attributesByContract.type';

export const attributesByContract = async (
  contractId: string,
  network?: Network,
): Promise<ParsedDataReturn<Attributes>> => {

  let data;
  let error: string;

  const networkFinal = network  ||  mbjs.keys.network;

  const useHost = networkFinal === 'testnet'
    ? META_SERVICE_HOST_TESTNET
    : META_SERVICE_HOST;

  try {
    const res = await fetch(`${useHost}/stores/${contractId}/attributes`, {
      method: 'GET',
      headers: {
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      },
    });

    if (!res.ok) {
      error = 'Error fetching attributes data';
      throw new Error(error);
    }

    data = await res.json();
  } catch (err) {
    error = `Error fetching attributes data, ${err}`;
  }

  return parseData<Attributes>(
    data,
    error,
    error,
  );
};

export const attributesByContractThrowOnError = async (
  contractId: string,
): Promise<Attributes> => {
  const { data, error } = await attributesByContract(contractId);
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
};
