
import type {
  BrowserWallet,
  WalletModuleFactory,
  WalletModule,
} from '@near-wallet-selector/core';
import { MintbaseWallet } from './mintbase-wallet';
import { resolveWalletUrl } from './utils';

interface MintbaseWalletSetup {
  callbackUrl?: string;
  successUrl?: string;
  walletUrl?: string;
  failureUrl?: string;
  deprecated?: boolean;
  contractId?: string;
  lak?: boolean;
}

const icon =
  'data:image/png;base64,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';

export function setupMintbaseWallet({
  walletUrl = '',
  deprecated = false,
  successUrl = '',
  failureUrl = '',
  callbackUrl = '',
  contractId = '',
}: MintbaseWalletSetup = {}): WalletModuleFactory<BrowserWallet> {

  return async (moduleOptions): Promise<WalletModule<BrowserWallet> | null> => {

    const wallet: WalletModule<BrowserWallet> = {
      id: 'mintbase-wallet',
      type: 'browser',
      metadata: {
        name: 'Mintbase Wallet',
        description:
          'NEAR wallet to store, buy, send and stake assets for DeFi.',
        iconUrl: icon,
        deprecated,
        available: true,
        successUrl,
        failureUrl,
        walletUrl: resolveWalletUrl(moduleOptions.options.network.networkId, walletUrl),
      },
      init: (options) => {
        return MintbaseWallet({ callback: callbackUrl, networkId: moduleOptions.options.network.networkId, successUrl, failureUrl, contractId,  ...options });
      },
    };
    return wallet;
  };
}
