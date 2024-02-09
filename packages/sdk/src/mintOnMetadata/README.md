[//]: # `{ "title": "mintOnMetadata", "order": 0.17 }`

# Mint on Metadata (v2)

Mint on [previously created metadata](../createMetadata/README.md). Make sure to attach the required price!

If you want specific token IDs, you can specify those via the `tokenIds` parameter. If your token IDs are already in use, this will cause a smart contract panic. You can also mint multiple tokens without specifying token IDs using the `amount` parameter. Make sure that there is no mismatch between your `tokenIds` and `amount` parameters.

The `nftContactId` can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

If you want to mint on a v1 smart contract, please use the [corresponding method](../mint/README.md).

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## mintOnMetadata(args: MintOnMetadataArgs): NearContractCall

`mintOnMetadata` takes a single argument of type `MintOnMetadataArgs`

```typescript
export type MintOnMetadataArgs =  {
  //the contractId from which you want to mint, this can be statically defined via the mbjs config file
  contractAddress?: string;
  //the ID of the metadata you wish to mint on
  metadataId: string;
  //the owner of the minted tokens
  ownerId: string;
  // number of tokens to mint
  amount?: number;
  //pre-specified token IDs
  tokenIds?: string[];
};
```

## React example

Example usage of mint method in a hypothetical React component:
{% code title="MintComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, mintOnMetadata, MintOnMetadataArgs } from '@mintbase-js/sdk';


export const MintOnMetadataComponent = ({ contractAddress, metadataId, ownerId, price }: MintOnMetadataArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleMintOnMetadata = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      mintOnMetadata({ contractAddress, metadataId, ownerId, price })
    );

  }

  return (
    <div>
      <button onClick={handleMintOnMetadata}>
        Mint on metadata
      </button>
    </div>
  );
};
```
{% endcode %}
