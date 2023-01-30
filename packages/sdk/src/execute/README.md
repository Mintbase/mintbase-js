[//]: # `{ "title": "execute", "order": 0.12 }`

# Execute

Execute is our main wrapper for calls on mintbase.js
- It accepts a first Object as Argument that setup the batch call with the desired data.
- It accepts a N number of transactions.

## execute = async ({ wallet, account, callbackUrl = mbjs.keys.callbackUrl, callbackArgs }: NearExecuteOptions, ...calls: NearContractCall<ExecuteReturnArgs>[]):

`execute` takes one Argument as `NearExecuteOptions` and also one or more NearContractCall

```typescript
export type NearExecuteOptions = {
   // wallet
    wallet: Wallet;
    // contract address
    account: Account;
    // the page url that you want the user to be redirected after the success of the transaction. Must include full url ex:
    // https://www.mintbase.xyz/success
    callbackUrl?: string;
    // Object that accepts desired arguments to be passed through the URL so you can get them to use in the success page
    callbackArgs?: {
      arg: string
      arg2: number
    };
  }
```

## callbackUrl:

- this argument can be set within [mbjs.config](../config/) ( globally ), thus if passed globally theres no need to be passed in the first obj argument.
or in the execute method. it must be passed in full url. ex: "https://www.mintbase.xyz/success"


## callbackArgs:

- Optional object that will be passed as an argument on the url, ex: "https://www.mintbase.xyz/success?signMeta=arg1:XYZ"


## React example


Example usage of list method in a hypothetical React component:
{% code title="ListComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, list, ListArgs } from '@mintbase-js/sdk';


export const ListComponent = ({ contractAddress, marketAddress , tokenId, price }:ListArgs):JSX.Element => {
  
  const { selector } = useWallet();

  const handleList = async (): Promise<void> => {
    const wallet = await selector.wallet();
    

    const callBackArgs = {
      autotransfer: true,
      metadataId: id,
      contractId: address,
   }

    const callback = {
      args: callBackArgs,
      type:  TransactionSuccessEnum.SIMPLE_SALE_LIST
    }


 // 1. using callbackUrl + callbackArgs

   const receipt =  await execute(
        {wallet, callbackUrl:'https://www.mintbase.xyz/success' , callbackArgs},
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )
  


  // 2. using callbackArgs, and set mbjs.config({callbackUrl: 'https://www.mintbase.xyz/success' }) on main app.tsx

   const receipt =  await execute(
        {wallet, callbackArgs},
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )


 
  // 3.not using callbackArgs neither callbackUrl
  //  IF You decide to go by this approach:
  //   - Browser Wallets (Near Wallet, My Near Wallet): will redirect to the previous page with transactionsHash param
  //   - Injected Wallets (Meteor,Sender, etc) will return a receipt object

   const receipt =  await execute( 
        {wallet},
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )
       

  console.log(receipt, 'receipt')

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