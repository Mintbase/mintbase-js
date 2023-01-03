// import { invokeContractMethod } from './transactions';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useWallet, WalletContextProvider } from './WalletContext';
import {
  setupWalletSelectorComponents,
  registerWalletAccountsSubscriber,
  disconnectFromWalletSelector,
  connectWalletSelector,
  pollForWalletConnection,
} from '@mintbase-js/auth/lib/wallet';


jest.mock('@mintbase-js/auth/lib/wallet');


describe('WalletContext', () => {
  test('should provide error message when setup goes wrong', async () => {
    // throw on startup
    const errorMessageToDisplay = 'boom';
    (setupWalletSelectorComponents as jest.Mock)
      .mockRejectedValue(errorMessageToDisplay);
    (registerWalletAccountsSubscriber as jest.Mock)
      .mockImplementation((callback) => callback(['fake.accounts']));
    (pollForWalletConnection as jest.Mock)
      .mockResolvedValue(['fake.acccount']);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ContextReader: React.FC = () => {
      const { errorMessage } = useWallet();
      return (
        <div>{errorMessage}</div>
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
      screen.getByText(errorMessageToDisplay);
    });
  });

  test('should provide connection error message when polling times out', async () => {
    // throw on startup
    const errorMessageToDisplay = 'oh snap!';
    (setupWalletSelectorComponents as jest.Mock)
      .mockResolvedValue({
        modal: 'foo',
        selector: 'bar',
      });
    (registerWalletAccountsSubscriber as jest.Mock)
      .mockImplementation((callback) => {
        callback(['whatever']);
        return {
          unsubscribe: jest.fn(),
        };
      });
    (pollForWalletConnection as jest.Mock)
      .mockRejectedValueOnce(new Error(errorMessageToDisplay));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ContextReader: React.FC = () => {
      const { errorMessage, connect } = useWallet();
      return (
        <>
          <div role="sign-in" onClick={connect}>Sign in</div>
          <div>
            {errorMessage}
          </div>
        </>
      );
    };
    act(() => {
      render(
        <WalletContextProvider>
          <ContextReader />
        </WalletContextProvider>,
      );
    });
    await userEvent.click(screen.getByRole('sign-in'));
    await waitFor(() => {
      screen.getByText(errorMessageToDisplay);
    });
  });

  test('should provide active account', async () => {
    const testActiveAccountId = 'account123';
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
    (pollForWalletConnection as jest.Mock)
      .mockResolvedValue(null);

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
    (pollForWalletConnection as jest.Mock)
      .mockResolvedValue(['foo.near']);

    const ContextReader: React.FC = () => {
      const { connect, disconnect } = useWallet();
      return (
        <>
          <div role="sign-in" onClick={connect}>Sign in</div>
          <div role="sign-out" onClick={disconnect}>Sign out</div>
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

    await userEvent.click(screen.getByRole('sign-in'));
    await userEvent.click(screen.getByRole('sign-out'));

    expect(connectWalletSelector).toHaveBeenCalled();
    expect(disconnectFromWalletSelector).toHaveBeenCalled();
  });
});
