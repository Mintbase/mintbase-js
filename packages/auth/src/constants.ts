import type { NetworkId } from '@near-wallet-selector/core';

export const NEAR_WALLET_ENV = (
  process.env.NEAR_WALLET_ENV || 'testnet'
) as NetworkId;

export const DEFAULT_MINTBASE_CONTRACT_TESTNET = 'mintspace2.testnet';

export const DEFAULT_MINTBASE_CONTRACT_MAINNET = 'mintbase1.near';

export const NEAR_WALLET_SELECTOR_DEBUG = NEAR_WALLET_ENV === 'testnet';

export const DEFAULT_MINTBASE_CONTRACT = NEAR_WALLET_ENV !== 'testnet'
  ? DEFAULT_MINTBASE_CONTRACT_TESTNET
  : DEFAULT_MINTBASE_CONTRACT_MAINNET;

export const NEAR_LOGIN_CONTRACT_ID = (
  process.env.NEAR_LOGIN_CONTRACT_ID || DEFAULT_MINTBASE_CONTRACT
);
