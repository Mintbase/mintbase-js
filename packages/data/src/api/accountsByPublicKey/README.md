[//]: # `{ "title": "accountsByPublicKey", "order": "1.0.18" }`

# accountsByPublicKey

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns accounts for which `publicKey` is a full access key.

### accountsByPublicKey(publicKey: string): Promise<ParsedDataReturn<string[]>>

Example:



{% code title="accountsByPublicKey.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { accountsByPublicKey } from  '@mintbase-js/data'

const { data, error } = await accountsByPublicKey('ed25519:12345...');

if (error) {console.log('error', error)}

console.log(data) // => 'foo.testnet'

```

{% endcode %}
