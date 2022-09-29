import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets';
import { map, distinctUntilChanged, Subscription } from 'rxjs';
import {
  NEAR_WALLET_ENV,
  NEAR_LOGIN_CONTRACT_ID,
  NEAR_WALLET_SELECTOR_DEBUG,
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
export let walletSelectorComponents: WalletSelectorComponents | null = null;

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

  const modal = setupModal(selector, {
    contractId: NEAR_LOGIN_CONTRACT_ID,
  });

  walletSelectorComponents = {
    selector,
    modal,
  };
  return walletSelectorComponents;
};

export class SetupNotCalledError extends Error {}

export const registerWalletAccountsSubscriber = (
  callback: (accounts: AccountState[]) => void,
): Subscription => {
  if (!walletSelectorComponents) {
    throw new SetupNotCalledError(
      'Call and await setupWalletSelectorComponents() before registering a subscriber',
    );
  }

  return walletSelectorComponents
    .selector
    .store
    .observable
    .pipe(map((state) => state.accounts), distinctUntilChanged())
    .subscribe(callback);
};

