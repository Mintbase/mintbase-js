import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  registerWalletAccountsSubscriber,
  setupWalletSelectorComponents,
  connectWalletSelector,
  disconnectFromWalletSelector,
  pollForWalletConnection,
  signMessage,
} from '@mintbase-js/auth/lib/wallet';
import type { WalletSelectorComponents } from '@mintbase-js/auth/lib/wallet';
import { WalletSelector, AccountState, VerifiedOwner, VerifyOwnerParams } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';

// This is heavily based on
// https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx
// but uses wrappers from @mintbase-js/auth and @mintbase-js/sdk
export type WalletContext = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: AccountState[];
  activeAccountId: string | null;
  isConnected: boolean;
  isWaitingForConnection: boolean;
  isWalletSelectorSetup: boolean;
  errorMessage: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (params: VerifyOwnerParams) => Promise<VerifiedOwner>;
}

export type WalletSetupComponents = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
}


export const WalletContext = createContext<WalletContext | null>(null);

export const WalletContextProvider: React.FC<React.PropsWithChildren> = (
  { children },
) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [components, setComponents] = useState<WalletSelectorComponents | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [isWaitingForConnection, setIsWaitingForConnection] = useState<boolean>(false);
  const [isWalletSelectorSetup, setIsWalletSelectorSetup] = useState<boolean>(false);

  const setup = useCallback(async () => {
    const components = await setupWalletSelectorComponents();
    setIsWalletSelectorSetup(true);
    setComponents(components);
  }, []);

  // call setup on wallet selector
  useEffect(() => {

    console.log(components, 'components');
    setup().catch((err: unknown) => {
      console.log(err, 'error');
      setErrorMessage(err as string);
    });
  }, [setup]);

  const onCloseModal = (): void => {
    setIsWaitingForConnection(false);
  };

  if (typeof window !== 'undefined') {
    const closeButton = document?.getElementsByClassName('close-button')[0];
    closeButton?.addEventListener('click', onCloseModal);
  }

  // subscribe to account state changes
  useEffect(() => {
    if (!components) {
      return undefined;
    }

    const subscription = registerWalletAccountsSubscriber(
      (accounts: AccountState[]) => {
        setAccounts(accounts);
      });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [components]);

  const {
    selector,
    modal,
  } = components || {};


  const connect = async (): Promise<void> => {
    setIsWaitingForConnection(true);

    console.log(errorMessage, 'error');

    setErrorMessage(null);
    connectWalletSelector();

    try {
      const accounts = await pollForWalletConnection();
      setIsWaitingForConnection(false);
      setAccounts(accounts);
    } catch (err: unknown) {
      console.log(err, errorMessage,  'error');

      setErrorMessage(err as string);
    }
  };

  const disconnect = async(): Promise<void> => {
    await disconnectFromWalletSelector();
    setIsWaitingForConnection(false);
  };


  const walletSelectorContextValue = useMemo<WalletContext>(
    () => ({
      selector: selector,
      modal: modal,
      accounts: accounts,
      activeAccountId: accounts.find((account) => account.active)?.accountId || null,
      isConnected: accounts && accounts.length > 0,
      isWaitingForConnection: isWaitingForConnection,
      isWalletSelectorSetup: isWalletSelectorSetup,
      errorMessage: errorMessage,
      connect,
      disconnect,
      signMessage,
    }),
    [selector, modal, accounts],
  );


  return (
    <WalletContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = (): WalletContext => useContext(WalletContext);
