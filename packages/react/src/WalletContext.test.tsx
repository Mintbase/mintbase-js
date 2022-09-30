// import { invokeContractMethod } from './transactions';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useWallet, WalletContextProvider } from './WalletContext';
import {
  setupWalletSelectorComponents,
  registerWalletAccountsSubscriber,
  signOutOfWalletSelector,
  signIntoWalletselector,
} from '@mintbase/auth';

jest.mock('@mintbase/auth');

describe('WalletContext', () => {
  test('should provide error message when things go wrong', async () => {
    // throw on startup
    (setupWalletSelectorComponents as jest.Mock)
      .mockRejectedValue('boom!');
    (registerWalletAccountsSubscriber as jest.Mock)
      .mockImplementation((callback) => callback(['fake.accounts']));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ContextReader: React.FC = () => {
      const { error } = useWallet();
      return (
        <div>{error}</div>
      );
    };
    act(() => {
      render(
        <WalletContextProvider>
          <ContextReader />
        </WalletContextProvider>,
      );
    });
    await waitFor(() => {
      screen.getByText('boom!');
    });
  });

  test('should provide active account', async () => {
    const testActiveAccountId = 'account123';
    // throw on startup
    (setupWalletSelectorComponents as jest.Mock)
      .mockResolvedValue({
        modal: 'foo',
        selector: 'bar',
      });
    (registerWalletAccountsSubscriber as jest.Mock)
      .mockImplementation((callback) => {
        callback([
          { active: false, accountId: 'fake.id' },
          { active: true, accountId: testActiveAccountId },
        ]);
        return {
          unsubscribe: jest.fn(),
        };
      });

    // ts claims this await is useless but it is needed.
    const ContextReader: React.FC = () => {
      const { activeAccountId } = useWallet();
      return (
        <div>{activeAccountId}</div>
      );
    };

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render(
        <WalletContextProvider>
          <ContextReader />
        </WalletContextProvider>,
      );
    });
    await waitFor(() => {
      screen.getByText(testActiveAccountId);
    });
  });

  test('should provide event handlers', async () => {
    const user = userEvent.setup();

    // throw on startup
    (setupWalletSelectorComponents as jest.Mock)
      .mockResolvedValue({
        modal: 'foo',
        selector:'bar',
      });
    (registerWalletAccountsSubscriber as jest.Mock)
      .mockImplementation((callback) => {
        callback([]);
        return {
          unsubscribe: jest.fn(),
        };
      });
    const ContextReader: React.FC = () => {
      const { signIn, signOut } = useWallet();
      return (
        <>
          <div role="sign-in" onClick={signIn}>Sign in</div>
          <div role="sign-out" onClick={signOut}>Sign out</div>
        </>
      );
    };

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render(
        <WalletContextProvider>
          <ContextReader />
        </WalletContextProvider>,
      );
    });
    await act(async () => {
      await userEvent.click(screen.getByRole('sign-in'));
      await userEvent.click(screen.getByRole('sign-out'));
    });
    expect(signIntoWalletselector).toHaveBeenCalled();
    expect(signOutOfWalletSelector).toHaveBeenCalled();
  });
});
