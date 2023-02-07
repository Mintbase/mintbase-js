import { GraphQLClient } from 'graphql-request';
import { contractAttributes } from './contractAttributes';
import { ContractAttributesDataResults } from './contractAttributes.types';
import { contractAttributesMock } from './contractAttributes.mock';

jest.mock('graphql-request');

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
    expect(call.error).toEqual(errMessage );
  });
});
