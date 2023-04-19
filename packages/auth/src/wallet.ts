import { setupWalletSelector, VerifiedOwner, VerifyOwnerParams, Wallet } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { map, distinctUntilChanged, Subscription } from 'rxjs';
import { mbjs, Network } from '@mintbase-js/sdk';
import {
  MINTBASE_CONNECT_HOST,
  WALLET_CONNECTION_POLL_INTERVAL,
  WALLET_CONNECTION_TIMEOUT,
} from './constants';

import type { WalletSelector, AccountState, WalletSelectorState } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { SUPPORTED_NEAR_WALLETS } from './wallets.setup';
import { ERROR_MESSAGES } from './errorMessages';

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
export const setupWalletSelectorComponents = async (): Promise<WalletSelectorComponents> => {

  const selector = await setupWalletSelector({
    network: mbjs.keys.network as Network,
    debug: mbjs.keys.debugMode,
    modules: [
      ...(await setupDefaultWallets()),
      ...SUPPORTED_NEAR_WALLETS,
    ],
  });


  const modal = setupModal(selector, {
    contractId: mbjs.keys.contractAddress ?? mbjs.keys.mbContract,
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

export const getSelectorState = (): WalletSelectorState => {
  return walletSelectorComponents
    .selector
    .store
    .getState();
};

export const isMeteorWallet = (): boolean =>
  getSelectorState().selectedWalletId === 'meteor-wallet';

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


// message signing with key pair support
// at some point all wallets should support this, hopefully verify is standardized as well

// https://github.com/near/wallet-selector/issues/434
// https://github.com/near/NEPs/pull/413
// https://www.npmjs.com/package/bs58
// https://github.com/feross/buffer
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


export const signMessage = async (params: VerifyOwnerParams): Promise<VerifiedOwner> => {
  const owner = await getVerifiedOwner(params);

  return owner;
};

export type SigningPayload = {
  signature: string;
  message: string;
  publicKey: string;
  accountId: string;
  keyType: string | number;
  blockId: string;
}

export type MintbaseSession = {
  accountId: string;
  createdAt: string;
  token: string;
  // TODO: augment with fields in Firestore (connect service)
}

export const requestMintbaseSessionToken = async (): Promise<string | null> => {
  if (!isMeteorWallet()) {
    console.warn('Attempting to create a session with a non-meteor wallet.');
    return null;
  }

  const payload = await signMessage({
    message: new Date().toString(),
    // callbackUrl: `${window.location.origin}/wallet-callback`,
    //meta: JSON.stringify({ type: 'signature' }),
  });

  // if a proxy host is defined use that
  // (better for cors and overall security)
  const authEndpoint = mbjs.keys.connectProxyAddress
    ? mbjs.keys.connectProxyAddress
    : `${MINTBASE_CONNECT_HOST}/auth`;

  try {
    const request = await fetch(authEndpoint, {
      method: 'POST',
      headers: {
        'mb-api-key': mbjs.keys.apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const { token } = await request.json();
    return token;
  } catch (err) {
    console.error('Error requesting session token', err);
    return null;
  }
};

export const getMintbaseSessionFromToken = async (token: string): Promise<MintbaseSession | null> => {
  const sessionEndpoint = mbjs.keys.connectProxyAddress
    ? mbjs.keys.connectProxyAddress
    : `${MINTBASE_CONNECT_HOST}/session`;

  try {
    const request = await fetch(sessionEndpoint, {
      headers: {
        'mb-api-key': mbjs.keys.apiKey,
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const session = await request.json();
    return session;
  } catch (err) {
    console.error('Error fetching session from token!', err);
    return null;
  }
};
