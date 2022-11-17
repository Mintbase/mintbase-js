![Licence](https://img.shields.io/badge/license-MIT-blue.svg) ![example workflow](https://github.com/Mintbase/mintbase-js/actions/workflows/ci.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Mintbase/mintbase-js/badge.svg?branch=add-wallet-selector)](https://coveralls.io/github/Mintbase/mintbase-js?branch=add-wallet-selector)

# Mintbase SDK (Alpha)

A series of scoped `@mintbase-js` modules for interacting with Mintbase, NEAR, Arweave (Bundlr network) and other decentralized web services and applications.

{% hint style="danger" %}
## The SDKs are currently in Alpha.
Breaking changes can and will be introduced on a regular basis until this reaches beta by Q1 2023.

{% endhint %}


## Join us in building the future

Feedback on Mintbase SDKs? Need a hand?

**Reach out on our [Telegram](https://t.me/mintdev) public developer support channel.**

Building something cool?

Consider [applying for a grant](https://github.com/Mintbase/Grants-Program).

# SDK Road Map

Each package in the SDK has their own development trajectories. There are more modules planned for the future, but this is the current core and existing/planned features:

### [@mintbase-js/sdk](packages/sdk)
 - Core NEAR smart contract method call util (single and multiple transactions)
 - **[IN PROGRESS]** Mintbase token and market contract method call wrappers (mint, transfer, list etc.)

### [@mintbase-js/data](packages/data)
  - **[IN PROGRESS]** Convenience wrapper methods for common use-case GraphQL calls

### [@mintbase-js/auth](packages/auth/)

 - Browser based wallet wrapper: [near/wallet-selector](https://github.com/near/wallet-selector/)
 - [near-api-js](https://github.com/near/near-api-js) convenience wrappers for loading accounts and managing keys
 - **[IN PROGRESS]** Message singing and verification utils.

### [@mintbase-js/react](packages/react)
  - WalletContext provider for auth connecting accounts to react applications
  - **[IN PROGRESS]** Helpers for data fetching via hooks.

### [@mintbase-js/testing](packages/testing)
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
npm i
npm run bootstrap
```

Watch the typescript modules via `npm run dev` from root, which lerna runs `npm run watch` in each.


This will watch for changes, compile typescript to `/lib` in each package as well as run Jest tests with coverage metrics for any changed code.

The NextJS browser test suite located in `packages/app` can be run with `npm run dev`.

# Adding New Packages

Lerna struggles with versions that have not already been published, especially if they will become dependencies of other packages in this repo.

When adding a new package, the fastest way is to:

1. copy the data package and change appropriate values in `package.json`.

2. Add the **package itself to the root project devDependencies** for example:
```
"@mintbase-js/<new-package>": "file:packages/<new-package>",
```

3. Publish out the current locked version as all the other packages from the local command line using `npm publish`.