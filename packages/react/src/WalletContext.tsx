import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  registerWalletAccountsSubscriber,
  setupWalletSelectorComponents,
  connectWalletSelector,
  disconnectFromWalletSelector,
  getWallet,
} from '@mintbase-js/auth';
import type { WalletSelectorComponents } from '@mintbase-js/auth';
import { WalletSelector, AccountState, Wallet } from '@near-wallet-selector/core';
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
  error: string | null;
  connect: () => void;
  disconnect: () => Promise<void>;
}

export type WalletSetupComponents = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
}

export const WalletContext = createContext<WalletContext | null>(null);

export const WalletContextProvider: React.FC<React.PropsWithChildren> = (
  { children },
) => {
  const [error, setError] = useState<string | null>(null);
  const [components, setComponents] = useState<WalletSelectorComponents | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);

  const setup = useCallback(async () => {
    const components = await setupWalletSelectorComponents();
    const wallet = await getWallet();
    setWallet(wallet);
    setComponents(components);
  }, []);

  // call setup on wallet selector
  useEffect(() => {
    setup().catch((err: unknown) => {
      setError(err.toString());
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

  const connect = (): void =>
    connectWalletSelector();

  const disconnect = async(): Promise<void> => {
    await disconnectFromWalletSelector();
  };

  return (
    <WalletContext.Provider value={{
      selector,
      modal,
      wallet,
      accounts,
      activeAccountId: accounts
        .find((account) => account.active)?.accountId || null,
      error,
      connect,
      disconnect,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// FIXME: add return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWallet = () => useContext(WalletContext);
