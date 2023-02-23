import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { WalletModuleFactory } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMathWallet } from '@near-wallet-selector/math-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupNearFi } from '@near-wallet-selector/nearfi';
import { setupCoin98Wallet } from '@near-wallet-selector/coin98-wallet';
import { setupOptoWallet } from '@near-wallet-selector/opto-wallet';
import { setupNeth } from '@near-wallet-selector/neth';

export const SUPPORTED_NEAR_WALLETS: Array<WalletModuleFactory> =[
  setupNearWallet(),
  setupMyNearWallet(),
  setupSender(),
  setupHereWallet(),
  setupMathWallet(),
  setupNightly(),
  setupMeteorWallet(),
  setupWelldoneWallet(),
  setupLedger(),
  setupNearFi(),
  setupCoin98Wallet(),
  setupOptoWallet(),
  setupNeth(),
];
