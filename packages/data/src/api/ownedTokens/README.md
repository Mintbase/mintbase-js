## ownedTokens(ownerId: string, { limit, offset }: Pagination)

Returns tokens owned by `ownerId` with limit and offset pagination.

Example:

```ts
import { ownedTokens, OwnedTokens } from '@mintbase/data'

const ownedTokens: OwnedTokens[] = ownedTokens('mb_alice.near', { limit: 20 });

console.log(ownedTokens.length) // => 2

```