[//]: # `{ "title": "(NEW!) Indexer API", "order": "1.0" }`
# Using Data APIs

# methods

| method name | params | description |
|--|--|--|
| [attributesByMetaId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/attributesByMetaId/README.md) | `metadataId: string`  |get all attributes from a specific metadataId|

| [ownedNftsByStore](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedNftsByStore/README.md) | `ownerId: string,contractAddress: string,  pagination: {limit: number, offset:number}`  |get all nfts from a single store|
| [ownedTokens](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedTokens/README.md) | `ownerId: string,{limit: number, offset:number}` |get all tokens/nfts from a owner|
| [tokenById](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenById/README.md) | `tokenId: string, contractAddress: string` |get token data by id of certain contract|
| [tokenListingCountsByMetaId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenListingCountsByMetaId/README.md) | `metadataId: string` | get token listings from metadata id |
| [tokensByStatus](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokensByStatus/README.md) | `metadataId: string, ownedBy: string` |get token by status on metadataId, and owner|

