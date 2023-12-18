[//]: # `{ "title": "transfer", "order": 0.14 }`

# Transfer Fungible Tokens

Transfers one or more tokens from the transaction signer to the recipient(s) specified.


**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## transfer(args: TransferArgs): NearContractCall

`transfer` takes a single argument of type `TransferArgs`

```typescript
type TransferArgs = {
  // pairs of recipient and token ids,
  // each recipient will receive the corresponding token
  transfers: {
    receiverId: string;
    tokenId: string;
  }[];
  // nftContractId is the token contract capable of doing the transfer
  // if omitted, transfer method will attempt to use process.env.CONTRACT_ADDRESS
  nftContractId?: string;
};
```

Example usage of transfer method in a hypothetical React component:
{% code title="TransferComponent.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, transfer, TransferArgs } from '@mintbase-js/sdk';

const TransferComponent = ({ tokenId, contractAddress }: TransferArgs): JSX.Element => {
  const { selector, activeAccountId } = useWallet();

  const handleTransfer = async (): Promise<void> => {
    const wallet = await selector.wallet();

    const transferArgs: TransferArgs = {
        contractAddress: contractAddress,
        transfers: [{
          receiverId: 'mb_carol.testnet',
          tokenId: token.tokenId,
        }],
      }

    await execute(
      { wallet },
      transfer(transferArgs),
    );
  };

  return (
    <div>
      <button onClick={handleTransfer}>
        Transfer {tokenId} of {contractAddress} from {activeAccountId} to Carol
      </button>
    </div>
  );
}

```
{% endcode %}
