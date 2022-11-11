# @mintbase-js/SDK

This module contains methods used for executing methods on Mintbase smart contracts.

A set of convenience wrappers around various token and market contract methods, however [execute](#execute) method.

Finish implementation and documentation:

- [ ] Transfer Token
- [ ] Buy Token
- [ ] More...


# execute(callOptions, signingOptions)

`execute` is the Core method used to invoke smart contract methods via browser wallet or an authenticated NEAR Account via [functionCall](https://docs.near.org/tools/near-api-js/reference/classes/account.Account#functioncall) method.

