import { contractAttributes } from './contractAttributes';
import { ContractAttributesDataResults } from './contractAttributes.types';

import { GraphQLClient } from 'graphql-request';
import { contractAttributesMock } from './contractAttributes.mock';

describe('contractAttributes', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return contract attributes', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ContractAttributesDataResults> => Promise.resolve(contractAttributesMock),
    }));

    const result = await contractAttributes('test.mintbase1.near');

    expect(result?.data).toBe(
      contractAttributesMock,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ContractAttributesDataResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await contractAttributes('test.mintbase1.near');

    expect(call).toStrictEqual({ error: errMessage });

  });
});
