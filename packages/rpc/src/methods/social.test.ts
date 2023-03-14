import fetch from 'isomorphic-unfetch';
import { NEAR_SOCIAL_IPFS_GATEWAY, nearSocialProfile } from './social';

jest.mock('isomorphic-unfetch');

describe('near social', () => {
  it('should return profile data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          result: [
            123, 34, 98, 101, 110, 105, 112, 115, 101, 110, 46,
            116, 101, 115, 116, 110, 101, 116, 34, 58, 123, 34,
            112, 114, 111, 102, 105, 108, 101, 34, 58, 123, 34,
            110, 97, 109, 101, 34, 58, 34, 72, 97, 99, 107, 101,
            114, 109, 97, 110, 34, 125, 125, 125,
          ],
        },
      }),
    });

    const profile = await nearSocialProfile('benipsen.testnet');
    expect(profile.name).toBeDefined();
    expect(profile.imageUrl).toBeNull();
  });

  it ('should set image url when present', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          result: [ 123, 34, 98, 101, 110, 105, 112, 115, 101, 110, 46,
            116, 101, 115, 116, 110, 101, 116, 34, 58, 123, 34, 112, 114,
            111, 102, 105, 108, 101, 34, 58, 123, 34, 110, 97, 109, 101,
            34, 58, 34, 72, 97, 99, 107, 101, 114, 109, 97, 110, 34, 44,
            34, 105, 109, 97, 103, 101, 34, 58, 123, 34, 105, 112, 102,
            115, 95, 99, 105, 100, 34, 58, 34, 98, 97, 102, 107, 114, 101,
            105, 103, 122, 105, 107, 50, 55, 100, 104, 103, 112, 103, 97,
            103, 106, 120, 121, 104, 110, 110, 53, 104, 109, 50, 104, 53,
            118, 101, 119, 100, 107, 113, 102, 99, 111, 99, 107, 113, 100,
            106, 117, 112, 118, 53, 52, 112, 99, 105, 107, 119, 121, 106,
            52, 34, 125, 125, 125, 125,
          ],
        },
      }),
    });


    const profile = await nearSocialProfile('benipsen.testnet');
    expect(profile.name).toBeDefined();
    expect(profile.imageUrl).toContain(NEAR_SOCIAL_IPFS_GATEWAY);
  });
});
