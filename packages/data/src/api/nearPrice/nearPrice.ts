import { BINANCE_API } from '../../constants';
import { BinanceNearPriceData } from './nearPrice.types';

export const nearPrice = async (): Promise<string> => {
  try {
    const priceData = await fetch(
      BINANCE_API,
    );
    
    const res = await priceData.json();

    const final = (res as BinanceNearPriceData).price;

    if (!final) {
      return 'Error fetching NEAR price';
    }
    return final;
  } catch (error) {
    return 'Error fetching NEAR price';
  }
};
