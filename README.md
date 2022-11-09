![Licence](https://img.shields.io/badge/license-MIT-blue.svg) ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Mintbase/mintbase-js/badge.svg?branch=add-wallet-selector)](https://coveralls.io/github/Mintbase/mintbase-js?branch=add-wallet-selector)

# Mintbase SDK

A series of scoped modules `@mintbase-js` for interacting with Mintbase, NEAR, Arweave and other decentralized web applications.

## Roadmap

The SDK is currently in active development. The following modules/functionality are outlined here:

### @mintbase-js/sdk

 - Core NEAR smart contract method call util (single and multiple transactions)
 - Mintbase token and market contract method call wrappers (mint, transfer, list etc.)

### @mintbase-js/auth

 - Browser based wallet wrapper: [near/wallet-selector](https://github.com/near/wallet-selector/)
 - **TODO:** message singing and verification utils, nodejs account loading, key management etc.

### @mintbase-js/react
  - WalletContext provider for @mintbase-js/auth to react appliactions

### @mintbase-js/data
  - **TODO:** Indexer query convenience wrappers for common calls
  - **TODO:** RPC wrappers for view methods on mintbase/market contracts

<br>

# Environment Variables

```
# default testnet
NEAR_WALLET_ENV = mainnet | testnet

# default sandbox
NEAR_DATA_ENV = mainnet | testnet | sandbox
```


# Developing Locally

This repo is using lerna (now powered by nx) under the hood.

Symlink packages via

```
npm run bootsrap
```

Watch all the typescript modules as well as run the app (nextjs sdk test) server:

```
npm run dev
```

This will watch for changes, compile typescript to `/lib` in each package as well as run Jest tests with coverage.

The NextJS/React test suite can be run with `npm run dev` inside of packages/app.

# Adding New Packages

When adding new packages, Lerna tends to struggle with versions that have not already been published, especially if they will become dependencies of other packages in this repo.

When adding a new package, the easiest way is to copy the data package and change appropriate values in `package.json`.

Add the **package itself to the root project devDependencies** for example:
```
"@mintbase-js/<new-package>": "file:packages/<new-package>",
```

Finally, publish out the current locked version as all the other packages from the local command line using `npm publish`.