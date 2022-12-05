[//]: # `{ "title": "mint", "order": 0.1 }`

# Mint

Mint one or more copies of a token for a given reference material on a speicified contract for which you have minting access on with customizable royalties.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## mint(args: MintArgs): NearContractCall

`mint` takes a single argument of type `MintArgs`

```typescript
export type MintArgs =  {
  //the contractId from which you want to mint  
  nftContractId: string;
  //url of reference material used to mint, this is typically a arweave or ipfs link
  //you can upload to arweave easily using our storage module 'uploadFileToArweave' method
  reference: string;
  //the intended owner of the token being minted
  ownerId: string;
  options?: MintOptions;
};

export type MintOptions = {
    // 0 < royaltyPercentage < 0.5
    //total percentage that will be allocated to royalties. 
    //the maximum amount that can be allocated to royalties is 0.5 (50%)
    //this value cant be negative   
    royaltyPercentage?: number;
    //key value pairs of ids and the relative percentage of the allocated royalties amount
    //splits must have at least 2 entries
    //splits must not have more than 50 entries
    //the splits percentage amounts must total to 1 meaning 100% of royaltyPercentage i.e royaltyPercentage = 0.3 splits = {test1: 0.5, test2: 0.5} this 1=100% corresponds to 0.3=30% of total
    splits?: Splits;
    //the amount of copies of specified token to be minted
    //this amount cannot be larger than 99
    amount?: number;    
}
```

Example usage of mint method in a hypothetical React component:
{% code title="MintUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, mint } from '@mintbase-js/sdk';


export const MintUI = ({ reference, contractId, owner }:any) => {
  const { selector } = useWallet();
  const handleMint = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
      mint({ nftContractId: contractId, reference: reference, ownerId: owner })
    );
  return (
    <div>
      <button onClick={() => handleMint()}>
        Mint
      </button>
    </div>
  );
};
```
{% endcode %}