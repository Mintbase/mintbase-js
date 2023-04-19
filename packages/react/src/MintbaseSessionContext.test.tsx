/**
 * @jest-environment jsdom
 */
// import { invokeContractMethod } from './transactions';
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useMintbaseSession, MintbaseSessionProvider } from './MintbaseSessionContext';
import {
  setupWalletSelectorComponents,
  registerWalletAccountsSubscriber,
  pollForWalletConnection,
  requestMintbaseSessionToken,
  getMintbaseSessionFromToken,
} from '@mintbase-js/auth/lib/wallet';
import { WalletContextProvider } from './WalletContext';


jest.mock('@mintbase-js/auth/lib/wallet');

describe('MintbaseSessionContext', () => {

  jest.spyOn(console, 'error').mockImplementation(() => null);

  const setupWalletComponets = (): void => {
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
  };

  test('should provide request method and ask for session', async () => {
    setupWalletComponets();
    const ContextReader: React.FC = () => {
      const { requestSession } = useMintbaseSession();
      return (
        <>
          <div role="get-it" onClick={requestSession}>Get JWT</div>
        </>
      );
    };

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render(
        <WalletContextProvider>
          <MintbaseSessionProvider>
            <ContextReader />
          </MintbaseSessionProvider>
        </WalletContextProvider>,
      );
    });

    await userEvent.click(screen.getByRole('get-it'));
    expect(requestMintbaseSessionToken).toHaveBeenCalled();
  });

  test('should attempt to load session with proxy defined', async () => {
    setupWalletComponets();
    const ContextReader: React.FC = () => {
      const { requestSession } = useMintbaseSession();
      return (
        <>
          <div role="get-it" onClick={requestSession}>Get JWT</div>
        </>
      );
    };

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render(
        <WalletContextProvider>
          <MintbaseSessionProvider>
            <ContextReader />
          </MintbaseSessionProvider>
        </WalletContextProvider>,
      );
    });

    expect(getMintbaseSessionFromToken).toHaveBeenCalled();
  });

  test('should provide error message', async () => {
    setupWalletComponets();
    const errorMessageToDisplay = 'boom!';
    (requestMintbaseSessionToken as jest.Mock).mockRejectedValueOnce(errorMessageToDisplay);
    const ContextReader: React.FC = () => {
      const { requestSession, error: sessionError } = useMintbaseSession();
      return (
        <>
          <div role="get-it" onClick={requestSession}>Get JWT</div>
          <div>{sessionError}</div>
        </>
      );
    };

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render(
        <WalletContextProvider>
          <MintbaseSessionProvider>
            <ContextReader />
          </MintbaseSessionProvider>
        </WalletContextProvider>,
      );
    });
    await userEvent.click(screen.getByRole('get-it'));
    await waitFor(() => {
      screen.getByText(errorMessageToDisplay);
    });


  });
});
