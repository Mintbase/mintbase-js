[//]: # `{ "title": "ownedNftsByStore", "order": "1.0.1" }`
# ownedNftsByStore


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}




Returns tokens owned by `ownerId`  in a particular `contractAddress`  with pagination `pagination: {limit:12, offset:0}`  params.



### ownedNftsByStore(ownerId: string, contractAddress:string, pagination: { limit:number, offset: number })



This is an example of a data api method.




Example:



{% code title="queryNftsByStore.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { ownedNftsByStore } from  '@mintbase/data'

const {data, error} = await ownedTokens('rub3n.testnet', 'audiobr.mintspace2.testnet' { limit:  20 , offset: -});

if (error) {console.log('error', error)}

console.log(ownedNfts.token[0]) // => 1st token of the list.

```

{% endcode %}