[//]: # `{ "title": "@mintbase-js/auth", "order": 10 }`
# Working with Web3 Accounts

This package abstracts login, auth and signing functionality away from `@mintbase-js/sdk` core.

As more complex use cases grow with more complex credential verification (ZK), message signing and whatever the future of web3 may hold, having standalone methods and documentation around these features seemed appropriate.

# Wallet <div name="wallet"></div>

A stateful module that wraps the core features found in [near/wallet-selector](https://github.com/near/wallet-selector/).

This module can be used as a framework agnostic wrapper using framework specific integrations:

  * [React: WalletContext](../react#walletcontext)

*Check back soon for documentation on wallet selector wrapper methods and example usage with other frameworks in the near future.*

# Account <div name="account"></div>

The primary method used for loading a NEAR account into your Node programs is via the `connect` method

```
connect(
  accountId: string,
  keyStore: Keystore,
  network: NearNetwork = 'testnet'
): Promise<Account>
```

This method uses `near-api-js` to load account `accountId` with credentials in the provided keystore.

{% hint style="info" %}

To use the near account signing method with the SDK contract api, you will need to implement a form of key management.
You will want to read up on using `KeyStore` in the [NEAR Documentation](https://docs.near.org/tools/near-api-js/quick-reference#key-store)

{% endhint %}


Example usage:
{% code title="loadAccount.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { connect } from '@mintbase-js/auth';
import { KeyPair, InMemoryKeyStore, KeyStore  } from '@mintbase-js/sdk';

const loadAuthenticatedNearAccountInNodeJS = async (accountId: string) => {
  // NOTE: You will have to implement the method that securely fetches your private key.
  // See above note
  const privateKey: string = await <your-super-secure-key-method>();
  const keyStore: KeyStore = new InMemoryKeyStore();

  keyStore.setKey(
    NEAR_ENV,
    account,
    KeyPair.fromString(privateKey),
  );

  return await connect(accountId, keyStore);
}
```
{% endcode %}

Here is a [working example](https://github.com/Mintbase/mintbase-js/blob/alpha/packages/testing/src/utils.ts#L7) from our [testing library](../testing) of this using GCP Secret Manager.




