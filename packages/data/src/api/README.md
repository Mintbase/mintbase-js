[//]: # `{ "title": "API Methods", "order": "1.0" }`
# Using Data APIs

Currently, these wrappers are methods for the [GraphQL API](https://docs.mintbase.xyz/dev/mintbase-graph). They are still in alpha and may change at anytime.

# methods

| method name | params | description |
|--|--|--|
| [attributesByMetaId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/attributesByMetaId/README.md) | `metadataId: string`  |get all attributes from a specific metadataId|
| [ownedNftsByStore](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedNftsByStore/README.md) | `ownerId: string,contractAddress: string,  pagination: {limit: number, offset:number}`  |get all nfts from a single store|
| [ownedTokens](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedTokens/README.md) | `ownerId: string,{limit: number, offset:number}` |get all tokens/nfts from a owner|
| [tokenById](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenById/README.md) | `tokenId: string, contractAddress: string` |get token data by id of certain contract|
| [tokenListingCountsByMetaId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenListingCountsByMetaId/README.md) | `metadataId: string` | get token listings from metadata id |
| [tokensByStatus](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokensByStatus/README.md) | `metadataId: string, ownedBy: string` |get token by status on metadataId, and owner|
| [tokenOwner](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenOwner/README.md) | `tokenId: string, contractAddress: string` |get token owner by token id and certain contract|
| [tokenProvenance](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenProvenance/README.md) | `tokenId: string, contractAddress: string, pagination?: {limit: number, offset:number}` |get token provenance by token id and certain contract|
| [tokenOwnersByMetadataId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenOwnersByMetadataId/README.md) | `metadataId: string, pagination?: {limit: number, offset:number}` |get token owners by metadata id|
| [ownedStores](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedStores/README.md) | `ownerId: string` |get stores owned by owner id|
| [nearPrice](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/nearPrice/README.md) | - |get near price in usd|
| [storeData](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/storeData/README.md) | `contractAddress: string | string[]` |get store data by certain contract or contracts|
| [storeNfts](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/storeNfts/README.md) | `contractAddress: string | string[], showOnlyListed?: boolean, pagination?: {limit: number, offset:number}` |get store nfts by certain contract|
| [metadataByMetadataId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/metadataByMetadataId/README.md) | `metadataId: string` |get metadata by metadataId|