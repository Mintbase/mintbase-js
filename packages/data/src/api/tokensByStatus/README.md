
# tokenByStatus

  

{% hint style="warning" %}

  

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

  

{% endhint %}

  
  

Returns number of tokens by `metadataId` and statuses: `burned, unburned, listed`.

  

### tokenById(metadataId: string, ownedBy?: string)

  

This is an example of a data api method.

  
  

Example:

  

{% code title="queryNftsByStore.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { tokensByStatus, TokenByStatusQueryResults } from  '@mintbase/data'

  

const data: TokenListingQueryResults = tokensByStatus('dogeflower.mintbase1.near%3A5ef2d9b0651172d90dc173af0726b5fc', 'maxknivets.near');

  

console.log(data.listedTokens) // => 1

  

```

{% endcode %}