[//]: # `{ "title": "attributesByContract", "order": "1.0.15" }`

# attributesByContract

Returns a list of token items (metadata) which match the contract id and passed filters.

### attributesByContract(contractId: string): Promise<Attributes>

Example:

{% code title="getAttributes.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { attributesByContract } from "@mintbase-js/data";

const { data, error } = await attributesByContract(
  'some-nfts.contract.near'
);

if (error) {
  console.log("error", error);
}

console.log(data);
/* => "{
  eyes: [
    { name: 'green', count: 30 } // 30 tokens with green eyes
    { name: 'blue', count: 3 } // 3 tokens with green eyes
  ],
  face: [
    { name: 'funny', count: 5 } // 5 funny faces
  ]
}"

*/
```

{% endcode %}
