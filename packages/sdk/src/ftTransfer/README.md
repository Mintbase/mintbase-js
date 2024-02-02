[//]: # `{ "title": "ftTransfer", "order": 0.14 }`

# Transfer Fungible Tokens

Transfers an amount of fungible tokens to a given account. Make sure that your recipient is [registered with the FT contract](../ftDepositStorage/README.md), and that you get the decimals of the transfer right.


**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## ftTransfer(args: FtTransferArgs): NearContractCall

`ftTransfer` takes a single argument of type `FtTransferArgs`

```typescript
type FtTransferArgs = {
  // The FT contract whose tokens should be transferred.
  ftContractAddress: string;
  // The recipient of the FT transfer.
  receiverId: string;
  // The amount of FT to transfer in atomic units. Make sure to check the `decimals` field of this FT smart contracts metadata to avoid errors.
  amount: string;
  // An optional memo that you wish to send along with the transfer.
  memo?: string;
};
```

Example usage of FT transfer method in a hypothetical React component:
{% code title="FtTransferComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, ftTransfer, FtTransferArgs } from '@mintbase-js/sdk';

const TransferComponent = (): JSX.Element => {
  const { selector, activeAccountId } = useWallet();

  const handleFtTransfer = async (): Promise<void> => {
    const wallet = await selector.wallet();

    const ftTransferArgs: FtTransferArgs = {
        ftContractAddress: "usdc.fakes.testnet",
        receiverId: "mb_carol.testnet",
        amount: "10000000"
      }

    await execute(
      { wallet },
      ftTransfer(ftTransferArgs),
    );
  };

  return (
    <div>
      <button onClick={handleFtTransfer}>
        Transfer 10 USDC to Carol
      </button>
    </div>
  );
}

```
{% endcode %}
