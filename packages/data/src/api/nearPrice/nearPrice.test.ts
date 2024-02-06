import { nearPrice } from './nearPrice';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');


describe('nearPrice', () => {
  it('returns first fulfilled promise (binance or gecko)', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          near: {
            usd: '123',
          },
        }),
      })
      .mockRejectedValueOnce({
        binance: 'broken',
      });

    const { data, error } = await nearPrice();
    expect(data).toBe('123');
    expect(error).toBeUndefined();
  });

  it('returns error when all options fail', async () => {
    (fetch as jest.Mock)
      .mockRejectedValueOnce({
        gecko: 'broken',
      })
      .mockRejectedValueOnce({
        binance: 'broken',
      });

    const { data, error } = await nearPrice();
    expect(data).toBeUndefined();
    expect(error).toBeDefined();
  });

});
