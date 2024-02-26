[//]: # `{ "title": "mintOnMetadata", "order": 0.20 }`

# Update Metadata (v2)

Update [previously created metadata](../createMetadata/README.md). This is only possible if the metadata has been marked as dynamic while creating it.

The `nftContactId` can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

This only works on v2 smart contracts and no equivalent feature exists for v1.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## updateMetadata(args: UpdateMetadataArgs): NearContractCall

`updateMetadata` takes a single argument of type `UpdateMetadataArgs`

```typescript
export type UpdateMetadataArgs =  {
  //the contractId from which you want to mint, this can be statically defined via the mbjs config file
  contractAddress?: string;
  //the ID of the metadata you wish to mint on
  metadataId: string;
  //on chain metadata, currently reference and media must be provided unless clearly opted out using the noMedia or noReference args
  //the storage module returns the media hash to be provided to the media key in the metadata object when uploading as well as the referenceId which should be supplied to the reference key.
  metadata: TokenMetadata;
  // explicit opt-in to NFT without media, breaks wallets
  noMedia?: boolean;
  // explicit opt-in to NFT without reference
  noReference?: boolean;
};
```

## React example

Example usage of mint method in a hypothetical React component:
{% code title="UpdateComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, uppdateMetadata, MintOnMetadataArgs } from '@mintbase-js/sdk';


export const UpdateMetadataComponent = ({ contractAddress, metadataId, metadata }: UpdateMetadataArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleUpdateMetadata = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      uppdateMetadata({ contractAddress, metadataId, metadata })
    );

  }

  return (
    <div>
      <button onClick={handleUpdateMetadata}>
        Mint on metadata
      </button>
    </div>
  );
};
```
{% endcode %}
