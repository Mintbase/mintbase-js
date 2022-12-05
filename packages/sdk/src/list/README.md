[//]: # `{ "title": "list", "order": 0.11 }`

# List

Lists a token on mintbase market with a provided price to be listed for, the contractId from where the token was minted, the respective tokenId as well as the market contract.
The market contract address defaults to market-v2-beta.mintspace2.testnet if none is provided

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## list(args: ListArgs): NearContractCall

`list` takes a single argument of type `ListArgs`

```typescript
export type ListArgs = {
    //contract id from where the token belongs
    nftContractId: string;
    //tokenId of the token to be listed
    tokenId: string;
    //mintbase market address where the token will be listed
    marketAdress: string;
    //price to be listed for
    price: string;
  }
```
