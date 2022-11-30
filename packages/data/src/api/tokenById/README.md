
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

import { tokenById, TokenByIdResults } from  '@mintbase/data'

  

const data: TokenByIdResults = tokenById( '1','rub3n.testnet');

  

console.log(data.tokenData[0]) // => token metadata

  

```

{% endcode %}