import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
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
import { mbjs, Network } from '@mintbase-js/sdk';

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
  network: Network;
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
  { children }, network: Network,
) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [components, setComponents] = useState<WalletSelectorComponents | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [isWaitingForConnection, setIsWaitingForConnection] = useState<boolean>(false);
  const [isWalletSelectorSetup, setIsWalletSelectorSetup] = useState<boolean>(false);

  console.log(network, 'network from provider');
  console.log(mbjs.keys.network, 'network 2');

  const setup = useCallback(async (WalletNetwork?) => {

    console.log('networksssssssss', WalletNetwork, network, mbjs.keys.network);


    const components = await setupWalletSelectorComponents(WalletNetwork || network || mbjs.keys.network);
    setIsWalletSelectorSetup(true);
    setComponents(components);
  }, []);

  // call setup on wallet selector
  useEffect(() => {
    console.log(mbjs.keys.network, 'mbjs.keys.network on useEffect');


    setup(mbjs.keys.network).catch((err: unknown) => {
      setErrorMessage((err as Error).message || err as string);
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
    setErrorMessage(null);
    connectWalletSelector();

    try {
      const accounts = await pollForWalletConnection();
      setIsWaitingForConnection(false);
      setAccounts(accounts);
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
      network,
      selector,
      modal,
      accounts,
      activeAccountId: accounts
        .find((account) => account.active)?.accountId || null,
      isConnected: accounts && accounts.length > 0,
      isWaitingForConnection,
      isWalletSelectorSetup,
      errorMessage,
      connect,
      disconnect,
      signMessage,
    }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = (): WalletContext => useContext(WalletContext);
