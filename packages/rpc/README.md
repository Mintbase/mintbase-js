[//]: # `{ "title": "@mintbase-js/rpc", "order": "5" }`


# Installing

`npm install @mintbase-js/rpc`

# Interacting with the NEAR RPC

This module provides a wrapper around common RPC calls used to fetch on-chain data to supplement, or in some cases substitute data provided by the indexer (data module).

## Available Modules & Methods

We now accepts rpcUrl on each method, so you can pass your own RPC regarding one of those on the list:
https://docs.near.org/api/rpc/providers


### `getBalance({account: string, rpcUrl?: string}): BN`

Fetches the balance of a NEAR account (in yocto) by address.

### `getBlockHeight({rpcUrl?: string}): number`

Returns the current block height for the configured network.

### `getTxnStatus({txnHash: string, senderId: string,rpcUrl?: string}): TxnStatus`

For a transaction hash, determine the status of a transaction on the configured network: `pending`, `success`, or `failure`

### `payouts({ contractId, tokenId, rpcUrl? }): Promise<UiPayout>`

Calls a token contract in order to determine the percentage amounts paid out to royalty accounts.

### `getAccessKeys({accountId: string,rpcUrl?: string}): Promise<AccessKey>`

Gets all access keys (public key and permissions object) for a given account.


## Future

We will be adding more contract view methods here as needs arise.
