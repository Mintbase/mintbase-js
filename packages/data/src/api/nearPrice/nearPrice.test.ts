import * as methods from './nearPrice';
import { nearPriceMock } from './nearPrice.mock';


describe('nearPrice Test', () => {
  test('getNearPrice by Binance', async () => {

    const mockFetch = Promise.resolve({ json: () => Promise.resolve({ price: '1490000' }) });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.fetch = jest.fn().mockImplementation(() => mockFetch);
    jest.spyOn(methods, 'nearPriceFallback');

    expect(methods.nearPriceFallback).not.toHaveBeenCalled();

    const args = await methods.nearPrice();

    expect(args).toEqual(nearPriceMock);
  });


  test('getNearPrice by GECKO_API', async () => {

    const mockFetch = Promise.resolve({ json: () => Promise.resolve({ price: null }) });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.fetch = jest.fn().mockImplementation(() => mockFetch);

    jest.spyOn(methods, 'nearPriceFallback');


    await methods.nearPrice();

    expect(methods.nearPriceFallback).toHaveBeenCalled();

  
  });


  test('error', async () => {
    

    const mockFetch = Promise.reject(undefined);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    global.fetch = jest.fn().mockImplementation(() => mockFetch);

    jest.spyOn(methods, 'nearPriceFallback');
    jest.spyOn(methods, 'nearPrice');


    const nearPriceData =  await methods.nearPrice();

    expect(methods.nearPrice).toHaveBeenCalled();
    expect(methods.nearPriceFallback).toHaveBeenCalled();

    expect(nearPriceData).toEqual({ error: 'Error fetching NEAR price' });
  });

});
