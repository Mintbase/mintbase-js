/**
 * @jest-environment jsdom
 */


import fetchMock from 'fetch-mock';
import { BINANCE_API } from '../../constants';
import { nearPrice } from './nearPrice';
import { nearPriceMock } from './nearPrice.mock';

describe('getNearPrice', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);
  });

  beforeEach(() => {
    fetchMock.reset();
  });

  test('returns data', async () => {
    fetchMock.mock(BINANCE_API, JSON.stringify({ price: nearPriceMock }));

    const result = await nearPrice();

    expect(result).toEqual(nearPriceMock);
  });


  test('should handle errors', async () => {
    const errorMsg = 'Error fetching NEAR price';
    fetchMock.mock(BINANCE_API, JSON.stringify({}));

    const call = await nearPrice();
    expect(call).toStrictEqual(errorMsg);

  });
});
