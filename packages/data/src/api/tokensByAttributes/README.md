[//]: # `{ "title": "tokensByAttributes", "order": "1.0.7" }`

# tokensByAttributes

Returns a list of token items (metadata) which match the contract id and passed filters.

### tokensByAttributes(contractId: string, filters: string): Promise<FilteredMetadataResult[]>

Example:

{% code title="filteredQuery.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { tokensByAttributes } from "@mintbase-js/data";

const query = {
  filters: {
    'eyes': ['blue', 'green'], // blue or green eyes
    'face': ['pretty'], // with a pretty face
  },
  limit: 10,
  offset: 0,
};
const { data, error } = await tokensByAttributes(
  'some-nfts.contract.near',
  filters
);

if (error) {
  console.log("error", error);
}

console.log(data); // => "[{ title: 'Woah betty', ...}]"
```

{% endcode %}
