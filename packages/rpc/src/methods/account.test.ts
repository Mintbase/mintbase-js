import fetch from 'isomorphic-unfetch';
import { accountExists } from './account';

jest.mock('isomorphic-unfetch');

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
      await accountExists('benipsen.near'),
    ).toBe(true);
  });

  it('should return false when the account does not exist', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        error: 'nolpe',
      }),
    });

    expect(
      await accountExists('notreal.near'),
    ).toBe(false);
  });
});
