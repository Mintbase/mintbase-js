export interface BinanceNearPriceData  {
    price?: string;
}

export interface CoinGeckoNearPriceData {
    near?: {usd: string};
}

export interface NearPriceData {
    nearPrice: string;
}

export interface NearPriceError {
    error: string;
} 
