[//]: # `{ "title": "ftDepositStorage", "order": 0.15 }`

# Deposit storage for FT transfers

This acts as registration for FT transfers. You cannot transfer FTs to an account that does is not registered with the corresponding FT smart contract.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## ftDepositStorage(args: FtDepositStorageArgs): NearContractCall

`ftDepositStorage` takes a single argument of type `FtDepositStorageArgs`

```typescript
type FtDepositStorageArgs = {
  // The FT contract whose tokens should be transferred.
  ftContractAddress: string;
  // The account for which you wish to cover the storage deposit.
  accountId?: string;
};
```

Example usage of transfer method in a hypothetical React component:
{% code title="TransferComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, ftDepositStorage, FtDepositStorageArgs } from '@mintbase-js/sdk';

const FtDepositStorageComponent = (): JSX.Element => {
  const { selector, activeAccountId } = useWallet();

  const handleFtDepositStorage = async (): Promise<void> => {
    const wallet = await selector.wallet();

    const ftDepositStorageArgs: FtDepositStorageArgs = {
        ftContractAddress: "usdc.fakes.testnet",
        accountId: 'mb_carol.testnet',
      }

    await execute(
      { wallet },
      ftDepositStorage(ftDepositStorageArgs),
    );
  };

  return (
    <div>
      <button onClick={handleFtDepositStorage}>
        Register Carol with USDC
      </button>
    </div>
  );
}

```
{% endcode %}
