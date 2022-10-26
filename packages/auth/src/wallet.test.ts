import {
  walletSelectorComponents,
  SetupNotCalledError,
  setupWalletSelectorComponents,
  pollForWalletConnection,
  registerWalletAccountsSubscriber,
  connectWalletSelector,
  disconnectFromWalletSelector,
  getWallet,
  ConnectionTimeoutError,
} from './wallet';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { Observable } from 'rxjs';
// import { WALLET_CONNECTION_TIMEOUT, WALLET_CONNECTION_POLL_INTERVAL } from './constants';


jest.mock('@near-wallet-selector/core');
jest.mock('@near-wallet-selector/modal-ui');
jest.mock('./constants', () => ({
  WALLET_CONNECTION_TIMEOUT: 10,
  WALLET_CONNECTION_POLL_INTERVAL: 100,
}));

jest.useFakeTimers();

describe('wallet', () => {
  const mockModal = {
    show: jest.fn(),
  };
  const mockWallet = {
    signOut: jest.fn(),
    id: 'im.a.test.wallet',
  };
  const mockGetState = jest.fn();
  const mockSelector = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    wallet: () => Promise.resolve(mockWallet),
    store: {
      observable: new Observable(),
      getState: mockGetState,
    },
  };
  beforeAll(() => {

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setupWithMockComponents = async () => {
    (setupWalletSelector as jest.Mock).mockResolvedValueOnce(mockSelector);
    (setupModal as jest.Mock).mockReturnValueOnce(mockModal);
    return await setupWalletSelectorComponents();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setupWithNullComponents = async () => {
    (setupWalletSelector as jest.Mock).mockResolvedValueOnce(null);
    (setupModal as jest.Mock).mockReturnValueOnce(null);
    return await setupWalletSelectorComponents();
  };

  test('setupWalletSelectorComponents returns and defines components', async () => {
    const { modal, selector } = await setupWithMockComponents();

    expect(modal).toBeDefined();
    expect(selector).toBeDefined();
    expect(walletSelectorComponents).not.toBe(null);
  });

  test('registerWalletAccountsSubscriber throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      registerWalletAccountsSubscriber(() => {});
    }).toThrow(SetupNotCalledError);
  });

  test('registerWalletAccountsSubscriber returns the subscription', async () => {
    await setupWithMockComponents();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const subscription = registerWalletAccountsSubscriber(() => {});
    expect(subscription.unsubscribe).toBeDefined();
  });

  test('pollForWalletConnection throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(pollForWalletConnection())
      .rejects
      .toThrow(SetupNotCalledError);
  });

  test('pollForWalletConnection rejects after not finding accounts', async () => {
    await setupWithMockComponents();
    mockGetState.mockReturnValueOnce({});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(pollForWalletConnection()).rejects.toThrow(ConnectionTimeoutError);
  });

  test('pollForWalletConnection returns accounts', async () => {
    await setupWithMockComponents();
    mockGetState.mockReturnValueOnce({
      accounts: ['fake.account.near'],
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const accounts = await pollForWalletConnection();

    expect(accounts.length).toBeGreaterThan(0);
  });

  test('connectWalletSelector calls show modal', async () => {
    await setupWithMockComponents();
    connectWalletSelector();
    expect(mockModal.show).toHaveBeenCalled();
  });

  test('connectWalletSelector throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      connectWalletSelector();
    }).toThrow(SetupNotCalledError);
  });

  test('getWallet throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(getWallet())
      .rejects
      .toThrow(SetupNotCalledError);
  });

  test('getWallet returns wallet', async () => {
    await setupWithMockComponents();
    const wallet = await getWallet();
    expect(wallet.id).toBe(mockWallet.id);
  });

  test('disconnectFromWalletSelector calls sign out on wallet', async () => {
    await setupWithMockComponents();
    await disconnectFromWalletSelector();
    expect(mockWallet.signOut).toHaveBeenCalled();
  });

  test('disconnectFromWalletSelector throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(disconnectFromWalletSelector())
      .rejects
      .toThrow(SetupNotCalledError);
  });
});
