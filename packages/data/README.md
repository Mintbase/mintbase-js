[//]: # `{ "title": "@mintbase-js/data", "order": "1" }`

# @mintbase-js/data

Built-in methods to help fetch data from our indexer.
These methods aim to make it as easy as possible to get blockchain data.
If the data you want to get is more specific or isn't covered in any of these methods check out our GraphQl Indexer where you can get as specific as you need!

# methods

| method name | params | description |
|--|--|--|
| [ownedNftsByStore](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedNftsByStore/README.md) | `ownerId: string,contractAddress: string,  pagination: {limit: number, offset:number}`  |get all nfts from a single store|
| [ownedTokens](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/ownedTokens/README.md) | `ownerId: string,{limit: number, offset:number}` |get all tokens/nfts from a owner|
| [tokenById](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenById/README.md) | `tokenId: string, contractAddress: string` |get token data by id of certain contract|
| [tokenListingCountsByMetaId](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenListingCountsByMetaId/README.md) | `metadataId: string` | get token listings from metadata id |
| [tokensByStatus](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokensByStatus/README.md) | `metadataId: string, ownedBy: string` |get token by status on metadataId, and owner|
| [tokenOwner](https://github.com/Mintbase/mintbase-js/tree/alpha/packages/data/src/api/tokenOwner/README.md) | `tokenId: string, contractAddress: string` |get token owner by token id and certain contract|





While we will continue to provide public and our new mb_views schema objects, we will also begin to introduce helper methods here that can be used to query data **without having to write any graphql**.



For now, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph) and be sure to check back here soon for updates concerning our [data layer API](src/api/).