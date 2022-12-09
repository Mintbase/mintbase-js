[//]: # `{ "title": "transferContractOwnership", "order": 0.5 }`

# Transfer Contract Ownership

Transfers ownership of a given contractId to an intended ownerId, must be called by current owner

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## transferContractOwnership(args: TransferContractOwnershipArgs): NearContractCall

`transferContractOwnership` takes a single argument of type `TransferContractOwnershipArgs`

```typescript
export type TransferContractOwnershipArgs = {
    //id of the contract for which the ownership will be transfered
    contractId: string;
    //intended owner of the contract
    nextOwner: string;
    options?: {
        //keep the current minters, defaults to true if options aren't given
      keepMinters: boolean;
    };
  };
```

Example usage of ```transferContractOwnership``` method in a hypothetical React component:
{% code title="transferContractOwnershipUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, transferContractOwnership } from '@mintbase-js/sdk';


export const transferContractOwnershipUI = ({ nextOwner, contractId }: any) => {
  const { selector } = useWallet();
  const handletransferContractOwnership = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
        transferContractOwnership({
          contractId: contractId;
          nextOwner: nextOwner;
        }),
        {wallet})
  };
  return (
    <div>
      <button onClick={() => handletransferContractOwnership()}>
        transferContractOwnership for {contractId} to {nextOwner}
      </button>
    </div>
  );
};
```
{% endcode %}