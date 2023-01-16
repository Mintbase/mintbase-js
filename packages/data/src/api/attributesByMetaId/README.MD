[//]: # `{ "title": "attributes", "order": "2.0.0" }`
# attributesByMetaId


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}




Returns attributes of a token by `metadataId`.



### attributesBymetaId(metadataId: string)



Example:



{% code title="queryNftsByStore.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { attributesByMetaId } from '@mintbase-js/data'

const {data, error} = await attributesByMetaId('test');

if(error) {console.log('error', error)}

console.log(data, 'data')

```

{% endcode %}