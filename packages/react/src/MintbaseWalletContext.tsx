/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
  setupWalletSelectorComponents,
  connectWalletSelector,
  disconnectFromWalletSelector,
  pollForWalletConnection,
  signMessage,
} from '@mintbase-js/auth/lib/wallet';
import type { WalletSelectorComponents } from '@mintbase-js/auth/lib/wallet';
import type {
  WalletSelector,
  AccountState,
  VerifiedOwner,
  VerifyOwnerParams,
  WalletModuleFactory,
} from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import type { Network } from '@mintbase-js/sdk';
import { mbjs } from '@mintbase-js/sdk';
import { setupMintbaseWallet } from '@mintbase-js/wallet';

// This is heavily based on
// https://github.com/near/wallet-selector/blob/main/examples/react/contexts/WalletSelectorContext.tsx
// but uses wrappers from @mintbase-js/auth and @mintbase-js/sdk
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

export const MintbaseWalletContext = createContext<MintbaseWalletContext | null>(null);

// eslint-disable-next-line max-len
export const MintbaseWalletContextProvider: React.FC<{ children: React.ReactNode; callbackUrl: string; network?: Network; onlyMbWallet?: boolean; contractAddress?: string; additionalWallets?: Array<WalletModuleFactory> }> = ({
  children, network, contractAddress, additionalWallets, onlyMbWallet, callbackUrl,
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

  const selectedNetwork =   network || mbjs.keys.network;
  const selectedContract = contractAddress || mbjs.keys.contractAddress;

  const walletUrls = {
    testnet: 'https://testnet.wallet.mintbase.xyz/',
    mainnet: 'https://wallet.mintbase.xyz',
  };

  const setupMbWallet = async () => {
      
    if (onlyMbWallet) {
      return await setupWalletSelectorComponents(
        selectedNetwork,
        selectedContract,
        {
          additionalWallets: [
            setupMintbaseWallet({
              networkId: network,
              walletUrl: walletUrls[network],
              deprecated: false,
              callbackUrl: callbackUrl,
            }),
          ],
          onlyMbWallet: true,
        },
      );
    } else {

      return await setupWalletSelectorComponents(
        selectedNetwork,
        selectedContract,
        {
          additionalWallets: [
            ...additionalWallets,
            setupMintbaseWallet({
              networkId: network,
              walletUrl: walletUrls[network],
              deprecated: false,
              callbackUrl: callbackUrl,
            }),
          ],
          onlyMbWallet: false,
        },
      );

    }
  };

  const setup = useCallback(async () => {
    const components = await setupMbWallet();

    setIsWalletSelectorSetup(true);
    setComponents(components);
  }, []);

  const onCloseModal = (): void => {
    setIsWaitingForConnection(false);
  };

  const setupWallet = async () => {
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
    return () => {
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

  const walletSelectorContextValue = useMemo<MintbaseWalletContext>(
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
    <MintbaseWalletContext.Provider value={walletSelectorContextValue}>
      {children}
    </MintbaseWalletContext.Provider>
  );
};

export const useMbWallet = (): MintbaseWalletContext => useContext(MintbaseWalletContext);
