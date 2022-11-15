[//]: # `{ "title": "@mintbase-js/auth", "order": 10 }`
# @mintbase-js/auth

This module abstracts authentication functions away from the Mintbase core SDK.

As more complex use cases grow with credentials verification, signing, zero knowledge etc., having a stand alone library and documentation around these features seemed appropriate.

# wallet.ts

A stateful module that wraps the core features found in [near/wallet-selector](https://github.com/near/wallet-selector/).

This module can be used as a framework agnostic wrapper using framework specific integrations:

  * [React: WalletContext]($DOCS_BASE_URL/mintbase-sdk-ref//react#walletcontext)

*Check back soon for documentation on specific methods and well as some examples of using this with other frameworks in the near future.*

# account.ts

Convenience methods for connection to near accounts for NodeJS layer.

## connect(accountId: string, keyStore: Keystore, network: NearNetwork = 'testnet'): Promise<Account>

Connects to a near account of `accountId` with credentials in keystore.

Example usage:
{% code title="Get owned tokens" overflow="wrap" lineNumbers="true" %}
```typescript
import { connect } from '@mintbase-js/auth';
import { KeyPair, InMemoryKeyStore, KeyStore  } from '@mintbase-js/sdk';

const loadAuthenticatedNearAccountInNodeJS = async () => {
  const privateKey: string = await <your-super-secure-key-method>();
  const keyStore: KeyStore = new InMemoryKeyStore();

  keyStore.setKey(
    NEAR_ENV,
    account,
    KeyPair.fromString(privateKey),
  );

  return await connect('mynearaccount.testnet', keyStore);
}
```
{% endcode %}

Here is a [working example]($GIT_BASE_URL/packages/testing/src/utils.ts#L7) from our [testing library]($DOCS_BASE_URL/mintbase-sdk-ref//testing) of this using GCP Secret Manager.




