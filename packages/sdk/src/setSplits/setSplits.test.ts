import { GAS } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { setSplits } from './setSplits';

test('set split args', () => {
  const contractAddress = 'contract';
  const tokenIds = ['1', '2'];
  const splitOwners = { 'a.near': 0.2, 'b.near': 0.8 };

  const args = setSplits({
    contractAddress: contractAddress,
    tokenIds: tokenIds,
    splitOwners: splitOwners,
  });

  expect(args).toEqual({
    contractAddress: contractAddress,
    methodName: TOKEN_METHOD_NAMES.SET_SPLITS,
    args: {
      token_ids: tokenIds,
      split_between: {
        'a.near': 2000,
        'b.near': 8000,
      },
    },
    deposit: '3200000000000000000000',
    gas: GAS,
  });
});
