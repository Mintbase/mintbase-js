[//]: # `{ "title": "contractAttributes", "order": "1.0.15" }`
# contractAttributes



{% hint style="warning" %}



This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).



{% endhint %}




Returns contract attributes  by `contractAddress`.



### contractAttributes( contractAddress: string)



This is an example of a data api method.




Example:



{% code title="queryContractAttributes.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { contractAttributes } from  '@mintbase-js/data'



const { data, error } = await contractAttributes('teammintbase.mintbase1.near');

if (error) {console.log('error', error)}


console.log(data) // => contract attributes data

```

{% endcode %}