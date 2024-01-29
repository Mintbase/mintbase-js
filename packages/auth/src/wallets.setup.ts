import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

import { WalletModuleFactory } from '@near-wallet-selector/core';

export const SUPPORTED_NEAR_WALLETS: Array<WalletModuleFactory> =[
  setupMeteorWallet(),
  setupMyNearWallet(),
  setupHereWallet(),
];
