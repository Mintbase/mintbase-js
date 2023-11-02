[//]: # `{ "title": "metadataByMetadataId", "order": "2.0.14" }`

# metadataByMetadataId

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns metadata by `metadataId`.

### metadataByMetadataId(metadataId: string)

This is an example of a data api method.

Example:

{% code title="metadataByMetadataId.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { metadataByMetadataId } from "@mintbase-js/data";

const { data, error } = await metadataByMetadataId("teammintbase.mintbase1.near:0fd038b1fc7d86de6f8c816d5669accc");

if (error) {
  console.log("error", error);
}

console.log(data) // => metadata

```

{% endcode %}
