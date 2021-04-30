[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)][5] [![npm version](https://img.shields.io/npm/v/mintbase.svg?style=flat)](https://www.npmjs.com/package/mitnbase) ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg)

# ⚠️⚠️⚠️⚠️ WIP: Not for use! ⚠️⚠️⚠️⚠️

## Mintbase API
General purpose Mintbase API for interacting with NEAR, Arweave and other supported blockchains and decentralized filestorage systems.





[See the types documentation][1]  


## Table of Contents

  - [Mintbase API](#mintbase-api)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Getting Started](#getting-started)
  - [Support](#support)
  - [License](#license)

## Install

```console
$ npm install mintbase
```

## Getting started
Initializing and Connecting Mintbase Wallet
* Alternative try our [Create Mintbase App][6]

```typescript
import { Wallet, Chain, Network } from 'mintbase';

// Create a new instance of the Mintbase class
const wallet = new Wallet({ chain: Chain.near, networkName: Network.testnet })


wallet: new Wallet({
  networkName: Wallet.testnet,
  chain: Wallet.near,
  apiKey: YOUR_MINTBASEJS_API_KEY,
}),

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

## Support

Open an [issue][3]!

or ask in our [developer telegram][2]

## License

[MIT][5]

[1]: https://mintbase.github.io/mintbase-js/index.html
[2]: https://mintbase.github.io/mintbase-js/issues/new
[3]: https://mintbase.github.io/mintbase-js/issues/new
[4]: https://mintbase.github.io/mintbase-js/index.html
[5]: https://github.com/Mintbase/mintbase-js/blob/main/LICENSE
[6]: https://github.com/Mintbase/create-mintbase-app