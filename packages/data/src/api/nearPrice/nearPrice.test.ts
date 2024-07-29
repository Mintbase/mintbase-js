import { nearPrice } from './nearPrice';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

beforeEach(() => {
  jest.resetAllMocks(); // Reset all mocks before each test
});

describe('nearPrice', () => {
  it('returns first fulfilled promise binance', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ price: '123' }),
      })
      .mockRejectedValueOnce({
        gecko: 'broken',
      });

    const { data, error } = await nearPrice();
    expect(data).toBe('123');
    expect(error).toBeUndefined();
  });

  it('returns second fulfilled promise gecko if binance fails', async () => {
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Binance API failed'))
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ near: { usd: '123' } }), // Adjusted to match the expected structure
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
