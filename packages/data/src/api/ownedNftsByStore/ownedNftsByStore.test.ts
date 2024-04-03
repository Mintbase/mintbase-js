import { OwnedNftsData } from './ownedNftsByStore.types';
import { ownedNftsByStore } from './ownedNftsByStore';

import { ownedNftsByStoreMock } from './ownedNftsByStore.mock';
import { GraphQLClient } from 'graphql-request';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');

const props = {
  ownerId: 'rub3n.testnet',
  contractAddress: 'audiobr.mintspace2.testnet',
  pagination:  { limit: 20, offset: 0 },
  network: 'testnet' as Network,
};

describe('tokenById', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
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


    const result = await ownedNftsByStore(props);

    expect(result?.data?.token[0].metadataId).toBe(
      ownedNftsByStoreMock.token[0].metadataId,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<OwnedNftsData> => Promise.reject(new Error(errMessage)),
    }));

    const call = await ownedNftsByStore(props);

    expect(call).toStrictEqual({ error: errMessage });

  });


  it('should throw error if all params are wrong', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from undefined, please check the arguments provided';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const call = await ownedNftsByStore({ ownerId: undefined });

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

  it('should throw error if pagination param are not provided', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from test1.mintbase.near, please check the arguments provided';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const call = await ownedNftsByStore({ ownerId: 'test1.mintbase.near', contractAddress: 'aaa' });

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

  it('should throw error if pagination limit param are wrong', async () => {

    const consoleSpy = jest.spyOn(console, 'error');

    const errorMessage = 'Error fetching nfts from test1.mintbase.near, please check the arguments provided';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const call = await ownedNftsByStore({ ownerId: 'test1.mintbase.near', pagination: { limit: 'xxx', offset: 0 }, contractAddress: 'aaa' });

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    expect(call).toBeNull();

  });

});
