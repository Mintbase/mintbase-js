[//]: # `{ "title": "depositStorage", "order": 0.12 }`

# Deposit Storage

Deposits 0.01 * listAmount of near to the market contract to be consumed for each listing. This might need to be called again the the deposit runs out.
The market address defaults to market-v2-beta.mintspace2.testnet if none is provided

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## depositStorage(args: DepositStorageArgs): NearContractCall

`depositStorage` takes a single argument of type `DepositStorageArgs`

```typescript
export type DepositStorageArgs = {
    //the deposit corresponding roughly the the amounts of listings you will be doing
    listAmount?: number;
    //market address of the mintbase market, this default to market-v2-beta.mintspace2.testnet
    marketAddress?: string;
  };
```
