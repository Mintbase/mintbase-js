import { useEffect, useState } from 'react';
import { tokenById } from '@mintbase-js/data';
import { TokenByIdResults } from '@mintbase-js/data/lib/api/tokenById/tokenById.types';
import { mbjs } from '@mintbase-js/sdk';

interface TokenByIdHookResult {
  data: TokenByIdResults | undefined;
  error: string | null;
  loading: boolean;
}

export const useTokenById = (
  tokenId: string,
  contractAddress: string,
): TokenByIdHookResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setData] = useState<TokenByIdResults | undefined>(undefined);
  const [errorMsg, setError] = useState<string | null>(null);

  const contract = contractAddress || mbjs.keys.contractAddress;
  const validParams = contract && tokenId; 


  useEffect(() => {
    let isCancelled = false;
    
    if (loading && validParams) {
      (async (): Promise<void> => {
        const { data, error } = await tokenById(tokenId, contract);

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
  }, [tokenId, contractAddress]);

  return { data: res, loading: loading, error: errorMsg };
};
