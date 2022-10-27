import { tokenListingCountsByMetaId } from './tokenListingCountsByMetaId';

const METADATA_ID_FOR_TEST = 'run.mintbase1.near:7517c09a546d39cdbbd12e07a8c1de8f';

describe('tokenListingCountsByMetaId', () => {
  it('should return null for now', async () => {
    const result = await tokenListingCountsByMetaId(METADATA_ID_FOR_TEST);
    expect(result.totalTokensCount).toBeGreaterThan(0);
  });
});
