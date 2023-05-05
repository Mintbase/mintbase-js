export * from './account';
export * from './wallet';
export * from './constants';
export * from './session';

// this is done to avoid importing near-api-js more than once
// which leads to a strange, but known issue
// https://docs.near.org/tools/near-api-js/faq#class-x-is-missing-in-schema-publickey
export { Account, providers, connect as connectToNear, KeyPair } from 'near-api-js';
export { InMemoryKeyStore, KeyStore } from 'near-api-js/lib/key_stores';

// adding some other types from within libraries as a convenience
export { FinalExecutionOutcome } from '@near-wallet-selector/core';
