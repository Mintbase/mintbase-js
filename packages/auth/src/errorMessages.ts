import { WALLET_CONNECTION_TIMEOUT } from './constants';

// error messages
const SUPPORT = '- further help available on our telegram channel: https://t.me/mintdev';

export const ERROR_MESSAGES =  { 
  WALLET_SETUP_NOT_CALLED_ERROR : `Call and await setupWalletSelectorComponents() before registering a subscriber - ${SUPPORT}`,
  WALLET_CONNECTION_NOT_FOUND:  `Wallet connection not received after ${WALLET_CONNECTION_TIMEOUT}ms - ${SUPPORT}`,
};
