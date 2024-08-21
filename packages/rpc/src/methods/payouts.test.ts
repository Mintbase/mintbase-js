import { payouts } from './payouts';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

describe('payouts rpc call', () => {
  it('should return payouts for contract and token id', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        jsonrpc: '2.0',
        result: {
          block_hash: 'GVQN7k6mWJEgUm4enccEH6NThFmrn8YPow52sbTwdtL8',
          block_height: 113548150,
          logs: [],
          result: [
            123, 34, 112, 97, 121, 111, 117, 116, 34, 58, 123, 34, 121, 97, 100,
            100, 97, 46, 116, 101, 115, 116, 110, 101, 116, 34, 58, 34, 49, 48,
            48, 48, 50, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 34, 44, 34, 98,
            101, 110, 105, 112, 115, 101, 110, 46, 116, 101, 115, 116, 110, 101,
            116, 34, 58, 34, 57, 56, 57, 57, 57, 56, 48, 48, 48, 48, 48, 48, 48,
            48, 48, 48, 34, 125, 125,
          ],
        },
        id: 'dontcare',
      }),
    });

    const payout = await payouts({
      contractId: 'ticketingv2.mintspace2.testnet',
      tokenId: '154',
      rpcUrl: 'rpc',
    });

    expect(typeof payout.equalAccounts).toBe('boolean');
    expect(typeof payout.tokenId).toBe('string');
    expect(isPercentFloat(payout.royaltyPercent)).toBe(true);
    expect(isPercentFloat(payout.splitPercent)).toBe(true);

    payout.splits.forEach((s) => {
      expect(isAccountPercent(s)).toBe(true);
    });
    payout.royalties.forEach((r) => {
      expect(isAccountPercent(r)).toBe(true);
    });
  });
});

const isPercentFloat = (x: unknown): boolean => {
  return typeof x === 'number' && x >= 0 && x <= 100;
};

type AccountPercent = {
  account: string;
  percent: number;
}

const isAccountPercent = (x: unknown): x is AccountPercent => {
  if (['undefined', 'null'].includes(typeof x)) {
    return false;
  }
  return (
    typeof (x as AccountPercent).account === 'string' &&
    isPercentInt((x as AccountPercent).percent)
  );
};

const isPercentInt = (x: unknown): boolean => {
  return typeof x === 'number' && x >= 0 && x <= 10000;
};
