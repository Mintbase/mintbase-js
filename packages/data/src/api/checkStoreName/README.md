[//]: # `{ "title": "checkStoreName", "order": "2.0.14" }`
# checkStoreName

Checks if that store `name` already exists.


{% hint style="warning" %}



This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).



{% endhint %}



### checkStoreName( name: string, network?: "testnet" | "mainnet" )



This is an example of a data api method.


Example:



{% code title="queryStoreData.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { checkStoreName } from  '@mintbase-js/data'



const { data, error } = await checkStoreName('my cool store', 'mainnet');

if (error) {console.log('error', error)}


console.log(data?.nft_contracts.length === 0) // => true / false

```

{% endcode %}