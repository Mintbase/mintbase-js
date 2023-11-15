import { useEffect, useState } from 'react';
import { nearPrice } from './methods/nearPrice';

type UseNearPriceReturn = {
  nearPrice: number;
  error: string;
}

export const useNearPrice = (): UseNearPriceReturn => {
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const nearPriceData = async (): Promise<void> => {
      const { data, error } = await nearPrice();
      if (error) {
        setError(error);
        return;
      }
      setPrice(Number(data));
    };
    nearPriceData();
  }, []);

  return {
    nearPrice: price,
    error,
  };
};
