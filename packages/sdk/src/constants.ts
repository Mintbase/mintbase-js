export const GAS = '200000000000000';
export const MAX_GAS = '300000000000000';
export const ONE_YOCTO = '1';

export const TOKEN_METHOD_NAMES = {
  TRANSFER: 'nft_transfer',
  BATCH_TRANSFER: 'nft_batch_transfer',
  BATCH_BURN: 'nft_batch_burn',
  DEPLOY_TOKEN_CONTRACT: 'create_store',
  TRANSFER_TOKEN_CONTRACT_OWNERSHIP: 'transfer_store_ownership',
  MINT: 'nft_batch_mint',
  ADD_MINTER: 'grant_minter',
  REMOVE_MINTER: 'revoke_minter',
  BATCH_CHANGE_MINTERS: 'batch_change_minters',
  TOKEN_ACCOUNT_REVOKE: 'nft_revoke',
  TOKEN_ACCOUNT_REVOKE_ALL: 'nft_revoke_all',
};

export const MARKET_METHOD_NAMES = {
  LIST: 'nft_approve',
  DEPOSIT_STORAGE: 'deposit_storage',
  BUY: 'buy',
};

export const GAS_CONSTANTS = {
  DEFAULT_GAS: '200000000000000',
  OPTIMAL_GAS: '225000000000000',
  MAX_GAS: '300000000000000',
};

export const DEPOSIT_CONSTANTS = {
  ONE_YOCTO: '1',
  ZERO_YOCTO: '0',
};

export const Network = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
};

export const NEAR_NETWORK =
  process.env.NEAR_NETWORK || globalThis?.localStorage?.getItem('NEAR_NETWORK') || Network.MAINNET;

export const MB_MAINNET_TOKEN_FACTORY_ADDRESS = 'mintbase1.near';
export const MB_TESTNET_TOKEN_FACTORY_ADDRESS = 'mintspace2.testnet';

export const MB_TOKEN_FACTORY_ADDRESS =
  NEAR_NETWORK === Network.MAINNET ? MB_MAINNET_TOKEN_FACTORY_ADDRESS : MB_TESTNET_TOKEN_FACTORY_ADDRESS;

export const DEFAULT_MB_LOGO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEXUlEQVRYR8VXW4hVVRj+vrX3OYbFNBl2eSsoa8pkxMJmzpGGoIwMY0wwImuCXmKKkiikKayHQIpAwbdAswskBYqJSlANek7TUOPURGKCWdmFkJnsoZnhzNn/F2vcZ9gez2UfEVoP+2Gv///Xt771X4mUq6enpz2Kogck3S2pk+R1ki736iT/kfQzyW/N7PNsNrtvcHDwTBrTbCbU1dV1cxiGGyWtA3BJM/l4f1rSLjPbPDQ0dKyRTl0AS5YsubStre11AP0AwiYHi+SJmJGFCdmypG3T09MDIyMjk7Vs1ASQy+VuIrkbQEezG3vqJfXGTzHhnFtlZttIuoTuUQC9hULheLW98wDkcrnbARwkeWWzw+P9ewCsB/AYgBkz6yW5lmRfUl/SOMmVhUJhJPn/HAD+5gCKLRzubS0AMO59MTa828z2Oud2VF8gBtGdZGIOQPzmX6ehPWk4iqKOIAg+BnCr/y/pJUmnnHPv1WHw6NTU1B0Vn5gDkM/ntwB4NiXtc2KS9kdR1B+G4aMA/pD0kaQHGwDwILcUi8UNs37jPz7UgiD4PoW318Qn6QSA/STbJc2T9EkjAAB8dCwuFos/zgLI5/M7YydqlYBa8vvMbFcTAJ6FncVisY/5fP4KT10LSaYZyFQAAEyHYXitB+BD6N1mVlvYTwsAZraeuVxuR3XMNjpM0mFJW0n+VUfub0mnSS6S5JxznQBeBpDMkBXV7R7AKEkv1HRJGiLpvX0rgHYzGyB5S5yuZ/VJHioUCv25XO4Vn/0AHDCzD51z35DMViWnUf8EEwC8H6RZj5O8Py5M3pF+D4JghZn9lFDeB+AtAF9U/vmw9CBJ3lt1yIQHYIks1gzEapJPSlodJ53xcrncmclkTiUOOwRgM8n9iX8Pk/S+tqqKAWsZgJmddM6971kzs+f9W5P0VbOyZmZmZjyo5yStcc4djKJoE8kxkvNrAWjlCVZLugHAYefcpJmtIzkAIKii7ldJL5jZkTAMF0t6A8CNNeidaMkJAXjqNwLobvZWafYljbYahhcVAIDtrSaiiwpgNhGlSMVjAI5J8m3Xm3FILapD8UKSd9XwiVriZ1Ox36lXjCRtMLPPwjC8s1QqHRgeHv6tu7v7IefcNYkQG8tkMqPlcnmNrylm9q9z7lMAlzXyg7li5IXqlOOvADwN4EsAPoOdLpVKHdlsdm/SCUku8/UdwIo4NzxF8noALzYAcG45jlmobkjelnTc014xRPI+Sa8BWJ4w7lsyH8qVtUfSHpLv1ANwXkPiBWu0ZEeiKOoLgsAzMd+nXTNb7pz7geTsQBLfuIvkqwBWnu3I9ASAZSSfqQOgdkvmhaubUpKboij6IAiCpSSH/aAB4JEqw9+VSqXeTCZzm6Q/nXNXA/A94rxqAA2b0opwjbb8JADfzy8FcFWdW01K8kwtqFdZU7XlCRCpB5M0GQ9A+sGkYrDF0awejgsbzZLW/rfhtPpKTcbzM5J+uZDx/D8+0FUx/4DhyAAAAABJRU5ErkJggg==';
