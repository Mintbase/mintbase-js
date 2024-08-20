import fetch from 'cross-fetch';
import { accountExists } from './account';

jest.mock('cross-fetch');

describe('accountExists', () => {
  it('should return true when the account exists', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          amount: '123',
        },
      }),
    });

    expect(
      await accountExists({accountId: 'root.near', rpcUrl: 'rpc'}),
    ).toBe(true);
  });

  it('should return false when the account does not exist', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        error: 'nolpe',
      }),
    });

    expect(
      await accountExists({accountId: 'xyz&&&.near', rpcUrl: 'rpc'}),
    ).toBe(false);
  });
});
