[//]: # `{ "title": "burn", "order": 0.2 }`

# Burn Tokens

Tries to buy one or more tokens for a given smart contract id.

You must own a token to be able to burn it.

The nftContactId can be supplied as an argument or through the `NFT_CONTRACT_ID` environment variable.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## burn(args: BurnArgs): NearContractCall

`burn` takes a single argument of type `BurnArgs`

```typescript
type BurnArgs = {
  burn: {
    //the contract from which to burn tokens
    //as an argument or through NFT_CONTRACT_ID env
    nftContractId?: string;
    //the array of token ids to burn
    tokenIds: string[];
  }[];
};
```

Example usage of burn method in a hypothetical React component:
{% code title="BurnUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, burn } from '@mintbase-js/sdk';


export const BurnUI = ({ tokenIds, contractId }:any) => {
  const { selector } = useWallet();
  const handleBurn = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
      burn({ nftContractId: contractId, tokenIds: tokenIds })
    );
  return (
    <div>
      <button onClick={() => handleBurn()}>
        Burn provided token array from {contractId}
      </button>
    </div>
  );
};
```
{% endcode %}