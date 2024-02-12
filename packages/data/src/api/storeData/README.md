[//]: # `{ "title": "storeData", "order": "2.0.12" }`
# storeData



{% hint style="warning" %}



This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).



{% endhint %}




Returns contract data  by `contractAddress`.



### storeData( contractAddress: string | string[], network: "testnet" | "mainnet")



This is an example of a data api method.




Example:



{% code title="queryStoreData.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { storeData } from  '@mintbase-js/data'



const { data, error } = await storeData('teammintbase.mintbase1.near', 'mainnet');

if (error) {console.log('error', error)}


console.log(data) // => store data

```

{% endcode %}