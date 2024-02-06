import fetch from 'cross-fetch';
import { BINANCE_API, COIN_GECKO_API } from '../../constants';
import { ParsedDataReturn } from '../../types';
import { parseData } from '../../utils';
import {
  NearPriceData,
  CoinGeckoNearPriceData,
} from './nearPrice.types';


export const fetchPriceFromCoinGecko = async (): Promise<NearPriceData> => {
  const req = await fetch(COIN_GECKO_API);
  const data = await req.json() as CoinGeckoNearPriceData;
  return { price: data.near.usd };
};

export const fetchPriceFromBinance = async (): Promise<NearPriceData> => {
  const req = await fetch(BINANCE_API);
  const data = await req.json() as NearPriceData;
  return data;
};

export const nearPrice = async (): Promise<ParsedDataReturn<string>> => {
  try {
    const res = await Promise.any([
      fetchPriceFromCoinGecko(),
      fetchPriceFromBinance(),
    ]);

    return parseData(res.price);
  } catch (err) {
    console.error(
      `No price data was able to be fetched ${JSON.stringify(err.errors)}`,
    );
    return parseData(null, err, err.message);
  }
};
