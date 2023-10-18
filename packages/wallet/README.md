# @mintbase-js/wallet

This is the [Mintbase Wallet](https://wallet.mintbase.xyz/) package.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js

# Using PNPM.
pnpm install near-api-js

```
```bash
# Using Yarn
yarn add @mintbase-js/wallet

# Using NPM.
npm install @mintbase-js/wallet

# Using PNPM.
pnpm install @mintbase-js/wallet

```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMintbaseWallet } from "@mintbase-js/wallet";

const mintbaseWallet = setupMintbaseWallet({
          networkId: network,
          walletUrl: 'https://wallet.mintbase.xyz',
          deprecated: false,
        });

const selector = await setupWalletSelector({
  network: "mainnet",
  modules: [mintbaseWallet],
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).