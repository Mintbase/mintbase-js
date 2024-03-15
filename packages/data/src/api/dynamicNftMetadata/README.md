[//]: # `{ "title": "dynamicNftMetadata", "order": "2.0.20" }`
# storeNfts

{% hint style="warning" %}
This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).
{% endhint %}

Returns NFTss by `contractAddress` and `internMetadataId` (as used on the smart contract). The `isActive` toggle filters for active (currently used) or inactive (unused) metadata.

### dynamicNftMetadata( {contractAddress: string, internalMetadataId: number, isActive: boolean, network?: "testnet" | "mainnet"})

Example usage:

{% code title="queryDynamicNftMetadata.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { dynamicNftMetadata } from  '@mintbase-js/data'

const props = {
  contractAddress: 'dynamic.mintbase2.near',
  internalMetadataId: 0,
  isActive: true,
  network: "mainnet",
}

const { data, error } = await dynamicNftMetadata(props);

if (error) {console.log('error', error)}

console.log(data) // => shows the currently active metadata for this internal ID
```
{% endcode %}
