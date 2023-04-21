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
  getVerifiedOwner,
  signMessage,
  requestMintbaseSessionToken,
  getMintbaseSessionFromToken,
} from './wallet';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { Observable } from 'rxjs';
// import { WALLET_CONNECTION_TIMEOUT, WALLET_CONNECTION_POLL_INTERVAL } from './constants';


jest.mock('@near-wallet-selector/core');
jest.mock('@near-wallet-selector/modal-ui');
jest.mock('./constants', () => ({
  WALLET_CONNECTION_TIMEOUT: -1,
  WALLET_CONNECTION_POLL_INTERVAL: 100,
}));

// jest.useFakeTimers();
globalThis.mbjs = {};

describe('wallet', () => {
  const mockModal = {
    show: jest.fn(),
  };
  const mockWallet = {
    signOut: jest.fn(),
    verifyOwner: jest.fn(),
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
    jest.resetAllMocks();
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
    jest.spyOn(console, 'warn').mockImplementation(() => null);
    jest.spyOn(console, 'error').mockImplementation(() => null);
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

  test('getVerifiedOwner calls verifiedOwner on wallet', async () => {
    await setupWithMockComponents();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await getVerifiedOwner({ message: 'testMessage' });
    expect(mockWallet.verifyOwner).toHaveBeenCalled();
  });

  test('getVerifiedOwner throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(getVerifiedOwner({ message: 'testMessage' }))
      .rejects
      .toThrow(SetupNotCalledError);
  });

  test('signMessage calls verifiedOwner on wallet', async () => {
    await setupWithMockComponents();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await signMessage({ message: 'testMessage' });
    expect(mockWallet.verifyOwner).toHaveBeenCalled();
  });

  test('signMessage throws when components are not setup', async () => {
    await setupWithNullComponents();
    expect(signMessage({ message: 'testMessage' }))
      .rejects
      .toThrow(SetupNotCalledError);
  });

  test('requests a session', async () => {
    mockGetState.mockReturnValue({ selectedWalletId: 'meteor-wallet' });
    await setupWithMockComponents();
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ token: 'foo' }),
    });
    const token = await requestMintbaseSessionToken();
    expect(token).toBe('foo');
  });

  test('handles session error', async () => {
    mockGetState.mockReturnValue({ selectedWalletId: 'meteor-wallet' });
    await setupWithMockComponents();
    global.fetch = jest.fn().mockRejectedValue('service down');
    const token = await requestMintbaseSessionToken();
    expect(token).toBe(null);
  });

  test('skips the session for non metor wallets', async () => {
    mockGetState.mockReturnValue({ selectedWalletId: 'not-meteor-wallet' });
    await setupWithMockComponents();
    const token = await requestMintbaseSessionToken();
    expect(token).toBe(null);
  });

  test('validates session from token a session', async () => {
    mockGetState.mockReturnValue({ selectedWalletId: 'meteor-wallet' });
    await setupWithMockComponents();
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ accountId: 'foo' }),
    });
    const session = await getMintbaseSessionFromToken('bar-token');
    expect(session?.accountId).toBe('foo');
  });

  test('handles validation error', async () => {
    mockGetState.mockReturnValue({ selectedWalletId: 'meteor-wallet' });
    await setupWithMockComponents();
    global.fetch = jest.fn().mockRejectedValue('service down');
    const session = await getMintbaseSessionFromToken('bar-token');
    expect(session).toBe(null);
  });
});
