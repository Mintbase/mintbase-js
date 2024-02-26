[//]: # `{ "title": "lockMetadata", "order": 0.21 }`

# Lock Metadata (v2)

Lock [previously created metadata](../createMetadata/README.md). This is only possible if the metadata has been marked as dynamic while creating it, and will prevent any further updates. This operation is irrevertible. Only the creator of the metadata is allowed to lock it.

The `nftContactId` can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

This only works on v2 smart contracts and no equivalent feature exists for v1.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## lockMetadata(args: UpdateMetadataArgs): NearContractCall

`lockMetadata` takes a single argument of type `LockMetadataArgs`

```typescript
export type UpdateMetadataArgs =  {
  //the contractId from which you want to mint, this can be statically defined via the mbjs config file
  contractAddress?: string;
  //the ID of the metadata you wish to lock
  metadataId: string;
};
```

## React example

Example usage of mint method in a hypothetical React component:
{% code title="UpdateComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, lockMetadata, LockMetadataArgs } from '@mintbase-js/sdk';


export const LockMetadataComponent = ({ contractAddress, metadataId }: LockMetadataArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleLockMetadata = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      lockMetadata({ contractAddress, metadataId })
    );

  }

  return (
    <div>
      <button onClick={handleLockMetadata}>
        Lock metadata
      </button>
    </div>
  );
};
```
{% endcode %}
