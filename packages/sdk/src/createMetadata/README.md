[//]: # `{ "title": "createMetadata", "order": 0.16 }`

# Create Metadata

{% hint style="warning" %}
This method works on NFT smart contracts v2. If you want to mint on a v1 smart contract, please use the [corresponding method](../mint/README.md).
{% endhint %}

Create metadata for a specified reference material on a contract of your choice. Others can then [mint tokens on that metadata](../mintOnMetadata/README.md), while you as the creator will get the payout from the price specified on creating the metadata. You need to have been given creator permission.

The reference material is typically uploaded to IPFS or Arweave and can be easily done through our `uploadReference` method found in the storage module. Follow [this guide](https://docs.mintbase.xyz/dev/getting-started/upload-reference-material-to-arweave-and-mint) to learn how to handle permanent uploads!

Royalties can be configured to provide a customized flow of funds as explained below.

Using the `ftAddress` parameter, you can specify that you want the minting price for this token to be paid via the desired fungible token. This also requires you to specify a number for `ftDecimals`. Note that the mint will fail if the smart contract is not registered with the corresponding FT. Please check [`ftDepositStorage`](../ftDepositStorage/README.md) for instructions how to do so. Similarly, if a royalty holder (by default the metadata creator), is not registered, the FTs cannot be transferred to them and will be "stuck" with the smart contract.

You can restrict minting via an allowlist of NEAR account IDs that are allowed to mint (`mintersAllowslist`), via a maximum supply that will be enforced by the smart contract (`maxSupply`), and via an expiry date (`lastPossibleMint`). You can opt-in to making an NFT dynamic (`isDynamic`) to allow [future updates](../updateMetadata/README.md), and [lock the metadata](../lockMetadata/README.md) at a later time.

The `nftContactId` can be supplied as an argument or through the `TOKEN_CONTRACT` environment variable.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method. For a guide showing how to make a contract call with mintbase-js click [here](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)**

## createMetadata(args: CreateMetadataArgs): NearContractCall

`createMetadata` takes a single argument of type `CreateMetadataArgs`

```typescript
export type CreateMetadataArgs =  {
  //the contractId from which you want to mint, this can be statically defined via the mbjs config file
  contractAddress?: string;
  //on chain metadata, currently reference and media must be provided unless clearly opted out using the noMedia or noReference args
  //the storage module returns the media hash to be provided to the media key in the metadata object when uploading as well as the referenceId which should be supplied to the reference key.
  metadata: TokenMetadata;
  //pre-specified metadata ID, increment counter otherwise
  metadataId?: string;
  //permanent royalties to be paid on every token sale provided in a Record of keys (accountIds) and values (amount)
  //the royalty total is capped at 0.5 eg: {"test1.near" : 0.2, "test2.near": 0.3}
  royalties?: Splits;
  //account IDs that are allowed to mint tokens on this metadata
  mintersAllowlist?: string[];
  //maximum amount of tokens allowed to be minted on this metadata
  maxSupply?: string[];
  //date when minting of this metadata will be enabled, nobody will be able to mint earlier.
  startsAt?: Date;
  //date when minting of this metadata will be disabled, nobody will be able to mint later.
  expiresAt?: Date;
  //price in $NEAR that has to be paid for minting on this metadata, will be distributed between royalty holders
  price: number;
  // explicit opt-in to NFT without media, breaks wallets
  noMedia?: boolean;
  // explicit opt-in to NFT without reference
  noReference?: boolean;
  // explicit opt-in to make the NFT dynamic and allow future updates
  isDynamic?: boolean;
  // Address of FT with which the mint shall be paid
  ftAddress?: string;
  // Decimal places that the atomic unit of the FT represents
  ftDecimals?: string;
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
{% code title="CreateMetadataComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, createMetadata, CreateMetadataArgs } from '@mintbase-js/sdk';


export const CreateMetadataComponent = ({ media, reference, contractAddress, price }: CreateMetadataArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleCreateMetadata = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      createMetadata({ contractAddress: contractAddress, metadata: { media, reference }, price })
    );

  }

  return (
    <div>
      <button onClick={handleCreateMetadata}>
        Create metadata
      </button>
    </div>
  );
};
```
{% endcode %}
