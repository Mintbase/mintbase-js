import { contractMinters } from './contractMinters';
import { ContractMintersResults } from './contractMinters.types';

import { GraphQLClient } from 'graphql-request';
import { contractMintersMock } from './contractMinters.mock';

jest.mock('graphql-request');

describe('contractMinters', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return store minters', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ContractMintersResults> => Promise.resolve(contractMintersMock),
    }));

    const minters = ['minter1.near', 'minter2.near'];
    const result = await contractMinters('test.mintbase1.near');

    expect(result?.data).toStrictEqual(
      minters,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ContractMintersResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await contractMinters('test.mintbase1.near');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
