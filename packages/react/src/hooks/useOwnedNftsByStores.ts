import { useEffect, useState } from 'react';
import { ownedNftsByStore } from '@mintbase-js/data';
import { OwnedNftsData } from '@mintbase-js/data/lib/api/ownedNftsByStore/ownedNftsByStore.types';
import { mbjs } from '@mintbase-js/sdk';

interface OwnedNftsByStoreHookResult {
  data: OwnedNftsData | undefined;
  error: string | null;
  loading: boolean;
}

export const useOwnedNftsByStore = (
  ownerId: string,
  contractAddress: string = mbjs.keys.contractAddress,
  pagination: { limit: number; offset?: number},
): OwnedNftsByStoreHookResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setData] = useState<OwnedNftsData | undefined>(undefined);
  const [errorMsg, setError] = useState<string | null>(null);

  const contract = contractAddress || mbjs.keys.contractAddress;


  const validParams = contract && ownerId && pagination.limit;

  useEffect(() => {
    let isCancelled = false;

    if (loading && validParams) {
      (async (): Promise<void> => {
        const { data, error } = await ownedNftsByStore(ownerId, contract, pagination);

        if (error) {
          setError(error as string);
          setLoading(false);
        } else if (data) {
          setData(data);
          setLoading(false);
        }
      })();
    }

    return (): void => {
      isCancelled = true;
    };
  }, [ownerId, pagination]);

  return { data: res, loading: loading, error: errorMsg };
};
