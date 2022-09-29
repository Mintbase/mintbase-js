// import { invokeContractMethod } from './transactions';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useWallet, WalletContextProvider } from './WalletContext';
import { setupWalletSelectorComponents, registerWalletAccountsSubscriber } from '@mintbase/auth';

jest.mock('@mintbase/auth');

describe('WalletContext', () => {
  it ('should provide error message when things go wrong', async () => {
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

  it ('should provide active account', async () => {
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

  it ('handles provites event handlers', async () => {
    const user = userEvent.setup();
    const mockShowModal = jest.fn();
    const mockSignOut = jest.fn();
    const mockWallet = {
      signOut: mockSignOut,
    };
    // throw on startup
    (setupWalletSelectorComponents as jest.Mock)
      .mockResolvedValue({
        modal: { show: mockShowModal },
        selector: {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          wallet: () => Promise.resolve(mockWallet),
        },
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
    await act(() => {
      userEvent.click(screen.getByRole('sign-in'));
      userEvent.click(screen.getByRole('sign-out'));
    });
    expect(mockShowModal).toHaveBeenCalled();
    expect(mockSignOut).toHaveBeenCalled();
  });
});
