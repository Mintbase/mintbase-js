[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)][5] [![npm version](https://img.shields.io/npm/v/mintbase.svg?style=flat)](https://www.npmjs.com/package/mintbase) ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg)

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
- [Examples](#examples)
- [License](#license)

## Install

```console
$ npm install mintbase
```

## Getting started

Initializing and Connecting Mintbase Wallet

- Acquire an API key in the `Developer` tab on [Mintbase](https://mintbase.io/developer)

```typescript
connect()
```

```typescript
import { Wallet, Chain, Network } from 'mintbase'

// Connect and fetch details
async function connect() {
  const { data: walletData, error } = await new Wallet().init({
    networkName: Network.testnet,
    chain: Chain.near,
    apiKey: API_KEY,
  })

  const { wallet, isConnected } = walletData

  if (isConnected) {
    const { data: details } = await wallet.details()

    /*
      accountId: "qwerty.testnet"
      allowance: "0.25"
      balance: "365.77"
      contractName: "mintbase13.testnet"
    */
  }
}

connect()
```

Here's an example of a button to connect to the wallet.

```tsx
<Button onClick={() => wallet.connect({ requestSignIn: true })}>Login</Button>
```

## Examples

Bootstrap your app with [Create Mintbase App (React + Typescript)][6]

## Support

Open an [issue][3]!

or ask in our [developer telegram][2]

## License

[MIT][5]

[1]: https://mintbase.github.io/mintbase-js/index.html
[2]: https://github.com/Mintbase/mintbase-js/issues/new
[3]: https://t.me/mintdev
[4]: https://mintbase.github.io/mintbase-js/index.html
[5]: https://github.com/Mintbase/mintbase-js/blob/main/LICENSE
[6]: https://github.com/Mintbase/create-mintbase-app
[7]: https://near.mintbase.io
