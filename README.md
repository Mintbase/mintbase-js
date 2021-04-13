[![CI Pipeline](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg)](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml)

# Mintbase API

### WIP: Not for use!

General purpose Mintbase API for interacting with NEAR, Ethereum, Arweave and other supported blockchains and decentralized filestorage systems.

## Initializing and Connecting Mintbase Wallet

Mintbase Wallet has access to the API.

```js
import Mintbase from 'mintbase.js'

// Create a new instance of the Mintbase class
const mintbase = new Mintbase.Wallet({ networkName: 'testnet' })

// Connect and fetch details
async function connect() {
  mintbase.connect()

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

## Development

- Install with `npm install`
- Start example with `npm run start:example`

## API

- Fetching
  - Fetch marketplace
  - Fetch store(s)
  - Fetch user(s)
  - Fetch asset(s)
  - Fetch order(s)
- Wallet management
  - Login
  - Logout
  - Add accounts
  - Remove accounts
  - Switch accounts
- Mint
  - Mint token
  - Royalties
- Making offers
  - Bidding multiple assets
- Making listing / sell items
  - Split revenues
- Buying items
- Accepting offers
- Transfer items
- Advanced
  - Listening to events
  - Bulk transfer
  - Purchasing on others behalf
  - Using other fungible tokens (wNEAR, ...) instead of NEAR
  - Private (?) auctions
  - Creating bundles
  - Schedule future listings

## Resources

- https://docs.near.org/docs/develop/front-end/near-api-js
- https://near.github.io/near-api-js/
