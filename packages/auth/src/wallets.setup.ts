import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { WalletModuleFactory } from '@near-wallet-selector/core';

export const SUPPORTED_NEAR_WALLETS: Array<WalletModuleFactory> =[
  setupNearWallet(),
  setupMeteorWallet(),
  setupSender(),
  setupHereWallet(),
];
