[//]: # `{ "title": "buy", "order": 0.10 }`

# Buy

Buys a listed token by tokenId belonging to a provided contract for a specified price as long as this price is above the one it was listed for.
An affiliate kickback is also possible via the referrer field
The market address defaults to market-v2-beta.mintspace2.testnet if none is provided

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## buy(args: BuyArgs): NearContractCall

`buy` takes a single argument of type `BuyArgs`

```typescript
export type BuyArgs = {
    // the price you want to buy a token for, this must be greater than the amount its currently listed for
    price: string;
    // contract to which the token belongs
    nftContractId: string;
    // id of the token to be bought
    tokenId: string;
    // account that will receive the affiliate kick back (check affiliate documentation)
    referrerId?: string;
    //address of the mintbase market contract, this default to market-v2-beta.mintspace2.testnet
    marketAddress?: string;
  };
```
