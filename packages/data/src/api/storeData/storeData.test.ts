import { storeData } from './storeData';
import { StoreDataResults } from './storeData.types';

import { GraphQLClient } from 'graphql-request';
import { storeDataMock } from './storeData.mock';

jest.mock('graphql-request');

describe('storeData', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return store Data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreDataResults> => Promise.resolve(storeDataMock),
    }));

    const result = await storeData('test.mintbase1.near');

    expect(result?.data).toBe(
      storeDataMock,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<StoreDataResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await storeData('test.mintbase1.near');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
