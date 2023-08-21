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
import {
  type WalletSelector,
  type AccountState,
  type VerifiedOwner,
  type VerifyOwnerParams,
  type WalletModuleFactory,
  setupWalletSelector,
} from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import type { Network } from '@mintbase-js/sdk';
import { mbjs } from '@mintbase-js/sdk';

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

export const WalletContextProvider: React.FC<{ children: React.ReactNode; network?: Network; contractAddress?: string; additionalWallets?: Array<WalletModuleFactory>; isMintbaseWallet?: boolean}> = ({
  children, network, contractAddress, additionalWallets, isMintbaseWallet = false,
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

  const [mbWalletUsername, setMbWalletUsername] =
    useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const [mbWalletSelector, setWalletMb] = useState(null);
  const selectedNetwork =   network || mbjs.keys.network;
  const selectedContract = contractAddress || mbjs.keys.contractAddress;


  const setup = useCallback(async () => {
    const components = await setupWalletSelectorComponents(
      selectedNetwork,
      selectedContract,
      {
        additionalWallets,
      },
    );

    setIsWalletSelectorSetup(true);
    setComponents(components);
  }, []);

  const onCloseModal = (): void => {
    setIsWaitingForConnection(false);
  };

  const setupWallet = async () => {
    const components = await setupWalletSelectorComponents(
      selectedNetwork,
      selectedContract,
      {
        additionalWallets,
      },
    );

    console.log(components, additionalWallets, 'components');

    return components;
  };


  useEffect(() => {


    const setupMintbaseWallet = async () => await setupWalletSelector({
      network: network,
      debug: mbjs.keys.debugMode,
      modules: [
        ...additionalWallets,
      ],
    });


    if (isMintbaseWallet) {

      const mbSelector = setupMintbaseWallet();

      setWalletMb(mbSelector);
    }

  
    const handleUsernameChange = (event) => {

      console.log(event, event.detail, event.detail[0]);
      const newUsername = event.detail[0].accountId;
      setMbWalletUsername(newUsername);
      setIsConnected(true);

      setAccounts(event.detail[0]);

    
      console.log(isConnected, isMintbaseWallet, mbWalletUsername, accounts, 'mb wallet');
    };

    // Listen for the custom event
    window.addEventListener('mbWalletLogin', handleUsernameChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mbWalletLogin', handleUsernameChange);
    };
  }, [setup]);


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

        console.log(accounts, 'accounts 1');
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
      console.log(accounts, 'accounts 2');
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

  const walletSelectorContextValue = useMemo<WalletContext>(
    () => ({
      selector: isMintbaseWallet? mbWalletSelector : selector,
      modal: modal,
      accounts: accounts,
      activeAccountId: isMintbaseWallet ? mbWalletUsername :
        accounts.find((account) => account.active)?.accountId || null,
      isConnected: isMintbaseWallet ? isConnected : accounts && accounts.length > 0,
      isWaitingForConnection: isWaitingForConnection,
      isWalletSelectorSetup: isWalletSelectorSetup,
      errorMessage: errorMessage,
      connect,
      disconnect,
      signMessage,
    }),
    [selector, modal, accounts, isMintbaseWallet, isConnected, mbWalletUsername],
  );

  return (
    <WalletContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContext => useContext(WalletContext);
