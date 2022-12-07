[//]: # `{ "title": "list", "order": 0.11 }`

# List

Lists a token on the Mintbase market for a provided price.

The token is specified via `tokenId` as well as the `nftContractId` from where the token was minted.

The nftContactId can be supplied as an argument or through the ``NFT_CONTRACT_ID`` environment variable.

Market address default values depend on the `NEAR_NETWORK` environment variable. If you set it to `mainnet` you will get the mainnet address `simple.market.mintbase1.near` otherwise it will default to the `testnet` value `market-v2-beta.mintspace2.testnet`.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method**

## list(args: ListArgs): NearContractCall

`list` takes a single argument of type `ListArgs`

```typescript
export type ListArgs = {
    //contract to which the token belongs, 
    //as an argument or through NFT_CONTRACT_ID env
    nftContractId: string;
    //tokenId of the token to be listed
    tokenId: string;
    //mintbase market address where the token will be listed, this defaults to the correct value depending on the NEAR_NETWORK environment variable
    marketId?: string;
    //price to be listed for
    price: string;
  }
```


