[//]: # `{ "title": "userOwnedTokens", "order": "2.0.21" }`
# userOwnedTokens

{% hint style="warning" %}
This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).
{% endhint %}

Returns all owners of NFTs on `storeId`.

### nftOwnersByStore({storeId: string, network?: "mainnet" | "testnet"}): Promise<ParsedDataReturn<stringp[]>>

This is an example of a data api method.

Example:

{% code title="nftOwnersByStore.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { nftOwnersByStore } from  '@mintbase-js/data'

const { data, error } = await nftOwnersByStore("mystore.mintbase1.near");

if (error) {console.log('error', error)}

console.log(data) // => ...
```
{% endcode %}
