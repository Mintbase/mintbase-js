![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Coverage Status](https://coveralls.io/repos/github/Mintbase/mintbase-js/badge.svg?branch=alpha)](https://coveralls.io/github/Mintbase/mintbase-js?branch=alpha)

# Mintbase JS

A library for making web3 end to end development as easy as possible from smart contract deployment and interaction to metadata storage and blockchain data access.

{% hint style="danger" %}
## All packages are currently in Alpha.
Breaking changes can and will be introduced on a regular basis until this reaches beta sometime during Q1 2023.

{% endhint %}


# Getting started
Visit any of the below links to access the documentation and usage examples for the different packages

## Deploy or interact with smart contracts and mintbase market

### [@mintbase-js/sdk docs](packages/sdk)

 - Core NEAR smart contract method call util (single and multiple transactions)
 - Mintbase token and market contract method call wrappers (mint, transfer, list etc.)


 ## Add and manage wallet connection on your react dapp out of the box

 ### [@mintbase-js/react docs](packages/react)
  - WalletContext provider for auth connecting accounts to react applications
  - Helpers for data fetching via hooks.


 ## Get blockchain data in a few lines of code

### [@mintbase-js/data docs](packages/data)
  - Convenience wrapper methods for common use-case GraphQL calls

  ## Upload metadata to permanent storage

### [@mintbase-js/storage docs](packages/auth/)

 - Browser based wallet wrapper: [near/wallet-selector](https://github.com/near/wallet-selector/)
 - [near-api-js](https://github.com/near/near-api-js) convenience wrappers for loading accounts and managing keys
 - Message singing and verification utils.

## Manage wallet connection manually
### [@mintbase-js/auth docs](packages/auth/)

 - Browser based wallet wrapper: [near/wallet-selector](https://github.com/near/wallet-selector/)
 - [near-api-js](https://github.com/near/near-api-js) convenience wrappers for loading accounts and managing keys
 - Message singing and verification utils.



# Join us in Building the Future

Have feedback or perhaps need a hand?

**Reach out on our [Telegram](https://t.me/mintdev) public developer support channel.**

Building something cool?

**Consider [applying for a grant](https://github.com/Mintbase/Grants-Program).**
