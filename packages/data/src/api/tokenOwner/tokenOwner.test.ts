import { GraphQLClient } from 'graphql-request';
import { tokenOwner } from './tokenOwner';
import { tokenOwnerMock } from './tokenOwner.mock';
import { TokenOwnerQueryResult } from './tokenOwner.types';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');

const props = {
  tokenId: 'test.id',
  contractAddress: 'contract.id',
  network: 'mainnet' as Network,
};

describe('getTokenOwnerByTokenIdAndContractId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnerQueryResult> =>
        Promise.resolve(tokenOwnerMock),
    }));
    const result = await tokenOwner(props);
    expect(result?.data).toStrictEqual('test.near');
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<TokenOwnerQueryResult> =>
        Promise.reject(new Error(errMessage)),
    }));

    const call = await tokenOwner(props);

    expect(call).toStrictEqual({ error: errMessage });
  });
});
