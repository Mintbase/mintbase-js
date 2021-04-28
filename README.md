[![CI Pipeline](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg)](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml)

# ⚠️⚠️⚠️⚠️ WIP: Not for use! ⚠️⚠️⚠️⚠️

## Mintbase API


General purpose Mintbase API for interacting with NEAR, Arweave and other supported blockchains and decentralized filestorage systems.

## Initializing and Connecting Mintbase Wallet

```js
import { Wallet, Chain, Network } from 'mintbase';

// Create a new instance of the Mintbase class
const wallet = new Wallet({ chain: Chain.near, networkName: Network.testnet })

// Connect and fetch details
async function connect() {
  await wallet.connect();

  const details = await wallet.details()
  /*
    accountId: "qwerty.testnet"
    allowance: "0.25"
    balance: "365.77"
    contractName: "mintbase13.testnet"
  */
}

connect()
```

If you want to bootstrap your app (React + Typescript) use: https://github.com/Mintbase/create-mintbase-app
