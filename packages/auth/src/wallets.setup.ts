import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMathWallet } from '@near-wallet-selector/math-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupNarwallets } from '@near-wallet-selector/narwallets';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { setupNearSnap } from '@near-wallet-selector/near-snap';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupWalletConnect } from '@near-wallet-selector/wallet-connect';
import { setupNightlyConnect } from '@near-wallet-selector/nightly-connect';
import { setupNearFi } from '@near-wallet-selector/nearfi';
import { setupCoin98Wallet } from '@near-wallet-selector/coin98-wallet';
import { setupOptoWallet } from '@near-wallet-selector/opto-wallet';
import { setupFinerWallet } from '@near-wallet-selector/finer-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupXDEFI } from '@near-wallet-selector/xdefi';

import { WalletModuleFactory } from '@near-wallet-selector/core';

export const SUPPORTED_NEAR_WALLETS: Array<WalletModuleFactory> =[
  setupNearWallet(),
  setupMeteorWallet(),
  setupSender(),
  setupMyNearWallet(),
  setupHereWallet(),
];


export const ALL_WALLETS: Array<WalletModuleFactory> =[
  setupNearWallet(),
  setupMyNearWallet(),
  setupSender(),
  setupHereWallet(),
  setupMathWallet(),
  setupNightly(),
  setupMeteorWallet(),
  setupNearSnap(),
  setupNarwallets(),
  setupWelldoneWallet(),
  setupLedger(),
  setupNearFi(),
  setupCoin98Wallet(),
  setupOptoWallet(),
  setupFinerWallet(),
  setupNeth(),
  setupXDEFI(),
];
