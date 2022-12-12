
[//]: # `{ "title": "@mintbase-js/react", "order": 4 }`

# @mintbase-js/react


This package contains React helpers for interacting with Mintbase SDKs.

# Hooks


|hook name| description  | params
|--|--|--|
|useMinter  | hook with function to mint | |
|useOwnedNftsByStore  | hook to fetch owned nfts by store (contractAddress)  | `ownerId: string,contractAddress: string,pagination: { limit: number; offset?: number}` |
|useTokenById  | hook to fetch token by Id  | `tokenId: string,contractAddress: string` |


# WalletContext



The WalletContext provides methods for:



1. Connecting NEAR accounts to your applications via [near-wallet-selector](https://github.com/near/wallet-selector/)

2. Interacting with @mintbase-js/sdk




The following props are provided to consumers of the `WalletContext.Provider`:



```ts

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



Example usage:



```tsx



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

<p>Major bummer! Could not connect to NEAR {errorMessage}</p>

<button  onClick={connect}>Try Again</button>

</div>

)

}




if (!isConnected) {

return  <button  onClick={connect}>Connect To NEAR</button>

}



return (

<div>

<p>You are connected as {activeAccountId}</p>

<button  onClick={signTxn}>Transaction</button>

<button  onClick={disconnect}>Disconnect</button>

</div>

)

}



```