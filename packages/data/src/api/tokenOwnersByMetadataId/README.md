[//]: # `{ "title": "tokenOwnersByMetadataId", "order": "1.0.8" }`

# tokenOwnersByMetadataId

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns token owners by `metadataId` with limit and offset pagination..

### tokenOwnersByMetadataId(metadataId: string, pagination?: Pagination)

This is an example of a data api method.

Example:

{% code title="queryTokens.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { tokenOwnersByMetadataId } from "@mintbase-js/data";

const { data, error } = await tokenOwnersByMetadataId("teammintbase.mintbase1.near:0fd038b1fc7d86de6f8c816d5669accc");

if (error) {
  console.log("error", error);
}

console.log(data.mb_views_nft_tokens) // => token data with token_id and owner
console.log(data.mb_views_nft_tokens_aggregate.aggregate.count) // => token counter

```

{% endcode %}
