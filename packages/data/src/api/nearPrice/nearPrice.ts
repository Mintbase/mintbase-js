import { BINANCE_API, COIN_GECKO_API } from '../../constants';
import { BinanceNearPriceData, CoinGeckoNearPriceData } from './nearPrice.types';

export const nearPrice = async (): Promise<string> => {
  // const req = await fetch(
  //   BINANCE_API,
  // ).then(async (res) => {
  //   const finalPrice = await res?.json();

  //   console.log(res.json());
  //   return (finalPrice as BinanceNearPriceData).price;
  // }).catch( (err) => fetch(COIN_GECKO_API).then(async (res) => {
  //   const finalPrice = await res?.json();

  //   return (finalPrice as CoinGeckoNearPriceData)?.near?.usd;
  // }));

  try {
    const priceData = await fetch(
      BINANCE_API,
    );

    console.log(priceData);
    
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
