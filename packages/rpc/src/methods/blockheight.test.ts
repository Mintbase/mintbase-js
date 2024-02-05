import { getBlockHeight } from './blockheight';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

describe('getBlockHeight', () => {
  it('should return a numeric, non-negative block height', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          sync_info: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            latest_block_height: 123,
          },
        },
      }),
    });

    const h = await getBlockHeight();
    expect(typeof h).toBe('number');
    expect(h > 0).toBe(true);
  });
});
