/* eslint-disable max-len */
import type { NetworkId } from '@near-wallet-selector/core';

export const NEAR_WALLET_ENV = (
  process.env.NEAR_WALLET_ENV || 'testnet'
) as NetworkId;

// FIXME: these should probably live in sdk module
export const DEFAULT_MINTBASE_CONTRACT_TESTNET = 'mintspace2.testnet';
export const DEFAULT_MINTBASE_CONTRACT_MAINNET = 'mintbase1.near';

export const NEAR_WALLET_SELECTOR_DEBUG = NEAR_WALLET_ENV === 'testnet';

export const NEAR_LOGIN_CONTRACT_ID = process.env.NEAR_LOGIN_CONTRACT_ID;

export const WALLET_CONNECTION_POLL_INTERVAL = 1_000;
// how long to wait for the user to make the connection to the wallet.
export const WALLET_CONNECTION_TIMEOUT = 30_000;


// error messages
export const WALLET_SETUP_NOT_CALLED_ERROR = 'Call and await setupWalletSelectorComponents() before registering a subscriber';
export const WALLET_CONNECTION_NOT_FOUND = `Wallet connection not recieved after ${WALLET_CONNECTION_TIMEOUT}ms`;
