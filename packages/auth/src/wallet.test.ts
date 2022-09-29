import {
  registerWalletAccountsSubscriber,
  SetupNotCalledError,
  setupWalletSelectorComponents,
  walletSelectorComponents,
} from './wallet';

describe('wallet', () => {
  beforeAll(() => {
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  // warning: stateful tests, order matters.
  test('registerWalletAccountsSubscriber throws when components are not setup', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      registerWalletAccountsSubscriber(() => {});
    }).toThrow(SetupNotCalledError);
  });

  test('setupWalletSelectorComponents returns and defines components', async () => {
    expect(walletSelectorComponents).toBe(null);

    const { modal, selector } = await setupWalletSelectorComponents();

    expect(modal).toBeDefined();
    expect(selector).toBeDefined();
    expect(walletSelectorComponents).not.toBe(null);
  });


  test('registerWalletAccountsSubscriber throws returns subscription', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const subscription = registerWalletAccountsSubscriber(() => {});
    expect(subscription.unsubscribe).toBeDefined();
  });
});
