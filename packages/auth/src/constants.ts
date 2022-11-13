/* eslint-disable max-len */

export type NearNetwork = 'mainnet' | 'testnet';

export const NEAR_ENV = (
  process.env.NEAR_ENV || 'testnet'
) as NearNetwork;

// FIXME: these should probably live in sdk module
export const DEFAULT_MINTBASE_CONTRACT_TESTNET = 'mintspace2.testnet';
export const DEFAULT_MINTBASE_CONTRACT_MAINNET = 'mintbase1.near';

export const NEAR_WALLET_SELECTOR_DEBUG = NEAR_ENV === 'testnet';

export const NEAR_LOGIN_CONTRACT_ID = process.env.NEAR_LOGIN_CONTRACT_ID;

export const WALLET_CONNECTION_POLL_INTERVAL = 1_000;
// how long to wait for the user to make the connection to the wallet.
export const WALLET_CONNECTION_TIMEOUT = 30_000;

export const NEAR_RPC_URL = {
  TESTNET: 'https://rpc.testnet.near.org',
  MAINNET: 'https://rpc.mainnet.near.org',
};

// error messages
export const WALLET_SETUP_NOT_CALLED_ERROR = 'Call and await setupWalletSelectorComponents() before registering a subscriber';
export const WALLET_CONNECTION_NOT_FOUND = `Wallet connection not received after ${WALLET_CONNECTION_TIMEOUT}ms`;
