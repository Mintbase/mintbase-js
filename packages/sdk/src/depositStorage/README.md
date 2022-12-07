[//]: # `{ "title": "depositStorage", "order": 0.12 }`

# Deposit Storage

Deposits `0.01 * listAmount` of near to the market contract to be consumed for each listing.

If the amount of active listings becomes larger than the corresponding deposits called by an account another deposit will need to be made to make listing possible.

Market address default values depend on the NEAR_NETWORK enviroment variable. If you set it to mainnet you will get the `mainnet` address `simple.market.mintbase1.near` otherwise it will default to the `testnet` value `market-v2-beta.mintspace2.testnet`.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## depositStorage(args: DepositStorageArgs): NearContractCall

`depositStorage` takes a single argument of type `DepositStorageArgs`

```typescript
export type DepositStorageArgs = {
    //the deposit corresponding roughly to the the amounts of listings you will be doing
    listAmount?: number;
    //market address of the mintbase market, this defaults to the correct value depending on the NEAR_NETWORK environment variable
    marketId?: string;
  };
```
