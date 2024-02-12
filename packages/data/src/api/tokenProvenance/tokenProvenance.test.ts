import { GraphQLClient } from 'graphql-request';
import { TokenProvenanceData } from './tokenProvenance.types';
import { tokenProvenance } from './tokenProvenance';
import { tokenProvenanceMock } from './tokenProvenance.mock';
import { errorToken, errorContractAddress } from './tokenProvenance.errors';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');


const props = {
  tokenId: '104',
  contractAddress: 'teammintbase.mintbase1.near',
  pagination : { limit: 20, offset:0 },
  network: 'mainnet' as Network,
};

describe('tokenProvenance', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return provenance token Data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenProvenanceData> => Promise.resolve(tokenProvenanceMock),
    }));

    const result = await tokenProvenance(props);

    expect(result?.data).toEqual(
      tokenProvenanceMock,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenProvenanceData> => Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenProvenance(props);

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

    const call = await tokenProvenance({ tokenId, contractAddress: address });

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

    const call = await tokenProvenance({ tokenId, contractAddress: address });

    expect(consoleSpy).toHaveBeenCalledWith(errorContractAddress.message);

    expect(call).toEqual(errorReturn);
  });
});


