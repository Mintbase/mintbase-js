
import { META_SERVICE_HOST } from '../../constants';
import { Attributes, attributesByContract, attributesByContractThrowOnError } from './attributesByContract';
import fetchMock from 'fetch-mock';

describe('tokensByAttributes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('returns data', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, { body: { eyes: [{ name: 'blue', count: 1 }] } });
    const { data } = await attributesByContract('contract.id');
    expect((data as Attributes).eyes).toBeDefined();
  });

  it('returns errors', async () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, 504, { overwriteRoutes: true });
    const { error } = await attributesByContract('contract.id');
    expect(error).toBeDefined();
  });

  it('throws errors when unwrapped version is called', () => {
    fetchMock.mock(`begin:${META_SERVICE_HOST}`, 504, { overwriteRoutes: true });
    expect(attributesByContractThrowOnError('contract.id')).rejects.toBeDefined();
  });
});


