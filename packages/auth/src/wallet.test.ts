import { wallet } from './wallet';

describe('wallet', () => {
    it('should return null', () => {
        expect(wallet()).toBe(null);
    });
});