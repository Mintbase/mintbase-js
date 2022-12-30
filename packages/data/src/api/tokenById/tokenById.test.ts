import { tokenById } from './tokenById';
import { TokenByIdResults } from './tokenById.types';

import { tokenByIdMock } from './tokenById.mock';
import { GraphQLClient } from 'graphql-request';
import { errorContractAddress, errorToken } from './tokenById.errors';

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
      request: (): Promise<TokenByIdResults> => Promise.resolve(tokenByIdMock),
    }));

    const result = await tokenById('1', 'test.mintbase1.near');

    expect(result?.data?.tokenData[0].media).toBe(
      tokenByIdMock.tokenData[0].media,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenByIdResults> => Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenById('123', 'address.near');

    expect(call).toStrictEqual({ error: errMessage });

  });


  it('should throw error if tokenId type is wrong', async () => {
    const tokenId = '1aa';
    const address = 'test.mintbase1.near';

    const consoleSpy = jest.spyOn(console, 'error');

    const errorReturn = {
      data: undefined,
      error: errorToken.message,
    };

    const call = await tokenById(tokenId, address);

    expect(consoleSpy).toHaveBeenCalledWith(errorToken.message);

    expect(call).toEqual(errorReturn);
  });

  it('should throw error if contract type is wrong', async () => {
    const tokenId = '123';
    const address = 'test.mintbase1.eth';

    const consoleSpy = jest.spyOn(console, 'error');

    const errorReturn = {
      data: undefined,
      error: errorContractAddress.message,
    };

    const call = await tokenById(tokenId, address);

    expect(consoleSpy).toHaveBeenCalledWith(errorContractAddress.message);

    expect(call).toEqual(errorReturn);
  });
});
