[//]: # `{ "title": "mint", "order": 0.1 }`

# Mint

Mint a token for a specified reference material on a contract of your choice. You need to have been given minting permission.

The reference material is typically uploaded to IPFS or Arweave and can be easily done through our `uploadReference` method found in the storage module. Follow [this guide](https://docs.mintbase.xyz/dev/getting-started/upload-reference-material-to-arweave-and-mint) to learn how to handle permanent uploads! 

Royalties can be configured to provide a customized flow of funds as explained below.

It is possible to configure the amount of copies you want to mint through the `amount` field, but currently they will all share the same reference material.

The nftContactId can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## mint(args: MintArgs): NearContractCall

`mint` takes a single argument of type `MintArgs`

```typescript
export type MintArgs =  {
  //the contractId from which you want to mint
  //can be specified through CONTRACT_ADDRESS configuration / environment variables
  contractAddress?: string;
  //the intended owner of the token being minted
  ownerId: string;
  // metadata including title, description and reference materials
  metadata: TokenMetadata;
  options?: MintOptions;
  noMedia?: boolean;     // explicit opt-in to NFT without media, breaks wallets
  noReference?: boolean; // explicit opt-in to NFT without reference
};

export type MintArgs =  {
  //the contractId from which you want to mint, this can be statically defined via the mbjs config file 
  contractAddress?: string;
  //the intended owner of the token being minted
  ownerId: string;
  //on chain metadata, currently reference and media must be provided unless clearly opted out using the noMedia or noReference args
  //the storage module returns the media hash to be provided to the media key in the metadata object when uploading as well as the referenceId which should be supplied to the reference key.
  metadata: TokenMetadata;
  //permanent royalties to be paid on every token sale provided in a Record of keys (accountIds) and values (amount)
  //the royalty total is capped at 0.5 eg: {"test1.near" : 0.2, "test2.near": 0.3}
  royalties?: Splits;
  //amount of tokens with the same metadata you would like to mint
  amount?: number;
  // explicit opt-in to NFT without media, breaks wallets
  noMedia?: boolean;  
  // explicit opt-in to NFT without reference    
  noReference?: boolean; 
  tokenIdsToMint?: number[];
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