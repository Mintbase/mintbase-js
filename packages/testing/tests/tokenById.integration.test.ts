import { tokenById } from '@mintbase-js/data';

afterAll(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('tokenById should return on testnet', async () => {
  const result = await tokenById('2', 'rastamanvibration.mintspace2.testnet');

  expect(result.data?.mb_views_nft_tokens).toHaveLength(1);
  expect(
    result.data?.mb_views_active_listings_aggregate?.aggregate?.count,
  ).toBe(1);
  expect(result.error).toBeUndefined();
  expect(result).not.toBeUndefined();
});

test('if token param in invalid format should return error message, and data undefined', async () => {
  const errorResult = await tokenById(
    '2a',
    'rastamanvibration.mintspace2.testnet',
  );

  expect(errorResult.data).toBeUndefined();
  expect(errorResult.error).toEqual('Please add a valid tokenId as string');
});

test('if contract param in invalid format should return error message, and data undefined', async () => {
  const errorResult = await tokenById('2', 'rastaman.mintspace100.testanet');

  expect(errorResult.data).toBeUndefined();
  expect(errorResult.error).toEqual(
    'Please add a valid contractAddress as string',
  );
});
