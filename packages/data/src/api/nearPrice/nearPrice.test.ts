/**
 * @jest-environment jsdom
 */


import fetchMock from 'jest-fetch-mock';
import { nearPriceMock } from './nearPrice.mock';
import { nearPrice } from './nearPrice';

fetchMock.enableMocks();

describe('getNearPrice', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('returns data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify( {
      json: () => Promise.resolve(nearPriceMock),
    } as Response));

    const result = await nearPrice();

    expect(result).toEqual(nearPriceMock);
  });


  test('should handle errors', async () => {
    const errorMsg = 'Error fetching NEAR price';
    fetchMock.mockResponseOnce(JSON.stringify( {
      json: () => Promise.reject(new Error(errorMsg)),
    } as Response));

    const call = await nearPrice();
    expect(call).toStrictEqual(errorMsg);

  });
});
