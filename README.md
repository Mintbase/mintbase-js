![Licence](https://img.shields.io/badge/license-MIT-blue.svg) ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Mintbase/mintbase-js/badge.svg?branch=add-wallet-selector)](https://coveralls.io/github/Mintbase/mintbase-js?branch=add-wallet-selector)

# Mintbase SDK (Beta)

A series of scoped `@mintbase-js` modules for interacting with Mintbase, NEAR, Arweave (Bundlr network) and other decentralized web services and applications.


## ⚠️ The SDKs are currently in Beta.

Breaking changes may be introduced at anytime.


## Join us in building the future

Feedback on Mintbase SDKs? Reach out on [Telegram](https://t.me/mintdev) public developer channel!

Building something cool? Consider [applying for a grant](https://github.com/Mintbase/Grants-Program).


# SDK Road Map

The SDK is currently in active development. The following modules/functionality are outlined here along with links to documentation supporting each:

### [@mintbase-js/sdk]($DOCS_PATH/packages/sdk)

 - Core NEAR smart contract method call util (single and multiple transactions)
 - Mintbase token and market contract method call wrappers (mint, transfer, list etc.)

### [@mintbase-js/auth]($DOCS_PATH/packages/auth)

 - Browser based wallet wrapper: [near/wallet-selector](https://github.com/near/wallet-selector/)
 - [near-api-js](https://github.com/near/near-api-js) convenience wrappers
 - **IN PROGRESS:** message singing and verification utils, nodejs account loading, key management etc.

### [@mintbase-js/react]($DOCS_PATH/packages/react)
  - **IN PROGRESS:** message singing and verification utils, nodejs account loading, key management etc.
  - WalletContext provider for @mintbase-js/auth to react appliactions

### [@mintbase-js/data]($DOCS_PATH/packages/data)
  - Convenience wrapper methods for common use-case GraphQL calls

### [@mintbase-js/testing]($DOCS_PATH/packages/testing)
  - Testing utilities and integration test suites for running mintbase-js against deployed contracts.


# Environment Variables

In order to use mintbase JS functions environment variables will need to be supplied via `process.env`, [dotenv](https://www.npmjs.com/package/dotenv) etc.

```
# default testnet
NEAR_ENV = mainnet | testnet

# default sandbox
NEAR_DATA_ENV = mainnet | testnet | sandbox
```


# Developing Locally

This repo is using lerna (now powered by nx) under the hood.

Symlink packages via

```
npm run bootstrap
```

Watch the typescript modules via `npm run dev`. This will watch for changes, compile typescript and run tests on changed code.

```
npm run dev
```

This will watch for changes, compile typescript to `/lib` in each package as well as run Jest tests with coverage.

The NextJS/React test suite can be run with `npm run dev` inside of packages/app.

# Adding New Packages

Lerna struggles with versions that have not already been published, especially if they will become dependencies of other packages in this repo.

When adding a new package, the fastest way is to:

1. copy the data package and change appropriate values in `package.json`.

2. Add the **package itself to the root project devDependencies** for example:
```
"@mintbase-js/<new-package>": "file:packages/<new-package>",
```

3. Publish out the current locked version as all the other packages from the local command line using `npm publish`.