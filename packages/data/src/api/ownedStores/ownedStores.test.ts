import { GraphQLClient } from 'graphql-request';
import { OwnedStoresData } from './ownedStores.types';
import { ownedStoresMock } from './ownedStores.mock';
import { ownedStores } from './ownedStores';

jest.mock('graphql-request');

describe('ownedStores', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return owned stores Data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedStoresData> => Promise.resolve(ownedStoresMock),
    }));

    const result = await ownedStores('test.near');

    expect(result?.data).toBe(
      ownedStoresMock,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedStoresData> => Promise.reject(new Error(errMessage)),
    }));

    const call = await ownedStores('test.near');

    expect(call).toStrictEqual({ error: errMessage });

  });

});
