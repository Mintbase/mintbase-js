import { getBlockHeight } from './blockheight';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

describe('getBlockHeight', () => {
  it('should return a numeric, non-negative block height', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          sync_info: {
            latest_block_height: 123,
          },
        },
      }),
    });

    const h = await getBlockHeight('https://rpc.testnet.near.org');
    expect(typeof h).toBe('number');
    expect(h > 0).toBe(true);
  });
});
