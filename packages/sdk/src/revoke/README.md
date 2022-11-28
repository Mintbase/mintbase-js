[//]: # `{ "title": "revoke", "order": 0.8 }`

# Revoke Approval

Revoke approval for a token from all or a single account

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## revoke(args: RevokeArgs): NearContractCall

`revoke` takes a single argument of type `RevokeArgs`

```typescript
type RevokeArgs = {
    // contract from which to revoke approval for a token
    nftContractId: string;
    // id of the token for which the approval will be revoked
    tokenId: string;
    //account to revoke approval for, if not provided removes all approvals
    accountToRevokeId?: string;
}
```
