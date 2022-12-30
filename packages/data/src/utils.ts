import { GraphqlFetchingError } from './graphql/fetch';
import { ParsedDataReturn } from './types';


export const parseData = <T>(data: T, error: null | GraphqlFetchingError, errorMsg: string): ParsedDataReturn<T> => {
  if (error) {
    console.error(errorMsg);
    return { data: null, error: error };
  }

  return { data: data, error: null };
};
