import { payouts } from './payouts';
describe('payouts rpc call', () => {
  it('should return payouts for contract and token id', () => {
    const royalties = payouts();
    expect(royalties).toBeNull();
  });
});
