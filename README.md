[![Licence](https://img.shields.io/badge/license-MIT-blue.svg)][5] ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg)
[![Downloads](https://img.shields.io/npm/dt/mintbase.svg)](https://www.npmjs.com/package/mintbase)

## Mintbase API
General purpose Mintbase API for interacting with NEAR, Arweave and other supported blockchains and decentralized filestorage systems.

# Deprecating Soon
This version of mintbase JS will be deprecated later this year (2023). Please see the [new documentation](https://docs.mintbase.io/dev/mintbase-sdk-ref) for details. Assistance with migration paths will be made available well before this date. Please join us on [Telegram](https://t.me/mintdev) to keep up with update and get support.

[See the types documentation][1]

## Table of Contents

- [Mintbase API](#mintbase-api)
- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
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

## Documentation

To see all available methods, their parameters and return values, check out the [Wallet module type documentation][8] 

This is a good place to continue exploring after trying out the examples or if you're looking for a specific functionality.

You can also take a look at the [API module type documentation][9] for methods pertaining to the retrieval of mintbase data.






## Examples

Bootstrap your app with [Create Mintbase App (React + Typescript)][6]

## Support

Open an [issue][2] 

or ask in our [developer telegram][3]!

## License

[MIT][5]

[1]: https://mintbase.github.io/mintbase-js/index.html
[2]: https://github.com/Mintbase/mintbase-js/issues/new
[3]: https://t.me/mintdev
[4]: https://mintbase.github.io/mintbase-js/index.html
[5]: https://github.com/Mintbase/mintbase-js/blob/main/LICENSE
[6]: https://github.com/Mintbase/create-mintbase-app
[7]: https://near.mintbase.io
[8]: https://mintbase.github.io/mintbase-js/classes/wallet.Wallet.html
[9]: https://mintbase.github.io/mintbase-js/classes/api.API.html
