[//]: # `{ "title": "@mintbase-js/rpc", "order": "5" }`


# Installing

`npm install @mintbase-js/rpc`

package needed: `npm install --save-dev isomorphic-unfetch`

# Interacting with the NEAR RPC

This module provides a wrapper around common RPC calls used to fetch on-chain data to supplement, or in some cases substitute data provided by the indexer (data module).

## Available Modules & Methods

### `getBalance(account: string): BN`

Fetches the balance of a NEAR account (in yocto) by address.

### `getBlockHeight(): number`

Returns the current block height for the configured network.

### `getTxnStatus(txnHash: string, senderId: string): TxnStatus`

For a transaction hash, determine the status of a transaction on the configured network: `pending`, `success`, or `failure`

### `payouts({ contractId, tokenId }): Promise<UiPayout>`

Calls a token contract in order to determine the percentage amounts paid out to royalty accounts.

## Configuration

Before calling these methods the near network should be configured using the [config SDK method](https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk/config)

## Future

We will be adding more contract view methods here as needs arise.