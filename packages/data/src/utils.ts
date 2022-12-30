import { ParsedDataReturn } from './types';


export const parseData = <T>(data: T, error: null | string, errorMsg: string): ParsedDataReturn<T> => {
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
