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

export const WalletContextProvider: React.FC<{ children: React.ReactNode; network?: Network; contractAddress?: string; additionalWallets?: Array<WalletModuleFactory> }> = ({
  children, network, contractAddress, additionalWallets,
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

  const [isMbWallet, setIsMbWallet] =
    useState<boolean>(false);

  const [mbWalletUsername, setMbWalletUsername] =
    useState<string>('');
  const [isConnected, setIsConnected] = useState(false);


  const selectedNetwork =   network || mbjs.keys.network;
  const selectedContract = contractAddress || mbjs.keys.contractAddress;


 


  // useEffect(() => {
  //   const checkLocalStorage = () => {
  //     const activeAccountId = localStorage.getItem('mintbasewallet:activeAccountId');

  // if(isMintbaseWallet == 'mintbasewallet') {
  //   setIsMbWallet(true)
  // }

  //     if (activeAccountId) {
  //       setIsConnected(true);
  //       setMbWalletUsername(activeAccountId)
  //       console.log(activeAccountId,isConnected , 'isConnected');
  //     }
  //   };

  //   // Initial check
  //   checkLocalStorage();

  //   // Polling interval (adjust the interval time as needed)
  //   const pollingInterval = setInterval(checkLocalStorage, 1000); // Check every 1 second

  //   // Cleanup the interval when component unmounts
  //   return () => {
  //     clearInterval(pollingInterval);
  //   };
  // }, []);


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
    return components;
  };


 useEffect(() => {
    const handleUsernameChange = (event) => {
      const newUsername = event.detail[0].accountId;
      setMbWalletUsername(newUsername);
      setIsMbWallet(true);
      setIsConnected(true);
      setupWallet();
      setAccounts(event.detail[0]);

      registerWalletAccountsSubscriber(
        (accounts: AccountState[]) => {

          console.log(accounts, 'accounts 333');
          setAccounts(accounts);
        },
      );

      console.log(isConnected, isMbWallet, mbWalletUsername, accounts, 'mb wallet');
    };

    // Listen for the custom event
    window.addEventListener('mbWalletLogin', handleUsernameChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mbWalletLogin', handleUsernameChange);
    };
  }, []);


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
      selector: selector,
      modal: modal,
      accounts: accounts,
      activeAccountId: isMbWallet ? mbWalletUsername :
        accounts.find((account) => account.active)?.accountId || null,
      isConnected: isMbWallet ? isConnected : accounts && accounts.length > 0,
      isWaitingForConnection: isWaitingForConnection,
      isWalletSelectorSetup: isWalletSelectorSetup,
      errorMessage: errorMessage,
      connect,
      disconnect,
      signMessage,
    }),
    [selector, modal, accounts, isMbWallet, isConnected, mbWalletUsername],
  );

  return (
    <WalletContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContext => useContext(WalletContext);
