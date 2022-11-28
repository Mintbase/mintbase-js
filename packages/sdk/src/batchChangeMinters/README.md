[//]: # `{ "title": "batchChangeMinters", "order": 0.7 }`

# Batch change minters

Batch change minters for a smart contract you own by providing an array of the ids of the minters you would like to add and/or remove

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## batchChangeMinters(args: addMinterArgs): NearContractCall

`batchChangeMinters` takes a single argument of type `BatchChangeMintersArgs`

```typescript
type BatchChangeMintersArgs = {
    //the contract you own for which you wish to grant or revoke minting access
    nftContractId: string;
    //an array of ids that will be added as minters for the given contractId, if nothing is provided no minters will be added
    addMinters: string;
    //an array of ids that will be removed as minters for the given contractId, if nothing is provided no minters will be added
    removeMinters: string[];
};
```

Example usage of batchChangeMinters method in a hypothetical React component:
{% code title="BatchChangeMintersUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, batchChangeMinters } from '@mintbase-js/sdk';


export const BatchChangeMintersUI = ({ contractId, addMinters, removeMinters }: any) => {
  const { selector } = useWallet();
  const handleBatchChangeMinters = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
      batchChangeMinters({ 
          nftContractId: contractId,
          addMinters: addMinters, 
          removeMinters: removeMinters 
          })
    );
  return (
    <div>
      <button onClick={() => handleBatchChangeMinters()}>
        batchChangeMinters for contractId : {contractId}
      </button>
    </div>
  );
};
```
{% endcode %}