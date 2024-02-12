[//]: # `{ "title": "tokenById", "order": "2.0.3" }`
# tokenById



{% hint style="warning" %}



This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).



{% endhint %}




Returns token data  by `contractAddress`.



### tokenById( tokenId: string | number, contractAddress: string,)



This is an example of a data api method.




Example:



{% code title="queryNftsByStore.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { tokenById } from  '@mintbase-js/data'

const props =  {
  tokenId: '1',
  contractAddress: 'foo.testnet',
  network: 'testnet'
}

const { data, error } = await tokenById(props);

if (error) {console.log('error', error)}


console.log(data.tokenData[0]) // => token metadata

```

{% endcode %}