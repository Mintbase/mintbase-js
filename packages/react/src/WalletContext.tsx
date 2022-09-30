import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  registerWalletAccountsSubscriber,
  setupWalletSelectorComponents,
  signIntoWalletselector,
  signOutOfWalletSelector,
} from '@mintbase/auth';
import type { WalletSelectorComponents } from '@mintbase/auth';
import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';

// This is heavily based on
// https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx
// but uses wrappers from @mintbase/auth and @mintbase/sdk
export type WalletContext = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: AccountState[];
  activeAccountId: string | null;
  error: string | null;
  signIn: () => void;
  signOut: () => Promise<void>;
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
  const [accounts, setAccounts] = useState<AccountState[]>([]);

  const setup = useCallback(async () => {
    const components = await setupWalletSelectorComponents();
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

  const signIn = (): void =>
    signIntoWalletselector();

  const signOut = async(): Promise<void> => {
    await signOutOfWalletSelector();
  };

  return (
    <WalletContext.Provider value={{
      selector,
      modal,
      accounts,
      activeAccountId: accounts
        .find((account) => account.active)?.accountId || null,
      error,
      signIn,
      signOut,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

// FIXME: add return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWallet = () => useContext(WalletContext);
