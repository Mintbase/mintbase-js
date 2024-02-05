import BN from 'bn.js';
import fetch from 'cross-fetch';
import { getBalance } from './balance';

jest.mock('cross-fetch');

describe('getBalance', () => {
  it('should return a numeric, non-negative block height', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          amount: '123',
        },
      }),
    });

    const b = await getBalance('foo.near');
    expect(b instanceof BN).toBe(true);
    expect(b.eq(new BN(123))).toBe(true);
  });
});
