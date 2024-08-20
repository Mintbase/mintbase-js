import fetch from 'cross-fetch';
import { AccessKey, getAccessKeys } from './keys';

jest.mock('cross-fetch');

describe('keys', () => {
  const getRes = async (): Promise<AccessKey[]> => await getAccessKeys({'nate.near', rpcUrl: 'rpc'});

  it('should return access keys for accounts', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          keys: [
            { public_key: 'pubkey', access_key: { permission: 'FullAccess' } },
          ],
        },
      }),
    });
    const res = await getRes();
    expect(res.length).toBe(1);
    expect(res[0].public_key).toBe('pubkey');
    expect(res[0].access_key.permission).toBe('FullAccess');
  });

  it('should throw on returned error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: { error: 'some error' },
      }),
    });

    await expect(getRes).rejects.toThrow('some error');
  });

  it('should throw on malformed response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: { foo: 'bar' },
      }),
    });

    await expect(getRes).rejects.toThrow('Malformed response');
  });
});
