import fetch from 'cross-fetch';
import { BINANCE_API, COIN_GECKO_API } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import {
  NearPriceData,
  CoinGeckoNearPriceData,
} from './nearPrice.types';


async function fetchPrice<T>(url: string, tokenPrice: (data: T) => NearPriceData): Promise<NearPriceData> {
  const req = await fetch(url);
  const data = await req.json() as T;
  return tokenPrice(data);
}

export const nearPrice = async (): Promise<ParsedDataReturn<string>> => {
  try {
    const res = await fetchPrice<NearPriceData>(BINANCE_API, data => data)
      .catch(async (err) => {
        console.log('First API call failed, trying second API', err);
        return await fetchPrice<CoinGeckoNearPriceData>(COIN_GECKO_API, data => ({ price: data.near.usd }));
      });

    console.log(res, 'res');
    return parseData(res.price);
  } catch (err) {
    console.error(
      `No price data was able to be fetched ${JSON.stringify(err.errors)}`,
    );
    return parseData(null, err, err.message);
  }
};
