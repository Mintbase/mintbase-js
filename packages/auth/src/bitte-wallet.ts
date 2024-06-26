import {
  setupWalletSelector,
  VerifiedOwner,
  VerifyOwnerParams,
  Wallet,
} from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { map, distinctUntilChanged, Subscription } from 'rxjs';

import {
  WALLET_CONNECTION_POLL_INTERVAL,
  WALLET_CONNECTION_TIMEOUT,
} from './constants';

import type {
  WalletSelector,
  AccountState,
  WalletModuleFactory,
} from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { SUPPORTED_NEAR_WALLETS } from './wallets.setup';
import { ERROR_MESSAGES } from './errorMessages';
import { mbjs } from '@mintbase-js/sdk';
import { setupBitteWallet } from '@mintbase-js/wallet';
import { ConnectionTimeoutError } from './wallet';

// mintbase SDK wallet functionality wraps
// Near Wallet Selector lib, provided by NEAR Protocol
// https://github.com/near/wallet-selector/

export type WalletSelectorComponents = {
  selector: WalletSelector;
  modal: WalletSelectorModal;
}


const walletUrls = {
  testnet: 'https://testnet.wallet.bitte.ai/',
  mainnet: 'https://wallet.bitte.ai',
};

export const BitteWalletAuth = {
  walletSelectorComponents: {
    selector: null,
    modal: null,
  },
  setupBitteWalletSelector: async (
    callbackUrl,
    onlyMbWallet = false,
    network?,
    contractAddress?,
    options?: { additionalWallets?: Array<WalletModuleFactory> },
  ): Promise<WalletSelectorComponents> => {


    if (onlyMbWallet === false) {

      BitteWalletAuth.walletSelectorComponents.selector = await setupWalletSelector({
        network: network,
        debug: mbjs.keys.debugMode,
        modules: [
          setupBitteWallet({
            walletUrl: walletUrls[network],
            deprecated: false,
            callbackUrl: callbackUrl,
          }),
          ...(options?.additionalWallets || []),
          ...SUPPORTED_NEAR_WALLETS,
        ],
      });
    } else {
      BitteWalletAuth.walletSelectorComponents.selector = await setupWalletSelector({
        network: network,
        debug: mbjs.keys.debugMode,
        modules: [
          setupBitteWallet({
            walletUrl: walletUrls[network],
            deprecated: false,
            callbackUrl: callbackUrl,
          }),
          ...(options?.additionalWallets || []),
        ],
      });
    }

    BitteWalletAuth.walletSelectorComponents.modal = setupModal( BitteWalletAuth.walletSelectorComponents.selector, {
      contractId: contractAddress,
    });

    return BitteWalletAuth.walletSelectorComponents;
  },
  setupWalletSelectorComponents: async (
    network?,
    contractAddress?,
    options?: { additionalWallets?: Array<WalletModuleFactory> },
  ): Promise<WalletSelectorComponents> => {
    const selector = await setupWalletSelector({
      network: network,
      debug: mbjs.keys.debugMode,
      modules: [
        ...SUPPORTED_NEAR_WALLETS,
        ...(options?.additionalWallets || []),
      ],
    });

    const modal = setupModal(selector, {
      contractId: contractAddress,
    });

    BitteWalletAuth.walletSelectorComponents = {
      selector,
      modal,
    };
    return BitteWalletAuth.walletSelectorComponents;
  },
  SetupNotCalledError: class extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'SetupNotCalledError';
    }
  },
  ConnectionTimeoutError: class extends Error {
    message: string
  },
  validateWalletComponentsAreSetup:(): void => {
    if (!BitteWalletAuth.walletSelectorComponents.selector) {
      throw new BitteWalletAuth.SetupNotCalledError(ERROR_MESSAGES.WALLET_SETUP_NOT_CALLED_ERROR);
    }
  },
  registerWalletAccountsSubscriber: (
    callback: (accounts: AccountState[]) => void,
  ): Subscription => {
    BitteWalletAuth.validateWalletComponentsAreSetup();

    return BitteWalletAuth.walletSelectorComponents.selector.store.observable
      .pipe(
        map((state:any) => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe(callback);
  },
  timerReference: null,
  pollForWalletConnection: async (): Promise<AccountState[]> => {
    BitteWalletAuth.validateWalletComponentsAreSetup();
    // clear any existing timer
    clearTimeout(BitteWalletAuth.timerReference);

    const tryToResolveAccountsFromState = (
      resolve: (value: AccountState[]) => void,
      reject: (err: ConnectionTimeoutError) => void,
      elapsed = 0,
    ): void => {
      const { accounts } =
        BitteWalletAuth.walletSelectorComponents.selector.store.getState() || {};

      // accounts present in state
      if (accounts) {
        resolve(accounts);
      }

      // timed out
      if (elapsed > WALLET_CONNECTION_TIMEOUT) {
        reject(
          new ConnectionTimeoutError(ERROR_MESSAGES.WALLET_CONNECTION_NOT_FOUND),
        );
      }

      // try again
      clearTimeout(BitteWalletAuth.timerReference);
      BitteWalletAuth.timerReference = setTimeout(
        () =>
          tryToResolveAccountsFromState(
            resolve,
            reject,
            elapsed + WALLET_CONNECTION_POLL_INTERVAL,
          ),
        WALLET_CONNECTION_POLL_INTERVAL,
      );
    };

    return new Promise((resolve, reject) =>
      tryToResolveAccountsFromState(resolve, reject),
    );
  },
  getWallet: async (): Promise<Wallet> => {
    BitteWalletAuth.validateWalletComponentsAreSetup();

    return await BitteWalletAuth.walletSelectorComponents.selector.wallet();
  },
  connectWalletSelector:(): void => {
    BitteWalletAuth.validateWalletComponentsAreSetup();

    BitteWalletAuth.walletSelectorComponents.modal.show();
  },
  disconnectFromWalletSelector: async (): Promise<void> => {
    BitteWalletAuth.validateWalletComponentsAreSetup();

    const wallet = await BitteWalletAuth.walletSelectorComponents.selector.wallet();
    wallet.signOut();
  },
  getVerifiedOwner: async (
    params: VerifyOwnerParams,
  ): Promise<VerifiedOwner | undefined> => {
    BitteWalletAuth.validateWalletComponentsAreSetup();

    const { message, callbackUrl, meta } = params;

    const wallet = await BitteWalletAuth.walletSelectorComponents.selector.wallet();

    const owner = (await wallet.verifyOwner({
      message: message,
      callbackUrl: callbackUrl,
      meta: meta,
    })) as VerifiedOwner;

    return owner;
  },
  signMessage: async (
    params: VerifyOwnerParams,
  ): Promise<VerifiedOwner> => {
    const owner = await BitteWalletAuth.getVerifiedOwner(params);

    return owner;
  },
};
