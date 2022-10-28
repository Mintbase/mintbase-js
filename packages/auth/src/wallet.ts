import { setupWalletSelector, VerifiedOwner, Wallet } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { map, distinctUntilChanged, Subscription } from 'rxjs';
import {
  NEAR_WALLET_ENV,
  NEAR_LOGIN_CONTRACT_ID,
  NEAR_WALLET_SELECTOR_DEBUG,
  DEFAULT_MINTBASE_CONTRACT_MAINNET,
  DEFAULT_MINTBASE_CONTRACT_TESTNET,
  WALLET_SETUP_NOT_CALLED_ERROR,
  WALLET_CONNECTION_NOT_FOUND,
  WALLET_CONNECTION_POLL_INTERVAL,
  WALLET_CONNECTION_TIMEOUT,
} from './constants';

import type { WalletSelector, AccountState } from '@near-wallet-selector/core';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';

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

export const setupWalletSelectorComponents = async (): Promise<WalletSelectorComponents> => {
  const selector = await setupWalletSelector({
    network: NEAR_WALLET_ENV,
    debug: NEAR_WALLET_SELECTOR_DEBUG,
    modules: [
      ...(await setupDefaultWallets()),
      setupNearWallet(),
      setupSender(),
    ],
  });

  const defaultMintbaseContract = NEAR_WALLET_ENV === 'testnet'
    ? DEFAULT_MINTBASE_CONTRACT_TESTNET
    : DEFAULT_MINTBASE_CONTRACT_MAINNET;

  const modal = setupModal(selector, {
    contractId: NEAR_LOGIN_CONTRACT_ID || defaultMintbaseContract,
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
      WALLET_SETUP_NOT_CALLED_ERROR,
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
  // clear any existing timers
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
      reject(new ConnectionTimeoutError(WALLET_CONNECTION_NOT_FOUND));
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

export const getVerifiedOwner = async (message: string): Promise<VerifiedOwner | undefined> => {
  validateWalletComponentsAreSetup();

  const wallet = await walletSelectorComponents
    .selector
    .wallet();

  const owner = await wallet.verifyOwner({
    message: message,
  }) as VerifiedOwner;

  return owner;
};


// returns a signature of message
export const signMessage = async (message: string): Promise<VerifiedOwner> => {
  const owner = await getVerifiedOwner(message);

  return owner;
};
  

//  https://www.npmjs.com/package/bs58
// https://github.com/feross/buffer
// https://github.com/near/wallet-selector/issues/434
export const verifyMessage = async (signature: string): Promise<boolean> => {

  // const owner = await getVerifiedOwner(signature);
  
  // const publicKeyString = `ed25519:${BinaryToBase58(Buffer.from(owner.publicKey, 'base64'))}`;

  // const createdPublicKey = utils.PublicKey.from(publicKeyString);

  // const stringified = JSON.stringify(owner);

  // const verified = createdPublicKey.verify(new Uint8Array(sha256.array(stringified)), Buffer.from(signature, 'base64'));

  return false;
};
  
