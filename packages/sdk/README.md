[//]: # `{ "title": "@mintbase-js/sdk", "order": "0" }`
## Core Features

The core `@mintbase-js/sdk` is a set of convenience wrappers around invocation of Mintbase smart contract methods.

It also exposes a low-level isomorphic [execute](#execute) method that can be passed raw `NearContractCall` information.

## Calling Smart Contract Methods

In order to invoke a smart contract method, the transaction has to be signed using a public/private key pair.

There are two options, both provided from the [@mintbase-js/auth](../auth/) module:

  1. Sign with a [browser wallet](../auth/#wallet)
  2. Sign with an [authenticated account](../auth/#account).

## Using API Methods <div name="api"></div>

The easiest way to call mintbase token and market contracts are with the convenience methods.

Details such as the method name, arguments, gas supplied, deposits and some other less than convenient aspects of blockchain development **will be abstracted away for you**, or at least well documented in each example.

{% hint style="warning" %}
This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
{% endhint %}

Check back soon for details. Individual methods and documentation will start to be available as we implement in the gitbook documentation menu.

<div name="execute"></div>

## Using `execute`

The `excecute` method can be used without api helpers, however you will need to specify all `NearContractCall` properties.

The method accepts any number of contract call objects returned by the sdk

```
execute(
  signingOptions: NearCallSigningOptions
  calls: NearContractCall[],
): Promise<providers.FinalExecutionOutcome | providers.FinalExecutionOutcome[]>
```
Here is an example using the execute function call:
## NearContractCall

This type specifies properties of a contract calls:

{% code title="executeContractMethod.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { execute, MAX_GAS, ONE_YOCTO, transfer } from '@mintbase-js/sdk';
import { getWallet } from '@mintbase-js/auth';
import type {
  NearContractCall,
  NearCallSigningOptions,
  FinalExecutionOutcome
} from '@mintbase-js/sdk';

//this creates a `NearContractCall` object for specific method 
const transferCall = transfer({
        nftContractId: 'mytokencontract.mintbase1.near',
        transfers: [{
          receiverId: 'bob.near',
          tokenId: '123',
        }],
      })

const makeSmartContractCall = async (): Promise<FinalExecutionOutcome> => {

  // to better understand signing options, read the auth module docs
  // to use an account directly, you have to implement this method
  // const account = await authenticateAccount('mynearaccount.near');

  // before the getWallet can be called, you will need to setup the components in the browser, it will throw othwerise
  const wallet = await getWallet();

  const sign: NearExecuteOptions = {
    // account
    wallet,
    callbackUrl: 'https://www.yourwebsite.xyz/success'
  }
  return await execute(sign, transferCall);
}

makeSmartContractCall()
  .then((res: FinalExecutionOutcome) => console.log('got transaction result:', res))
  .catch((err) => console.error('things went wrong', err));

```

- please read more detailed information about the execute method [here](/execute)


{% endcode %}

## Batching Transactions <div name="batching"></div>

When calling more than one method with execute the returned value will be a promise with an array of results `Promise<FinalExecutionOutcome[]>`
To use execute with batching all you need to do is supply as many calls as intended through arguments `execute(sign, mint, transfer, mint, burn )` in this manner executions will happen in order.

## Composition of Calls <div name="composition"></div>

Some api wrappers might be a composition of various contract calls that are often executed in succession like `depositStorage`+ `list` or `revoke`+ `unlist`.
The only difference is that in this case although you are technically calling execute with one method `execute(sign, delist)` you will receive 2 outcome objects in the resulting promise.

If you would like to create a composition yourself you can do so like this.

```typescript
const mintCall = mint({
      nftContractId: 'placeholder',
      ownerId: 'placeholder',
      reference: 'placeholder',
    });
    
    const composed: NearContractCall  = [mintCall, mintCall] as ContractCall[];

    const result = execute(sign, composed) as FinalExecutionOutcome[];

```

## Further

{% hint style="warning" %}

Should you encounter this [known issue](https://docs.near.org/tools/near-api-js/faq#class-x-is-missing-in-schema-publickey) `Class PublicKey is missing in schema: publicKey` make sure you are not importing modules directly from `near-api-js`, import them from `@mintbase-js/sdk` instead to avoid the duplicate import.

{% endhint %}