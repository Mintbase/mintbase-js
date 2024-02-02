import { GraphQLClient } from 'graphql-request';
import { accountsByPublicKeyMock } from './accountsByPublicKey.mock';
import { accountsByPublicKey } from './accountsByPublicKey';

jest.mock('graphql-request');

describe('accountsByPublicKey', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return attribute rarity', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<{ accounts: Array<{ id: string }> }> => Promise.resolve(accountsByPublicKeyMock),
    }));

    const result = await accountsByPublicKey('ed25519:yadda');

    expect(result?.data?.length).toBe(1);
    expect(result?.data?.[0]).toBe('foo.testnet');
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<{ accounts: Array<{ id: string }> }> => Promise.reject(new Error(errMessage)),
    }));

    const result = await accountsByPublicKey('ed25519:yadda');

    expect(result).toStrictEqual({ error: errMessage });
  });
});
