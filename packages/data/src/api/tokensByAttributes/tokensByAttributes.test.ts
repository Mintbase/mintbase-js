
import { META_SERVICE_HOST } from '../../constants';
import { tokensByAttributes, tokensByAttributesThrowOnError } from './tokensByAttributes';

import fetchMock from 'fetch-mock';
import { FilteredMetadataResult } from './tokensByAttributes.types';

describe('tokensByAttributes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, { body: [{ tokenId: '123' }] });
    const query = {
      filters: {
        'eyes': ['blue', 'green'],
        'face': ['busted'],
      },
      limit: 10,
      offset: 0,
    };
    const { data } = await tokensByAttributes('contract.id', query);
    expect(data).toBeDefined();
  });

  it('returns errors', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, 504, { overwriteRoutes: true });
    const query = {
      filters: {
        'eyes': ['blue', 'green'],
        'face': ['busted'],
      },
      limit: 10,
      offset: 0,
    };
    const { error } = await tokensByAttributes('contract.id', query);
    expect(error).toBeDefined();
  });

  it('throws errors when unwrapped version is called', () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, 504, { overwriteRoutes: true });
    const query = {
      filters: {
        'eyes': ['blue', 'green'],
        'face': ['busted'],
      },
      limit: 10,
      offset: 0,
    };
    expect(tokensByAttributesThrowOnError('contract.id', query)).rejects.toBeDefined();
  });
});


