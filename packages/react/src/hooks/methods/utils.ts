import { ParsedDataReturn } from './types';

export const parseData = <T>(data: T, error?: null | string, errorMsg?: string): ParsedDataReturn<T> => {
  if (error) {
    console.error(errorMsg);
    return { error: error };
  }

  return { data: data };
};
