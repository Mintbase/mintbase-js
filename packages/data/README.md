[//]: # `{ "title": "@mintbase-js/data", "order": "1" }`

# @mintbase-js/data

<p align="center">
<img src='https://img.shields.io/npm/dw/@mintbase-js/data' />
<img src='https://img.shields.io/bundlephobia/min/@mintbase-js/data'>
</p>


Built-in methods to help fetch data from our indexer. These methods aim to make it as easy as possible to get blockchain data.

If the data you want to get is more specific also check out our [GraphQL schema](https://docs.mintbase.xyz/dev/mintbase-graph) instead.

# Source Configuration

You can set network and in some cases default contract configuration using the SDK's `mbjs.config` method. Read about config global variables on: [Config SDK method](https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk/config)

## Usage Options

The default export methods return a wrapped result object with error and data properties. For example `const { error, data } = myApiMethod()` will provide any network errors inside of error in the event of failure, and the expected result in data on success.

If you prefer to catch errors, you can import the method from `@mintbase-js/data/lib/unwrap` instead. e.g. `import { ownedTokens } from '@mintbase-js/data/lib/unwrap` which will re-throw in the event of an error.


# use our GraphQL Fetch Method
[check our GraphQl Fetch Method](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/graphql/fetch.ts)


ex: 
```typescript

import { QUERIES, fetchGraphQl } from '@mintbase-js/data'
import { mbjs } from '@mintbase-js/sdk'

const myFetchMethod = ({showOnlyListed, pagination, network}) => {
    const { data, error } = await fetchGraphQl<MyResultType>({
      query: QUERIES.storeNftsQuery,
      variables: {
        condition: {
          nft_contract_id: { _in: mbjs.keys.contractAddress },
          ...(showOnlyListed && { price: { _is_null: false } }),
        },
        limit: pagination?.limit ?? 12,
        offset: pagination?.offset ?? 0,
      },
      ...(network && { network:network }),
    });
  }
```

# Use our Queries on your own GraphQL Service Implementation
[check our Queries here](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/queries.ts)

# API Methods

| method name | params | description |
|--|--|--|
| [ownedNftsByStore](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/ownedNftsByStore/README.md) | `ownerId: string,contractAddress: string,  pagination: {limit: number, offset:number}`  |get all nfts from a single store|
| [ownedTokens](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/ownedTokens/README.md) | `ownerId: string,{limit: number, offset:number}` |get all tokens/nfts from a owner|
| [tokenById](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenById/README.md) | `tokenId: string, contractAddress: string` |get token data by id of certain contract|
| [tokenListingCountsByMetaId](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenListingCountsByMetaId/README.md) | `metadataId: string` | get token listings from metadata id |
| [tokensByStatus](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokensByStatus/README.md) | `metadataId: string, ownedBy: string` |get token by status on metadataId, and owner|
| [tokenOwner](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenOwner/README.md) | `tokenId: string, contractAddress: string` |get token owner by token id and certain contract|
| [tokenProvenance](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenProvenance/README.md) | `tokenId: string, contractAddress: string, pagination?: {limit: number, offset:number}` |get token provenance by token id and certain contract|
| [tokenOwnersByMetadataId](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenOwnersByMetadataId/README.md) | `metadataId: string, pagination?: {limit: number, offset:number}` |get token owners by metadata id|
| [ownedStores](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/ownedStores/README.md) | `ownerId: string` |get stores owned by owner id|
| [nearPrice](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/nearPrice/README.md) | - |get near price in usd|
| [checkStoreName](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/checkStoreName/README.md) | `name: string` |check if store name already exists|
| [storeData](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/storeData/README.md) | `contractAddress: string | string[]` |get store data by certain contract or contracts|
| [storeNfts](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/storeNfts/README.md) | `contractAddress: string | string[], showOnlyListed?: boolean, pagination?: {limit: number, offset:number}` |get store nfts by certain contract|
| [metadataByMetadataId](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/metadataByMetadataId/README.md) | `metadataId: string` |get metadata by metadataId|
| [tokenByAttributes](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/tokenByAttributes/README.md) | `contractId: string, filters: AttributesFilters` |get tokens of a certain contract and filters|
| [attributesByContract](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/attributesByContract/README.md) | `contractId: string` |get attributes of a certain contract|
| [attributeRarity](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/attributeRarity/README.md) | `contractId: string,   attributeType: string, attributeValue: string` |get attribute rarity of a certain contract, attribute type and attribute value| [userOwnedTokens](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data/src/api/userOwnedTokens/README.md)

While we will continue to provide public and our new mb_views schema objects, we will also begin to introduce helper methods here that can be used to query data **without having to write any graphql**.



For now, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph) and be sure to check back here soon for updates concerning our [data layer API](src/api/).