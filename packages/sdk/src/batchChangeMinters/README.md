[//]: # `{ "title": "batchChangeMinters", "order": 0.8 }`

# Batch change minters

Change minting permissions for your smart contract by removing or adding multiple accountIds in one call.

Account IDs in the `removeMinters` array will lose minting permission for the specified contract. Ids in the `addMinters` array get granted that permission.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## batchChangeMinters(args: addMinterArgs): NearContractCall

`batchChangeMinters` takes a single argument of type `BatchChangeMintersArgs`

```typescript
type BatchChangeMintersArgs = {
    //the contract you own for which you wish to grant or revoke minting access
    //as an argument or through NFT_CONTRACT_ID env
    nftContractId?: string;
    //an array of ids that will be added as minters for the given contractId, if nothing is provided no minters will be added
    addMinters: string[];
    //an array of ids that will be removed as minters for the given contractId, if nothing is provided no minters will be added
    removeMinters: string[];
};
```
## React example

Example usage of batchChangeMinters method in a hypothetical React component:
{% code title="BatchChangeMintersComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, batchChangeMinters, BatchChangeMintersArgs } from '@mintbase-js/sdk';


export const BatchChangeMintersComponent = ({ contractId, addMinters, removeMinters }: BatchChangeMintersArgs): JSX.Element => {
  
  const { selector } = useWallet();
  
  const handleBatchChangeMinters = async (): Promise<void> => {

    const wallet = await selector.wallet();
    
    await execute(
      {wallet},
      batchChangeMinters({ 
          nftContractId: contractId,
          addMinters: addMinters, 
          removeMinters: removeMinters 
          })
    );
  }

  return (
    <div>
      <button onClick={handleBatchChangeMinters}>
        batchChangeMinters for contractId : {contractId}
      </button>
    </div>
  );
};
```
{% endcode %}