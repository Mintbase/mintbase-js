import { setupWalletSelector, VerifiedOwner, VerifyOwnerParams, Wallet } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { map, distinctUntilChanged, Subscription } from 'rxjs';

import {
  WALLET_CONNECTION_POLL_INTERVAL,
  WALLET_CONNECTION_TIMEOUT,
} from './constants';

import type { WalletSelector, AccountState, WalletModuleFactory } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { SUPPORTED_NEAR_WALLETS } from './wallets.setup';
import { ERROR_MESSAGES } from './errorMessages';
import { mbjs } from '@mintbase-js/sdk';
import { setupMintbaseWallet } from '@mintbase-js/wallet';


// mintbase SDK wallet functionality wraps
// Near Wallet Selector lib, provided by NEAR Protocol
// https://github.com/near/wallet-selector/
export type WalletSelectorComponents = {
    selector: WalletSelector;
    modal: WalletSelectorModal;
}

// wallet components are held and exposed as a singleton reference
// this way they can be more easily passed to other components vs composing calls.
export let walletSelectorComponents: WalletSelectorComponents  = {
  selector: null,
  modal: null,
};

/**
* Set up wallet selector components. Returns the modal
* See also docs on {@link https://github.com/near/wallet-selector/ | near wallet selector}
*/

const walletUrls = {
  testnet: 'https://testnet.wallet.mintbase.xyz/',
  mainnet: 'https://wallet.mintbase.xyz',
};


// eslint-disable-next-line max-len
export const setupMintbaseWalletSelector = async (callbackUrl, onlyMbWallet = false, network?, contractAddress?, options?: { additionalWallets?: Array<WalletModuleFactory>  }): Promise<WalletSelectorComponents> => {
  let selector = await setupWalletSelector({
    network: network,
    debug: mbjs.keys.debugMode,
    modules: [
      setupMintbaseWallet({
        networkId: network,
        walletUrl: walletUrls[network],
        deprecated: false,
        callbackUrl: callbackUrl,
      }),
      ...options?.additionalWallets || [],
    ],
  });
 

  if (onlyMbWallet === false) {
    selector = await setupWalletSelector({
      network: network,
      debug: mbjs.keys.debugMode,
      modules: [
        setupMintbaseWallet({
          networkId: network,
          walletUrl: walletUrls[network],
          deprecated: false,
          callbackUrl: callbackUrl,
        }),
        ...options?.additionalWallets || [],
        ...(await setupDefaultWallets()),
      ],
    });
  }


  const modal = setupModal(selector, {
    contractId:contractAddress,
  });

  walletSelectorComponents = {
    selector,
    modal,
  };
  return walletSelectorComponents;
};


export const setupWalletSelectorComponents = async (network?, contractAddress?, options?: { additionalWallets?: Array<WalletModuleFactory> }): Promise<WalletSelectorComponents> => {
  
  const selector = await setupWalletSelector({
    network: network,
    debug: mbjs.keys.debugMode,
    modules: [
      ...(await setupDefaultWallets()),
      ...SUPPORTED_NEAR_WALLETS,
      ...options?.additionalWallets || [],
    ],
  });

  const modal = setupModal(selector, {
    contractId:contractAddress,
  });

  walletSelectorComponents = {
    selector,
    modal,
  };
  return walletSelectorComponents;
};

export class SetupNotCalledError extends Error {
  message: string;
}

export class ConnectionTimeoutError extends Error {
  message: string;
}

const validateWalletComponentsAreSetup = (): void => {
  if (!walletSelectorComponents.selector) {
    throw new SetupNotCalledError(
      ERROR_MESSAGES.WALLET_SETUP_NOT_CALLED_ERROR,
    );
  }
};

export const registerWalletAccountsSubscriber = (
  callback: (accounts: AccountState[]) => void,
): Subscription => {
  validateWalletComponentsAreSetup();

  return walletSelectorComponents
    .selector
    .store
    .observable
    .pipe(map((state) => state.accounts), distinctUntilChanged())
    .subscribe(callback);
};

// scoped to module and cleared since pollForWalletConnection might
// get called repeatedly in react enviroments
let timerReference = null;

export const pollForWalletConnection = async (): Promise<AccountState[]> => {
  validateWalletComponentsAreSetup();
  // clear any existing timer
  clearTimeout(timerReference);

  const tryToResolveAccountsFromState = (
    resolve: (value: AccountState[]) => void,
    reject: (err: ConnectionTimeoutError) => void,
    elapsed = 0,
  ): void => {
    const { accounts } = walletSelectorComponents
      .selector
      .store
      .getState() || {};

    // accounts present in state
    if (accounts) {
      resolve(accounts);
    }

    // timed out
    if (elapsed > WALLET_CONNECTION_TIMEOUT) {
      reject(new ConnectionTimeoutError(ERROR_MESSAGES.WALLET_CONNECTION_NOT_FOUND));
    }

    // try again
    clearTimeout(timerReference);
    timerReference = setTimeout(() =>
      tryToResolveAccountsFromState(
        resolve,
        reject,
        elapsed + WALLET_CONNECTION_POLL_INTERVAL,
      ), WALLET_CONNECTION_POLL_INTERVAL);

  };

  return new Promise(
    (resolve, reject) => tryToResolveAccountsFromState(resolve, reject),
  );
};

export const getWallet = async (): Promise<Wallet> => {
  validateWalletComponentsAreSetup();

  return await walletSelectorComponents
    .selector
    .wallet();
};

export const connectWalletSelector = (): void => {
  validateWalletComponentsAreSetup();

  walletSelectorComponents
    .modal
    .show();
};

export const disconnectFromWalletSelector = async(): Promise<void> => {
  validateWalletComponentsAreSetup();

  const wallet = await walletSelectorComponents
    .selector
    .wallet();
  wallet.signOut();
};

export const getVerifiedOwner =
  async (params: VerifyOwnerParams): Promise<VerifiedOwner | undefined> => {
    validateWalletComponentsAreSetup();

    const { message, callbackUrl, meta } = params;

    const wallet = await walletSelectorComponents
      .selector
      .wallet();

    const owner = await wallet.verifyOwner({
      message: message,
      callbackUrl: callbackUrl,
      meta: meta,
    }) as VerifiedOwner;

    return owner;
  };


// returns a signature of message
export const signMessage = async (params: VerifyOwnerParams): Promise<VerifiedOwner> => {
  const owner = await getVerifiedOwner(params);

  return owner;
};


//  https://www.npmjs.com/package/bs58
// https://github.com/feross/buffer
// https://github.com/near/wallet-selector/issues/434
// export const verifyMessage = async (signature: string): Promise<boolean> => {

//   // const owner = await getVerifiedOwner(signature);

//   // const publicKeyString = `ed25519:${BinaryToBase58(Buffer.from(owner.publicKey, 'base64'))}`;

//   // const createdPublicKey = utils.PublicKey.from(publicKeyString);

//   // const stringified = JSON.stringify(owner);

//   // const verified = createdPublicKey.verify(new Uint8Array(sha256.array(stringified)), Buffer.from(signature, 'base64'));

//   return false;
// };
