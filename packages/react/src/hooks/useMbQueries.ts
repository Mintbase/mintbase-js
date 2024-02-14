import { useState, useEffect, useRef } from 'react';
import { graphQLService } from './methods/graphqlService';

interface UseGraphQlQueryResult<TData, TError> {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  refetch: () => void;
}

export interface GQLQueryOptions {
  queryName: string;
  query: string;
  variables: Record<string, unknown>;
}

export const useMbQueries = <TData = unknown, TError = unknown>({
  queryName,
  query,
  variables,
}: GQLQueryOptions): UseGraphQlQueryResult<TData, TError> => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let isCancelled = false; // cancellation flag

  const fetchData = async (): Promise<void>  => {
    setIsLoading(true);
    try {
      const result = await graphQLService({ query, variables });
      if (!isCancelled) {
        setData(result as TData);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err as TError);
      }
    } finally {
      if (!isCancelled) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();

    return (): void => {
      isCancelled = true; // set cancellation flag to true on cleanup
    };
  }, [query, variables]);

  const refetch = (): void => {
    isCancelled = false; // reset cancellation flag before refetch
    fetchData();
  };

  return { data, error, isLoading, refetch };
};
