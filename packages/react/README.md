
[//]: # `{ "title": "@mintbase-js/react", "order": "2" }`

  
# @mintbase-js/react

  

This package contains React helpers for interacting with Mintbase JS.

<p  align="center">

<img src='https://img.shields.io/npm/dw/@mintbase-js/react'  />

<img src='https://img.shields.io/bundlephobia/min/@mintbase-js/react'>

</p>

## Summary

  

- [Installing](#Installing)

- [MintbaseWalletContextProvider (default)](#mintbasewalletcontextprovider) : The default Mintbase Wallet provider

- [Hooks](#Hooks): a variety of hooks to make data fetching and transactions from our SDK/Data modules super easy in your React apps.

 ## Deprecated
 we still give support, but is not currently being used or maintained.
- [Config consts (deprecated)](#config) : Config the network and global variables on mintbase-js packages

- [WalletContextProvider (deprecated)](#walletcontextprovider) : the provider that will wrap the wallets to make it work in your application

- [WalletContext (deprecated)](#walletcontext): helper with methods to use the power of near-wallet-selector 



# Installing

  

```@mintbase-js/react relies on React and React Dom version v18.2.0 due to @near-wallet-selector/modal-ui```

  

### NPM:

  

```

npm install @mintbase-js/react

```

### Yarn:

```

yarn add @mintbase-js/react

```

### PNPM:

```

pnpm add @mintbase-js/react

```

# MintbaseWalletContextProvider 

the default way of interacting with Mintbase Wallet is using the MintbaseWalletContextProvider

{% code title="app.tsx" overflow="wrap" lineNumbers="true" %}

| prop | value |
|--|--|
|contractAddress  | your near contract address / your mintbase store address |
|network  | mainnet / testnet |
|callbackUrl  | a valid https/http address to be sent after the transaction |
|onlyMbWallet  | boolean, it sets up only MintbaseWallet or if false(default) MintbaseWallet + default wallets |
|additionalWallets  | WalletModuleFactory[] extra wallets setup |


```typescript
import { MintbaseWalletContextProvider } from '@mintbase-js/react'

<MintbaseWalletContextProvider
	contractAddress="mycontract.mintbase1.near"
	network="mainnet"
	callbackUrl="https://www.mywebsite.com/callback">

	<Component {...pageProps} />

</MintbaseWalletContextProvider>

```

{% endcode %}

  

# Hooks

 
a variety of hooks to make data fetching and transactions from our SDK/Data modules super easy in your React apps.


### useOwnedNftsByStore
hook to fetch owned nfts by store (contractAddress)

*params:*
`ownerId: string`
`contractAddress: string`
`pagination: { limit: number; offset?: number}`

### useTokenById
hook to fetch token by Id 
*params:*
`tokenId: string,contractAddress: string`


# config vars (deprecated)

  

read about config global variables on: [Config SDK method](https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk/config)

  

***ALSO RECOMMENDED TO DO:*** you can set network and contractAddress (the one from your dapp/mintbase store) straight on the WalletContextProvider too like this:

{% code title="app.tsx" overflow="wrap" lineNumbers="true" %}

```typescript

<WalletContextProvider  network="mainnet"  contractAddress="mycontract.mintbase1.near">

<Component {...pageProps} />

</WalletContextProvider>

```

{% endcode %}

  
  

# WalletContextProvider (deprecated)

WalletContextProvider is the provider you should wrap on your regular app.tsx/app.jsx file so that your application can work with our Wallet Selector:

  

Example usage in React Apps:

  

- Its important to install ```@near-wallet-selector/modal-ui```

  

- Next.js example:

  

{% code title="app.tsx" overflow="wrap" lineNumbers="true" %}

```typescript

import  type { AppProps } from  'next/app';

import { WalletContextProvider } from  '@mintbase-js/react';

import  '@near-wallet-selector/modal-ui/styles.css';

  

function  MyApp({ Component, pageProps }: AppProps): JSX.Element {

return (

<WalletContextProvider>

<Component {...pageProps} />

</WalletContextProvider>

);

}

```

{% endcode %}

  

# WalletContext

  

The WalletContext provides methods for:

  

1. Connecting NEAR accounts to your applications via [near-wallet-selector](https://github.com/near/wallet-selector/)

  

2. Interacting with @mintbase-js/sdk

  
  

The following props are provided to consumers of the `WalletContext.Provider`:

  
  

{% code title="NearWalletConnector.ts" overflow="wrap" lineNumbers="true" %}

```typescript

export  type  WalletContext = {

// a reference to the near wallet selector

selector: WalletSelector;

  

// the modal window that can be opened and closed

modal: WalletSelectorModal;

  

// an array of connected accounts

accounts: AccountState[];

  

// the current active account e.g. cooluser5.near

activeAccountId: string | null;

  

// wether or not a wallet is connected, can be derived from presense of activeAccountId

isConnected: boolean;

  

// true when the wallet selector modal is opened via connect() method

isWaitingForConnection: boolean;

  

// null when no error present, contains error messages from wallet selector otherwise

errorMessage: string | null;

  

// used to open the modal and connect to a NEAR account

connect: () =>  Promise<void>;

  

// disconnect entirely from NEAR account

disconnect: () =>  Promise<void>;

  

// can be used to sign messages used to verify wallet ownership

signMessage: (params: VerifyOwnerParams) =>  Promise<VerifiedOwner>;

}

  

```

{% endcode %}

  

Example usage in React components:

  

{% code title="NearWalletConnector.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { useWallet } from  '@mintbase-js/react'

  

const  NearWalletConnector = () => {

const {

connect,

disconnect,

activeAccountId,

selector,

isConnected,

errorMessage,

} = useWallet();

  

const  signTxn = async () => {

const  wallet = await  selector.wallet();

// ... call mintbase SDK methods with wallet as signingOption arg

}

  

if (errorMessage) {

return (

<div>

<p>Major  bummer! Could  not  connect  to  NEAR {errorMessage}</p>

<button  onClick={connect}>Try  Again</button>

</div>

)

}

  

if (!isConnected) {

return <button  onClick={connect}>Connect  To  NEAR</button>

}

  

return (

<div>

<p>You  are  connected  as {activeAccountId}</p>

<button  onClick={signTxn}>Transaction</button>

<button  onClick={disconnect}>Disconnect</button>

</div>

)

}

```

{% endcode %}

