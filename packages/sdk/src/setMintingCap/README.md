[//]: # `{ "title": "depositStorage", "order": 0.19 }`

# Set a minting cap

Sets a minting cap on this smart contract. This will restrict minting on the smart contract to the specified number of tokens. This is a commitment not to create more tokens in the future, introducing rarity. Once a minting cap has been set, it cannot be changed, and it cannot be removed.

The `contractAddress` can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

This is only available on Mintbase v2 smart contracts.

## setMintingCap(args: SetMintingCapArgs): NearContractCall

`setMintingCap` takes a single argument of type `SetMintingCapArgs`

```typescript
export type SetMintingCapArgs = {
  //accountId of the smart contract for which the minting cap is to be changed
  contractAddress?: string;
  //the cap that will be put in pluce
  mintingCap: number;
}
```

## React example

Example usage of deployContract method in a hypothetical React component:
{% code title="DepositStorageComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, setMintingCap, SetMintingCapArgs } from '@mintbase-js/sdk';


export const SetMintingCapComponent = ({ contractAddress, mintingCap }:SetMintingCapArgs):JSX.Element => {
  const { selector } = useWallet();

  const handleSetMintingCap = async (): Promise<void> => {
    const wallet = await selector.wallet();

    await execute(
      {wallet},
      setMintingCap({ contractAddress, mintingCap })
    );
  }

  return (
    <div>
      <button onClick={handleSetMintingCap}>
        Set minting cap for {contractAddress} to {mintinCap}
      </button>
    </div>
  );
};
```
{% endcode %}
