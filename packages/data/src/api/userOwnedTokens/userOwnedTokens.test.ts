import { META_SERVICE_HOST_TESTNET } from '../../constants';
import { OWNED_MINTED_ORDER_BY, ParsedDataReturn, UserTokensFilter, UserTokensQueryResult } from '../../types';

import fetchMock from 'fetch-mock';
import { Network, mbjs } from '@mintbase-js/sdk';
import { getUserOwnedTokens } from './userOwnedTokens';


const props = {
  accountId: 'rub3n.testnet',
  filters: {
    orderBy: OWNED_MINTED_ORDER_BY.MINTED,
    limit: 10,
    offset: 0,
    listedFilter: true,
  },
  network: 'testnet' as Network,
};


describe('userOwnedTokens', () => {
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
      orderBy: OWNED_MINTED_ORDER_BY.MINTED,
      limit: 10,
      offset: 0,
      listedFilter: true,
    };
    const { data } = await getUserOwnedTokens(props) as ParsedDataReturn<UserTokensQueryResult>;
    expect(data?.results).toBeDefined();
  });

  it('returns errors', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST_TESTNET}`, 504, { overwriteRoutes: true });
    const filters = {
      orderBy: OWNED_MINTED_ORDER_BY.MINTED,
      limit: 10,
      offset: 0,
      listedFilter: true,
    };
    const { error } = await getUserOwnedTokens(props);
    expect(error).toBeDefined();
  });
});
