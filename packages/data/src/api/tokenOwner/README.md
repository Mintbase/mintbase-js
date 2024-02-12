[//]: # `{ "title": "tokenOwner", "order": "2.0.6" }`

# tokenOwner

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns token owner by `tokenId` and `contractAddress`.

### tokenOwner({tokenId: string, contractAddress: string, network: "mainnet" | "testnet"})

This is an example of a data api method.

Example:

{% code title="queryTokens.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { tokenOwner } from "@mintbase-js/data";

const props = {
  tokenId: "1",
  contractAddress: "mintbase.mintbase1.near",
  network: "mainnet"
}

const { data, error } = await tokenOwner(props);

if (error) {
  console.log("error", error);
}

console.log(data); // => "nate.near"
```

{% endcode %}
