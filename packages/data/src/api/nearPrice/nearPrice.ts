import { BINANCE_API, COIN_GECKO_API } from '../../constants';
import { BinanceNearPriceData, CoinGeckoNearPriceData, NearPriceError } from './nearPrice.types';


export const nearPriceFallback = async (): Promise<CoinGeckoNearPriceData> => {
  const geckoApi = await fetch(
    COIN_GECKO_API,
  );
  const data = geckoApi.json();
  return data;
};


const nearPriceData = async (): Promise<string | NearPriceError> => {

  try {
    const req = await fetch(
      BINANCE_API,
    );

    const res: BinanceNearPriceData = await req.json();

    if (!res.price) {
      const price = await nearPriceFallback();
      return price.near.usd;
    }

    return res.price ;

  } catch (error) {
    return { error: 'Error fetching NEAR price' };
  }

};

export const nearPrice = async (): Promise<string | NearPriceError> => {

  const price = await nearPriceData();

  return price;
};
