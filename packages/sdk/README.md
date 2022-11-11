# @mintbase-js/sdk

This module provides a set of convenience wrappers around invocation of Mintbase smart contract methods, but also exposes a low- level isomorphic [execute](#execute) method that can be passed raw `NearContractCall` information.

Finish implementations and documentation for:

- [ ] Transfer Token
- [ ] Buy Token
- [ ] List Token
- [ ] Rest of the methods...


# execute(callOptions, signingOptions)

`execute` is the Core method used to invoke smart contract methods via browser [wallet](https://github.com/near/wallet-selector) or an authenticated NEAR Account via [functionCall](https://docs.near.org/tools/near-api-js/reference/classes/account.Account#functioncall) method.

