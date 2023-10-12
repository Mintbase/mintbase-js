import fetch from 'isomorphic-unfetch';
import { getAccessKeys } from './keys';

jest.mock('isomorphic-unfetch');

describe('keys', () => {
  it('should return access keys for accounts', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          keys: [
            { public_key: 'pubkey', permission: 'FullAccess' },
          ],
        },
      }),
    });
    const res = await getAccessKeys('benipsen.near');
    expect(res.length).toBe(1);
    expect(res[0].public_key).toBe('pubkey');
    expect(res[0].permission).toBe('FullAccess');
  });
});
