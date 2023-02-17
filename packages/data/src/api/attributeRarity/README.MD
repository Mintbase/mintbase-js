[//]: # `{ "title": "attributes", "order": "2.0.1" }`
# attributeRarity


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}




Returns rarity of an attribute by `contractId`, `attributeType` and `attributeValue`.



### attributeRarity(contractId: string, attributeType: string, attributeValue: string)



Example:



{% code title="attributeRarity.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { attributeRarity } from '@mintbase-js/data'

const {data, error} = await attributeRarity('test');

if(error) {console.log('error', error)}

console.log(data, 'data') // returns rarity of the given attribute

```

{% endcode %}