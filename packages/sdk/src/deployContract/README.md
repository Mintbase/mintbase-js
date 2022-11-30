[//]: # `{ "title": "deployContract", "order": 0.4 }`

# Deploy Contract

Deploys a new contract from a given factoryContractId

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## deployContract(args: DeployContractArgs): NearContractCall

`deployContract` takes a single argument of type `DeployContractArgs`

```typescript
export type DeployContractArgs = {
    //the contract factory used to deploy the contract
    //if not provided defaults to the mintbase testnet contract factory: 'mintspace2.testnet'
    factoryContractId?: string;
    //name for the contract, this should be unique within the factory
    name: string;
    //wallet id of the intended owner
    ownerId: string;
    metadata: {
      symbol: string;
      //if nothing is provided will default to the mb default logo
      icon?: string;
      //will default to null
      baseUri?: string;
      //will default to null
      reference?: string;
      //will default to null
      referenceHash?: string; 
    };
  };
```

Example usage of deployContract method in a hypothetical React component:
{% code title="DeployContractUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, deployContract } from '@mintbase-js/sdk';


export const DeployContractUI = ({ name, owner, contractId, symbol }:any) => {
  const { selector } = useWallet();
  const handleDeployContract = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
        //because no contract factory id is provided it defaults to 'mintspace2.testnet'
        deployContract({
          name: name,
          ownerId: owner,
          metadata: {
            symbol: symbol
          }
        }),
        {wallet})
  };
  return (
    <div>
      <button onClick={() => handleDeployContract()}>
        DeployContract with name= {name} and owner= {owner}
      </button>
    </div>
  );
};
```
{% endcode %}