[//]: # `{ "title": "delist", "order": 0.9 }`

# Delist 

Calling this method revokes token approval from the supplied market address resulting in the delisting of the provided token.

Token approvals are permissions granted to decentralized apps to transfer tokens you own on your behalf.

This means that the marketplace won't be able to list your token for sale because they won't be able to transfer it once its sold.

Delisting removes the stored listing from the market contract resulting in the recovery of the storage deposit.

If no marketAddress is provided approval is removed from all markets/accounts

If you wish to remove a listing specifically on the mintbase market addresses are:

testnet: ``market-v2-beta.mintspace2.testnet``
mainnet: ``simple.market.mintbase1.near``

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## delist(args: DelistArgs): NearContractCall

`delist` takes a single argument of type `DelistArgs`

```typescript
type DelistArgs = {
    // contract from which the token belongs to
    //as an argument or through NFT_CONTRACT_ID env
    nftContractId?: string;
    // id of the token for which the approval will be revoked
    tokenId: string;
    //if removal is necessary for only a specific market/account
    marketAddress?: string;
}
```
