[//]: # `{ "title": "depositStorage", "order": 0.12 }`

# Deposit Storage

Deposits `0.01 * listAmount` of NEAR Token to the market smart contract to be consumed for each listing.

If the amount of active listings becomes larger than the corresponding deposits  called by an account, another deposit will need to be made to make listing possible.

Market address default values depend on the NEAR_NETWORK enviroment variable. If you set it to `mainnet` you will get the mainnet `marketId` `simple.market.mintbase1.near` otherwise it will default to the `testnet` value `market-v2-beta.mintspace2.testnet`.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## depositStorage(args: DepositStorageArgs): NearContractCall

`depositStorage` takes a single argument of type `DepositStorageArgs`

```typescript
export type DepositStorageArgs = {
    //the deposit corresponding roughly to the amounts of listings you will be doing
    listAmount?: number;
    //accountId of the mintbase market, this defaults to the correct value depending on the NEAR_NETWORK environment variable
    marketAddress?: string;
  };
```


## React example


Example usage of deployContract method in a hypothetical React component:
{% code title="DepositStorageComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, depositStorage, DepositStorageArgs } from '@mintbase-js/sdk';


export const DepositStorageComponent = ({ listAmount, marketAddress }:DepositStorageArgs):JSX.Element => {
  
  const { selector } = useWallet();

  const handleDepositStorage = async (): Promise<void> => {
    const wallet = await selector.wallet();
    
    await execute(
        {wallet},
        depositStorage({
          listAmount: listAmount, 
          marketAddress: marketAddress
        })
      )
  }

  return (
    <div>
      <button onClick={handleDepositStorage}>
        DeployContract with name= {name} and owner= {owner}
      </button>
    </div>
  );
};
```
{% endcode %}