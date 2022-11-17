[//]: # `{ "title": "@mintbase-js/sdk", "order": 0 }`
## SDK Core Javascript Modules

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

The `excecute` method can be used without apis helpers, however you will need to specify all `NearContractCall` properties.

The method accepts a single "call" object or an array, in which case it will determine the best way to batch process each one *(see [batching](#batching) below)*.

```
execute(
  calls: NearContractCall | NearContractCall[],
  signingOptions: NearCallSigningOptions
): Promise<void | providers.FinalExecutionOutcome>
```
Here is an example using the execute function call:
## NearContractCall

This type specifies properties of a contract calls:

{% code title="executeContractMethod.ts" overflow="wrap" lineNumbers="true" %}
```typescript
import { execute, MAX_GAS, ONE_YOCTO } from '@mintbase-js/sdk';
import { getWallet } from '@mintbase-js/auth';
import type {
  NearContractCall,
  NearCallSigningOptions,
  FinalExecutionOutcome
} from '@mintbase-js/sdk';


const call: NearContractCall = {
  // the smart contract address for which we will call
  // most of the time, this will be supplied as an environment variable
  contractAddress: 'mytokencontract.mintbase1.near',

  // the smart contract method
  methodName: 'transfer',

  // the arguments supplied to the method
  args: { receiver_id: 'bob.near', token_id: '123' },

  // how much gas you would like to send
  // you will be refunded unused gas so MAX_GAS is always a safe bet
  gas: MAX_GAS,

  // most methods require the min amount of deposit (ONE_YOCTO) to be accepted.
  // in some cases deposit amount is the amount of currency to be transfer,
  deposit: ONE_YOCTO,
}

const makeSmartContractCall = async (): Promise<FinalExecutionOutcome> => {

  // to better understand signing options, read the auth module docs
  // to use an account directly, you have to implement this method
  // const account = await authenticateAccount('mynearaccount.near');

  // before the getWallet can be called, you will need to setup the components in the browser, it will throw othwerise
  const wallet = await getWallet();

  const sign: NearCallSigningOptions = {
    // account
    wallet,
  }
  return await execute(call, sign);
}

makeSmartContractCall()
  .then((res: FinalExecutionOutcome) => console.log('got transaction result:', res))
  .catch((err) => console.error('things went wrong', err));

```
{% endcode %}

## Batching Transactions <div name="batching"></div>

The reason for the optional `Promise<void>` return type in the execute method, is that batch methods in some [near/wallet-selector] implementations do not return transactions execution outcomes.

## Further

{% hint style="warning" %}

Should you encounter this [known issue](ttps://docs.near.org/tools/near-api-js/faq#class-x-is-missing-in-schema-publickey) make sure you are not importing modules directly from `near-api-js`, import them from `@mintbase-js/sdk` instead to avoid the duplicate import.

{% endhint %}
