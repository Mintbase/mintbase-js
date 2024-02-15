import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  registerWalletAccountsSubscriber,
  connectWalletSelector,
  disconnectFromWalletSelector,
  pollForWalletConnection,
  signMessage,
  setupMintbaseWalletSelector,
} from './wallet/wallet';
import type { WalletSelectorComponents } from './wallet/wallet';

import type {
  WalletSelector,
  AccountState,
  VerifiedOwner,
  VerifyOwnerParams,
  WalletModuleFactory,
} from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';

// This is heavily based on
// https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx
// but uses wrappers from @mintbase-js/wallet and @mintbase-js/sdk

export type MintbaseWalletContext = {
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

interface ContextProviderType {
  children: React.ReactNode;
  callbackUrl?: string;
  network?: string; onlyMbWallet?: boolean;
  contractAddress?: string;
  additionalWallets?: Array<WalletModuleFactory>;
  successUrl?: string;
  failureUrl?: string;
}


export const MintbaseWalletContext = createContext<MintbaseWalletContext | null>(null);

export const MintbaseWalletContextProvider: React.FC<ContextProviderType> = ({
  children,
  network,
  contractAddress,
  additionalWallets,
  onlyMbWallet,
  callbackUrl,
  successUrl,
  failureUrl,
}): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [components, setComponents] = useState<WalletSelectorComponents | null>(
    null,
  );
  const [accounts, setAccounts] = useState<AccountState[]>([]);
  const [isWaitingForConnection, setIsWaitingForConnection] =
    useState<boolean>(false);
  const [isWalletSelectorSetup, setIsWalletSelectorSetup] =
    useState<boolean>(false);


  const selectedNetwork =  network;
  const selectedContract = contractAddress;

  const setupMbWallet = async (): Promise<WalletSelectorComponents> => {
    const isOnlyMbWallet = !!onlyMbWallet || !!(additionalWallets && additionalWallets.length > 0);

    return await setupMintbaseWalletSelector(
      callbackUrl,
      isOnlyMbWallet,
      selectedNetwork,
      selectedContract,
      isOnlyMbWallet ? { additionalWallets } : undefined,
      successUrl, failureUrl,
    );
  };

  const setup = useCallback(async () => {
    const components = await setupMbWallet();

    setIsWalletSelectorSetup(true);
    setComponents(components);
  }, []);

  const onCloseModal = (): void => {
    setIsWaitingForConnection(false);
  };

  const setupWallet = async (): Promise<WalletSelectorComponents> => {
    const components = await setupMbWallet();

    return components;
  };

  // call setup on wallet selector


  useEffect(() => {
    setupWallet();

    setup().catch((err: Error) => {
      if (err || err.message.length > 0) {
        setErrorMessage((err as Error).message);
      }
    });

    // Add the event listener here
    const closeButton = document?.getElementsByClassName('close-button')[0];
    closeButton?.addEventListener('click', onCloseModal);

    // Cleanup the event listener on unmount
    return (): void => {
      closeButton?.removeEventListener('click', onCloseModal);
    };
  }, [setup]);

  // subscribe to account state changes
  useEffect(() => {
    if (!components) {
      return undefined;
    }

    const subscription = registerWalletAccountsSubscriber(
      (accounts: AccountState[]) => {
        setAccounts(accounts);
      },
    );

    return (): void => {
      subscription.unsubscribe();
    };
  }, [components]);

  const { selector, modal } = components || {};

  const connect = async (): Promise<void> => {
    setIsWaitingForConnection(true);

    setErrorMessage(null);
    connectWalletSelector();

    try {
      const accounts = await pollForWalletConnection();
      setIsWaitingForConnection(false);
      setAccounts(accounts);
    } catch (err: unknown) {
      if (err) {
        setErrorMessage((err as Error).message);
      }
    }
  };

  const disconnect = async (): Promise<void> => {
    await disconnectFromWalletSelector();
    setIsWaitingForConnection(false);
  };

  const contextVal = useMemo<MintbaseWalletContext>(
    () => ({
      selector: selector,
      modal: modal,
      accounts: accounts,
      activeAccountId:
        accounts.find((account) => account.active)?.accountId || null,
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
    <MintbaseWalletContext.Provider value={contextVal}>
      {children}
    </MintbaseWalletContext.Provider>
  );
};

export const useMbWallet = (): MintbaseWalletContext => useContext(MintbaseWalletContext);
