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

    expect(JSON.stringify(data)).toBe(JSON.stringify({
      keyActivity: [
        {
          timestamp: '2000-01-01T00:00:00.000000',
          receiptId: 'receiptIdAdd',
          publicKey: 'pubkey',
          kind: 'add',
        },
        {
          timestamp: '2000-01-02T00:00:00.000000',
          receiptId: 'receiptIdDel',
          publicKey: 'pubkey',
          kind: 'del',
        },
      ],
    }));
  });
});
