[//]: # `{ "title": "revokeApproval", "order": 0.9 }`

# Revoke Approval

Revoke approval for a token from a single account or all accounts
This means that marketplaces won't be able to list your token for sale because they won't be able to transfer it once its sold.

**As with all new SDK api methods, this call should be wrapped in [execute](../#execute) and passed a signing method

## revokeApproval(args: RevokeApprovalArgs): NearContractCall

`revokeApproval` takes a single argument of type `RevokeApprovalArgs`

```typescript
type RevokeApprovalArgs = {
    // contract from which to revoke approval for a token
    nftContractId: string;
    // id of the token for which the approval will be revoked
    tokenId: string;
    //account to revoke approval for, if not provided removes all approvals
    accountToRevokeId?: string;
}
```
