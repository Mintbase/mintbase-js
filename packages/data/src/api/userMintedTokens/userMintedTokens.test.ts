import { META_SERVICE_HOST_TESTNET } from '../../constants';
import { ORDER_BY_VALUE, ParsedDataReturn, UserTokensFilter, UserTokensQueryResult } from '../../types';
import fetchMock from 'fetch-mock';
import { mbjs } from '@mintbase-js/sdk';
import { getUserOwnedTokens } from '../userOwnedTokens/userOwnedTokens';

describe('userMintedTokens', () => {
  beforeAll(() => {
    mbjs.config({ network: 'testnet' });
  });

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('owned user tokens', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST_TESTNET}`, { body: { results: [{ token_id: '123' }] } });
    const filters: UserTokensFilter = {
      orderBy: ORDER_BY_VALUE.PRICE_ASC,
      limit: 10,
      offset: 0,
      listedFilter: true,
    };
    const { data } = await getUserOwnedTokens('human.id', filters) as ParsedDataReturn<UserTokensQueryResult>;
    expect(data?.results).toBeDefined();
  });

  it('returns errors', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST_TESTNET}`, 504, { overwriteRoutes: true });
    const filters = {
      orderBy: 'xpto',
      limit: 10,
      offset: 0,
      listedFilter: true,
    };
    const { error } = await getUserOwnedTokens('contract.id', filters);
    expect(error).toBeDefined();
  });
});
