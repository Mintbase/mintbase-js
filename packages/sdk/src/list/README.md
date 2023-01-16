[//]: # `{ "title": "list", "order": 0.11 }`

# List

Lists a token on the Mintbase market for a provided price.

The token is specified via `tokenId` as well as the `nftContractId` from where the token was minted.

The nftContactId can be supplied as an argument or through the ``CONTRACT_ADDRESS`` environment variable.

Market address default values depend on the `NEAR_NETWORK` environment variable. If you set it to `mainnet` you will get the mainnet address `simple.market.mintbase1.near` otherwise it will default to the `testnet` value `market-v2-beta.mintspace2.testnet`.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## list(args: ListArgs): NearContractCall

`list` takes a single argument of type `ListArgs`

```typescript
export type ListArgs = {
    //contract to which the token belongs, 
    //as an argument or through CONTRACT_ADDRESS env
    contractAddress: string;
    //tokenId of the token to be listed
    tokenId: string;
    //mintbase market address where the token will be listed, this defaults to the correct value depending on the NEAR_NETWORK environment variable
    marketAddress?: string;
    //price to be listed for
    price: string;
  }
```


## React example


Example usage of deployContract method in a hypothetical React component:
{% code title="ListComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, list, ListArgs } from '@mintbase-js/sdk';


export const ListComponent = ({ contractAddress, marketAddress , tokenId, price }:ListArgs):JSX.Element => {
  
  const { selector } = useWallet();

  const handleList = async (): Promise<void> => {
    const wallet = await selector.wallet();
    
    await execute(
        {wallet},
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )
  }

  return (
    <div>
      <button onClick={handleList}>
        DeployContract with name= {name} and owner= {owner}
      </button>
    </div>
  );
};
```
{% endcode %}