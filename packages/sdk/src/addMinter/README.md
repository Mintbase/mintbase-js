[//]: # `{ "title": "addMinter", "order": 0.5 }`

# Add Minter

Add minter to a smart contract you own

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## addMinter(args: addMinterArgs): NearContractCall

`addMinter` takes a single argument of type `AddMinterArgs`

```typescript
type AddMinterArgs = {
    //the contract you own for which you wish to grant minting access
    nftContractId: string;
    //the id of the account that will be allowed to mint on the corresponding nftContractId
    minterId: string;
};
```

Example usage of addMinter method in a hypothetical React component:
{% code title="AddMinterUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, addMinter } from '@mintbase-js/sdk';


export const AddMinterUI = ({ contractId, minterId }:any) => {
  const { selector } = useWallet();
  const handleAddMinter = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
      addMinter({ nftContractId: contractId, minterId: minterId })
    );
  return (
    <div>
      <button onClick={() => handleAddMinter()}>
        addMinter to contract you own
      </button>
    </div>
  );
};
```
{% endcode %}