[//]: # `{ "title": "@mintbase-js/rpc", "order": "5" }`


# Installing

`npm install @mintbase-js/rpc`

# Interacting with the NEAR RPC

This module provides a wrapper around common RPC calls used to fetch on-chain data to supplement, or in some cases substitute data provided by the indexer (data module).

## Available Modules & Methods

`type Network: 'testnet' | 'mainnet'`

### `getBalance(account: string, network?: Network, rpc?: RPC_OPTIONS): BN`

Fetches the balance of a NEAR account (in yocto) by address.

### `getBlockHeight(network?: Network,  rpc?: RPC_OPTIONS): number`

Returns the current block height for the configured network.

### `getTxnStatus(txnHash: string, senderId: string,network?: Network,  rpc?: RPC_OPTIONS): TxnStatus`

For a transaction hash, determine the status of a transaction on the configured network: `pending`, `success`, or `failure`

### `payouts({ contractId, tokenId, network, rpc }): Promise<UiPayout>`

Calls a token contract in order to determine the percentage amounts paid out to royalty accounts.

### `getAccessKeys(accountId: string, network?: Network,  rpc?: RPC_OPTIONS): Promise<AccessKey>`

Gets all access keys (public key and permissions object) for a given account.

## Configuration

Before calling these methods the near network should be configured using the [config SDK method](https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk/config)

## Future

We will be adding more contract view methods here as needs arise.
