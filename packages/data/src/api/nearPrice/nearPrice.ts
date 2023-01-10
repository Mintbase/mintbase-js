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

  const res =  await fetch(
    BINANCE_API);

  const price = await res?.json();
  console.log(price);

  if (!price) {
    return 'Error fetching NEAR price';
  }

  return (price as BinanceNearPriceData).price;
};
