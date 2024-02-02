[//]: # `{ "title": "tokenProvenance", "order": "2.0.7" }`
# tokenProvenance

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}


Returns token provenance by `tokenId` in a particular `contractAddress` with limit and offset pagination.

### tokenProvenance(tokenId: string | number, contractAddress: string, pagination?: Pagination)

This is an example of a data api method.


Example:

{% code title="queryTokens.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { tokenProvenance } from '@mintbase-js/data'

const {data,error} = await tokenProvenance('104', 'teammintbase.mintbase1.near');

if(error) {console.log('error', error)}

console.log(data.nft_activities) // => token provenance data
console.log(data.nft_activities_aggregate.aggregate.count) // => token provenance counter

```
{% endcode %}