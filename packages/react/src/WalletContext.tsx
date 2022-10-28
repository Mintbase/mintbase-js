import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  registerWalletAccountsSubscriber,
  setupWalletSelectorComponents,
  connectWalletSelector,
  disconnectFromWalletSelector,
  getWallet,
  pollForWalletConnection,
  signMessage,
} from '@mintbase-js/auth';
import type { WalletSelectorComponents } from '@mintbase-js/auth';
import { WalletSelector, AccountState, Wallet, VerifiedOwner } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';

// This is heavily based on
// https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx
// but uses wrappers from @mintbase-js/auth and @mintbase-js/sdk
export type WalletContext = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  wallet: Wallet;
  accounts: AccountState[];
  activeAccountId: string | null;
  isConnected: boolean;
  isWaitingForConnection: boolean;
  errorMessage: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<VerifiedOwner>;
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
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [isWaitingForConnection, setIsWaitingForConnection] = useState<boolean>(false);

  const setup = useCallback(async () => {
    const components = await setupWalletSelectorComponents();
    setComponents(components);
    try {
      const wallet = await getWallet();
      setWallet(wallet);
    // eslint-disable-next-line no-empty
    } finally { }
  }, []);

  // call setup on wallet selector
  useEffect(() => {
    setup().catch((err: unknown) => {
      setErrorMessage((err as Error).message || err as string);
    });
  }, [setup]);

  // subscribe to account state changes
  useEffect(() => {
    if (!components) {
      return;
    }
    const subscription = registerWalletAccountsSubscriber(
      (accounts: AccountState[]) => {
        setAccounts(accounts);
      });

    // eslint-disable-next-line consistent-return
    return (): void =>
      subscription.unsubscribe();

  }, [components]);

  const {
    selector,
    modal,
  } = components || {};

  const connect = async (): Promise<void> => {
    setIsWaitingForConnection(true);
    setErrorMessage(null);
    connectWalletSelector();

    try {
      const accounts = await pollForWalletConnection();
      const wallet = await getWallet();
      setIsWaitingForConnection(false);
      setAccounts(accounts);
      setWallet(wallet);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || err as string);
    }
  };

  const disconnect = async(): Promise<void> => {
    await disconnectFromWalletSelector();
    setIsWaitingForConnection(false);
  };
 

  return (
    <WalletContext.Provider value={{
      selector,
      modal,
      wallet,
      accounts,
      activeAccountId: accounts
        .find((account) => account.active)?.accountId || null,
      isConnected: accounts && accounts.length > 0,
      isWaitingForConnection,
      errorMessage,
      connect,
      disconnect,
      signMessage,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// FIXME: add return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWallet = () => useContext(WalletContext);
