[//]: # `{ "title": "ownedStores", "order": "2.0.9" }`
# ownedStores


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}




Returns stores owned by `ownerId`.



### ownedStores(ownerId: string, network?: "testnet" | "mainnet")



This is an example of a data api method.




Example:



{% code title="queryOwnedStores.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { ownedStores } from  '@mintbase-js/data'

const {data, error} = await ownedStores('test.near', 'mainnet');

if (error) {console.log('error', error)}

console.log(data) // => owned stores list

```

{% endcode %}