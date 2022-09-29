import { setupWalletSelectorComponents, walletSelectorComponents } from './wallet';

describe('wallet', () => {
  describe('setupWalletSelectorComponents', () => {
    test(' returns and defines components', async () => {
      expect(walletSelectorComponents).toBe(null);
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
      });
      // (setupModal as jest.Mock).mockReturnValue({ test: 'fake.modal.window' });
      const { modal, selector } = await setupWalletSelectorComponents();
      expect(modal).toBeDefined();
      expect(selector).toBeDefined();
      expect(walletSelectorComponents).not.toBe(null);
    });
  });
});
