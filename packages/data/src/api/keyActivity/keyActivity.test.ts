/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLClient } from 'graphql-request';
import { keyActivity } from './keyActivity';
import { KEY_ACTIVITY_MOCK }  from './keyActivity.mock';
import { KeyActivityQueryResults } from './keyActivity.types';

jest.mock('graphql-request');

describe('getTokensFromMetaId', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });
  });

  it('should show key activity', async () => {

    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: (): Promise<KeyActivityQueryResults> =>
        Promise.resolve(KEY_ACTIVITY_MOCK),
    }));

    const { data } = await keyActivity('test.near');

    expect(data?.keyActivity.length).toBe(2);
    expect(data?.keyActivity[0].kind).toBe('add');
    expect(data?.keyActivity[1].kind).toBe('del');
    expect(data?.keyActivity[0].receiptId).toBe('receiptIdAdd');
    expect(data?.keyActivity[1].receiptId).toBe('receiptIdDel');
    expect(data?.keyActivity[0].publicKey).toBe('pubkey');
    expect(data?.keyActivity[1].publicKey).toBe('pubkey');
    expect(data?.keyActivity[0].timestamp).toBe('2000-01-01T00:00:00.000000');
    expect(data?.keyActivity[1].timestamp).toBe('2000-01-02T00:00:00.000000');
  });
});
