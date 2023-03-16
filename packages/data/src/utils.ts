import { ParsedDataReturn } from './types';

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

export const objectWithCamelKeys = (obj: object): object => Object
  .keys(obj)
  .map((key) => ({
    snake: key,
    camel: toCamel(key),
  }))
  .reduce((builder, keys) => ({
    ...builder,
    [keys.camel]: obj[keys.snake],
  }), {});


export const parseData = <T>(data: T, error?: null | string, errorMsg?: string): ParsedDataReturn<T> => {
  if (error) {
    console.error(errorMsg);
    return { error: error };
  }

  return { data: data };
};


export function getTokenArrayFromNodes(nodes: { token_id: string }[]): string[] {
  const arr: string[] = [];
  nodes?.forEach((token: { token_id: string }) => {
    arr.push(token.token_id);
  });
  return arr;
}

export const validContractAddress = (contractAddress: string): boolean => {
  return contractAddress.endsWith('.near') || contractAddress.endsWith('.testnet');

};

export const validTokenId = (tokenId: string | number): boolean => {
  return     typeof tokenId === 'string'
    ? /^\d+$/.test(tokenId)
    : /^\d+$/.test(tokenId.toString());
};

