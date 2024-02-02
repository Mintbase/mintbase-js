[//]: # `{ "title": "keyActivity", "order": "2.0.18" }`

# keyActivity


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns number of tokens by `metadataId` and statuses: `burned, unburned, listed`.

### getKey(accountId: string)

Fetches all historical additions and deletions of full access keys to an account.

Example:

{% code title="queryNftsByStore.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { getKeyActivity } from  '@mintbase-js/data'

const { data, error } = await getKeyActivity('foo.near');

if (error) {console.log('error', error)}

console.log(data.listedTokens)

```

{% endcode %}
