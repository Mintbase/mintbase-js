import { storeNfts } from './storeNfts';
import { StoreNftsResult } from './storeNfts.types';

import { GraphQLClient } from 'graphql-request';
import { storeListedNftsMock, storeNftsMock } from './storeNfts.mock';

jest.mock('graphql-request');

describe('storeNfts', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all store Nfts', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreNftsResult> => Promise.resolve(storeNftsMock),
    }));

    const result = await storeNfts('test.mintbase1.near');

    expect(result?.data).toBe(
      storeNftsMock,
    );
  });

  it('should return only listed store Nfts', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreNftsResult> => Promise.resolve(storeListedNftsMock),
    }));

    const result = await storeNfts('test.mintbase1.near', true);

    expect(result?.data).toBe(
      storeListedNftsMock,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreNftsResult> => Promise.reject(new Error(errMessage)),
    }));

    const call = await storeNfts('test.mintbase1.near');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
