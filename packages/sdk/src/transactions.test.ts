import { invokeContractMethod } from './transactions';

describe('transactions', () => {
  describe('invokeContractMethod', () => {
    it('should return null', () => {
      expect(
        invokeContractMethod(),
      ).toBe(null);
    });
  });
});
