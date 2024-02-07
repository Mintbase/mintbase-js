[//]: # `{ "title": "setSplits", "order": 0.14 }`

# Set Splits

Sets splits for multiple tokens.

The tokens are specified via `tokenIds` as well as the `nftContractId` from where the token was minted. This panics if you specify no token IDs or try to set splits for tokens that you do not own.

The `nftContactId` can be supplied as an argument or through the ``CONTRACT_ADDRESS`` environment variable. If this is a smart contract ending in `mintbase1.near` (mainnet) or `mintspace2.testnet` (testnet), this can only be done once and will fail in subsequent calls.

The splits are given via the `splitOwners` objects, whose keys are account IDs and the corresponding value is the assigned the fraction of available payout after royalty application. For example, if a token has 20 % royalties and you pass `{'a.near': 0.8, 'b.near': 0.2}`, 64 % of the next sale will be paid to `a.near`, and 16 % will be paid to `b.near`, while the remaining 20 % are reserved for the royalty holders that can only be specified during minting. This panics if the percentages do not add up to 100 %.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## setSplits(args: SetSplitsArgs): NearContractCall

`setSplits` takes a single argument of type `SetSplitsArgs`

```typescript
export type SetSplitsArgs = {
    // contract to which the tokens belong,
    // as an argument or through CONTRACT_ADDRESS env
    contractAddress: string;
    // tokenIds with splits to change
    tokenIds: string[];
    // new split owners, specified as an object mapping from account ID to a
    // fraction of the available payout
    splitOwners: Record<string, number>
}
```

## React example

Example usage of setSplits method in a hypothetical React component:
{% code title="SetSplitsComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, setSplits, SetSplitArgs } from '@mintbase-js/sdk';


export const SetSplitsComponent = ({ contractAddress, tokenIds, splitOwners }: SetSplitsArgs):JSX.Element => {

  const { selector } = useWallet();

  const handleSetSplits = async (): Promise<void> => {
    const wallet = await selector.wallet();

    await execute(
        {wallet},
        setSplits({
         contractAddress: nftContractId,
         tokenIds: tokenIds,
         splitOwners: splitOwners,
        })
      )
    };

  const tokenIdsText = tokenIds.join(', ');
  const splitOwnersText = Object.entries(splitOwners)
    .map(([account, fraction]) => `${fraction} for ${account}`)
    .join(' and ');

  return (
    <div>
      <button onClick={handleSetSplits}>
        Set splits on NFT contract {nftContractId} for tokens {tokenIds} to {splitOwnersText}
      </button>
    </div>
  );
};
```
{% endcode %}
