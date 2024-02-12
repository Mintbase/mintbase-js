[//]: # `{ "title": "ownedTokens", "order": "2.0.2" }`
# ownedTokens

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}


Returns tokens owned by `ownerId` with limit and offset pagination.

### ownedTokens(ownerId: string, { limit, offset }: Pagination, network?: "testnet" | "mainnet")

This is an example of a data api method.


Example:

{% code title="queryTokens.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { ownedTokens } from '@mintbase-js/data'


const props = {
  ownerId: 'mb_alice.near';
  pagination: { limit: 20 };
  network?:  'mainnet';
}

const {data,error} = await ownedTokens(props);

if(error) {console.log('error', error)}

console.log(ownedTokens.length) // => 2

```
{% endcode %}