[//]: # `{ "title": "mint", "order": 0.1 }`

# Mint (v1)

Mint a token for a specified reference material on a contract of your choice. You need to have been given minting permission.

The reference material is typically uploaded to IPFS or Arweave and can be easily done through our `uploadReference` method found in the storage module. Follow [this guide](https://docs.mintbase.xyz/dev/getting-started/upload-reference-material-to-arweave-and-mint) to learn how to handle permanent uploads!

Royalties can be configured to provide a customized flow of funds as explained below.

It is possible to configure the amount of copies you want to mint through the `amount` field, but currently they will all share the same reference material.

The nftContactId can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

If you want to mint on a v2 smart contract, please [create metadata](../createMetadata/README.md), then [mint on it](../mintOnMetadata/README.md).

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## mint(args: MintArgsV1): NearContractCall

- **contractAddress (optional):** This is the address of the contract where the token will be minted. If not provided, the TOKEN_CONTRACT environment variable will be used.

- **ownerId:** This is the NEAR account ID of the owner of the token that will be minted.

- **metadata:** This is an object containing the metadata of the token. It includes properties like title, description, media, etc.

- **royalties (optional):** This is an object that specifies how the funds from the sale of the token will be split among different parties.

- **amount (optional):** This is the number of copies of the token that you want to mint. If not provided, only one copy will be minted.

- **noMedia (optional):** This is a flag that indicates whether the token will be minted without any associated media. If set to true, the token will be minted without any media, which may cause issues with some wallets that expect media to be associated with tokens.


- **noReference (optional):** This is a flag that indicates whether the token will be minted without any reference to an external resource. If set to true, the token will be minted without any reference.


`mint` takes a single argument of type `MintArgs`

## MintArgsV1



```typescript
export type MintArgsV1 =  {
  contractAddress?: string;
  ownerId: string;
  metadata: TokenMetadata;
  royalties?: Splits;
  amount?: number;
  noMedia?: boolean;     // explicit opt-in to NFT without media, breaks wallets
  noReference?: boolean; // explicit opt-in to NFT without reference
};

export type TokenMetadata = {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  issued_at?: string;  // Stringified unix timestamp, according to
  expires_at?: string; // standards this is milliseconds since epoch, but
  starts_at?: string;  // since `env::block_timestamp` is in nanoseconds
  updated_at?: string; // most timestamps in the ecosystem are nanoseconds
  extra?: string;
  reference?: string;
  reference_hash?: string;
}
```

## React example

Example usage of mint method in a hypothetical React component:
{% code title="MintComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, mint, MintArgs } from '@mintbase-js/sdk';


export const MintComponent = ({ media, reference, contractAddress, owner }: MintArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleMint = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      mint({ contractAddress: contractAddress, metadata: { media, reference }, ownerId: owner })
    );

  }

  return (
    <div>
      <button onClick={handleMint}>
        Mint
      </button>
    </div>
  );
};
```
{% endcode %}
