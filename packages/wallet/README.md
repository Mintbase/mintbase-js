[//]: # `{ "title": "@mintbase-js/wallet", "order": "3" }`

# @mintbase-js/wallet

  

![](https://github.com/Mintbase/mintbase-js/assets/11164548/39d50d30-f2e2-45fc-ba69-1853c6906ef1)

  
  

This is the [Mintbase Wallet](https://wallet.mintbase.xyz/) SDK package.
You can check a quick example of Simple Login using Next.js 14 and @mintbase-js/react
  

<p  align="center">

<img  src='https://img.shields.io/npm/dw/@mintbase-js/wallet'  />
<img  src='https://img.shields.io/bundlephobia/min/@mintbase-js/wallet'>
</p>

  
  

check our [React integration](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/react#mintbasewalletcontextprovider)

Example:
You can check a [quick example of Simple Login](https://github.com/Mintbase/starter) using Next.js 14 and @mintbase-js/react


## Installation and Usage

  

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

  

```bash

# Using Yarn

yarn  add  near-api-js


# Using NPM.

npm  install  near-api-js

  

# Using PNPM.

  
pnpm  install  near-api-js

  

```

  

```bash

# Using Yarn

yarn  add  @mintbase-js/wallet

  

# Using NPM.

npm  install  @mintbase-js/wallet

  

# Using PNPM.

pnpm  install  @mintbase-js/wallet

  

```

  

Then use it in your dApp:

  
  

{% code title="setup.ts" overflow="wrap" lineNumbers="true" %}

  
  

```ts
import { setupWalletSelector } from  "@near-wallet-selector/core";
import { setupMintbaseWallet } from  "@mintbase-js/wallet";

const  mintbaseWallet = setupMintbaseWallet({
	networkId:  'mainnet',
	walletUrl:  'https://wallet.mintbase.xyz',
	callbackUrl:  'https://www.mywebsite.com',
	deprecated:  false,
});

const  selector = await  setupWalletSelector({
	network:  "mainnet",
	modules: [mintbaseWallet],
});
```

{% endcode %}

  
  

## setupMintbaseWallet

  

`networkId:` Near Networks

  

`walletUrl:` valid wallet urls

  

`successUrl:` If you dont have a single callback entrypoint to handle failure/success you can set successUrl.

  

`failureUrl:` If you dont have a single callback entrypoint to handle failure/success you can set failureUrl.

  

`callbackUrl:` when you have a single entrypoint to deal with transaction results.

  
  

| property | value |

|--|--|

| networkId | `mainnet` or `testnet` |

| walletUrl | `https://wallet.mintbase.xyz` or `https://testnet.wallet.mintbase.xyz` |

| successUrl | any http or https url as a string|

| failureUrl | any http or https url as a string|

| callbackUrl | any http or https url as a string|

## Troubleshooting

**Client-side only:**
The wallet runs only on client-side.

Any other questions or issues you can contact support on our [Telegram Channel](https://telegram.me/mintdev).

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).