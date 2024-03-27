[//]: # `{ "title": "@mintbase-js/react", "order": "3" }`

# @mintbase-js/react

This package contains React helpers for interacting with Mintbase JS.

<p align="center">

<img  src='https://img.shields.io/npm/dw/@mintbase-js/react'  />

<img  src='https://img.shields.io/bundlephobia/min/@mintbase-js/react'>

</p>

Example:
You can check a [quick example of Simple Login](https://github.com/Mintbase/examples/tree/main/starter) using Next.js 14 and @mintbase-js/react


[Check our Templates repository for Mintbase.js](https://github.com/Mintbase/templates)

[Live Demo](https://starter.mintbase.xyz/)

## Summary

- [Installing](#Installing)

- [MintbaseWalletContextProvider (default)](#mintbasewalletcontextprovider) : The default Mintbase Wallet provider


# Installing

`@mintbase-js/react relies on React and React Dom version v18.2.0 due to @near-wallet-selector/modal-ui`

### NPM:

```
npm install @mintbase-js/react
npm install @near-wallet-selector/modal-ui
```

### Yarn:

```
yarn add @mintbase-js/react
yarn add @near-wallet-selector/modal-ui
```

### PNPM:

```
pnpm install @mintbase-js/react
pnpm install @near-wallet-selector/modal-ui
```

# MintbaseWalletContextProvider

the default way of interacting with Mintbase Wallet is using the MintbaseWalletContextProvider

{% code title="app.tsx" overflow="wrap" lineNumbers="true" %}

## properties:

**contractAddress** (optional): `If you set this it will connect the user using Limited Access Keys, set with your near contract address / your mintbase store address`

**network** : ` mainnet | testnet`

**callbackUrl** : `a valid https/http address to the user be sent after the transaction`

**onlyMbWallet** : `boolean, it sets up only MintbaseWallet or if false(default) MintbaseWallet + default wallets`

**additionalWallets** : `WalletModuleFactory[] extra wallets setup`

```typescript
import "@near-wallet-selector/modal-ui/styles.css";
import { MintbaseWalletContextProvider } from  '@mintbase-js/react'

<MintbaseWalletContextProvider
  contractAddress="mycontract.mintbase1.near"
  network="mainnet"
  callbackUrl="https://www.mywebsite.com/callback"
>
   <Component {...pageProps} />
</MintbaseWalletContextProvider>

```

# Troubleshooting
The wallet runs only on client-side.

Any other questions or issues you can contact support on our [Telegram Channel](https://telegram.me/mintdev).


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).