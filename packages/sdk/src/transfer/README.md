[//]: # `{ "title": "transfer", "order": 1 }`

# Transfer Tokens

Transfers one or more tokens from the transaction signer to the recipient(s) specified.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

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
  // if omitted, transfer method will attempt to use process.env.TOKEN_CONTRACT
  nftContractId?: string;
};
```

Example usage of transfer method in a hypothetical React component:
{% code title="TransferUI.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, transfer } from '@mintbase-js/sdk';

const TransferUI = ({ tokenId, contractId }) => {
  const { selector, activeAccountId } = useWallet();

  const handleTransfer = async (): Promise<void> => {
    const wallet = await selector.wallet();
    await execute(
      transfer({
        nftContractId: token.contractId,
        transfers: [{
          receiverId: 'mb_carol.testnet',
          tokenId: token.tokenId,
        }],
      }),
      { wallet },
    );
  };

  return (
    <div>
      <button onClick={() => handleTransfer()}>
        Transfer {tokenId} of {contractId} from {activeAccountId} to Carol
      </button>
    </div>
  );
}

```
{% endcode %}