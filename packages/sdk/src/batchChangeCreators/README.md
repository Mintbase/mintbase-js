[//]: # `{ "title": "batchChangeCreators", "order": 0.18 }`

# Batch change creators

Change creator permissions for your smart contract by removing or adding multiple accountIds in one call.

Account IDs in the `removeCreators` array will lose creator permission for the specified contract. Ids in the `addCreators` array get granted that permission.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

This is only available on Mintbase v2 smart contracts, if you are using a Mintbase v1 contract, use [`batchChangeMinters`](../batchChangeMinters/README.md) instead.

## batchChangeCreators(args: BatchChangeCreatorsArgs): NearContractCall

`batchChangeCreators` takes a single argument of type `BatchChangeCreatorsArgs`

```typescript
type BatchChangeCreatorsArgs = {
    //the contract you own for which you wish to grant or revoke creator access
    // as an argument or through CONTRACT_ADDRESS env
    contractAddress?: string;
    //an array of ids that will be added as creators for the given contractId, if nothing is provided no creators will be added
    addCreators: string[];
    //an array of ids that will be removed as creators for the given contractId, if nothing is provided no creators will be removed
    removeCreators: string[];
};
```
## React example

Example usage of batchChangeMinters method in a hypothetical React component:
{% code title="BatchChangeMintersComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, batchChangeCreators, BatchChangeCreatorsArgs } from '@mintbase-js/sdk';


export const BatchChangeMintersComponent = ({ contractAddress, addCreators, removeCreators }: BatchChangeCreatorsArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleBatchChangeMinters = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      {wallet},
      batchChangeCreators({
          contractAddress: contractAddress,
          addCreators: addCreators,
          removeCreators: removeCreators
          })
    );
  }

  return (
    <div>
      <button onClick={handleBatchChangeCreators}>
        batchChangeCreatorcs for contractId : {contractAddress}
      </button>
    </div>
  );
};
```
{% endcode %}
