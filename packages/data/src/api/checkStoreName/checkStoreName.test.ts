import { checkStoreName } from './checkStoreName';
import { StoreNameResults } from './checkStoreName.types';

import { GraphQLClient } from 'graphql-request';
import { STORE_NAME_MOCK } from './checkStoreName.mock';

jest.mock('graphql-request');

describe('storeData', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return store name', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreNameResults> => Promise.resolve(STORE_NAME_MOCK),
    }));

    const result = await checkStoreName('test');

    expect(result?.data).toBe(
      STORE_NAME_MOCK,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreNameResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await checkStoreName('test');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
