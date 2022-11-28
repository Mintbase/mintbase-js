import { OwnedNftsData } from './ownedNftsByStore.types';
import { ownedNftsByStore } from './ownedNftsByStore';

import { ownedNftsByStoreMock } from './ownedNftsByStore.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('tokenById', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return token Data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedNftsData> => Promise.resolve(ownedNftsByStoreMock),
    }));

    const result = await ownedNftsByStore('test.testnet','test.mintbase1.near',{ limit: 12, offset: 0 });

    expect(result?.data?.token[0].metadataId).toBe(
      ownedNftsByStoreMock.token[0].metadataId,
    );
  });

  it('should handle errors', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });

    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedNftsData> => Promise.reject(exploded),
    }));
    await expect(ownedNftsByStore('test.testnet','test.mintbase1.near',{ limit: 12, offset: 0 })).rejects.toThrow(
      exploded,
    );
  });

  it('should throw error if all params are wrong', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from undefined, please check the arguments provided';

    // @ts-ignore
    const call = await ownedNftsByStore();

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

  it('should throw error if pagination param are not provided', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from test1.mintbase.near, please check the arguments provided';

    // @ts-ignore
    const call = await ownedNftsByStore('test1.mintbase.near');

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

  it('should throw error if pagination limit param are wrong', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from test1.mintbase.near, please check the arguments provided';

    // @ts-ignore
    const call = await ownedNftsByStore('test1.mintbase.near', { offset: 0 });

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

});
