import BN from 'bn.js';
import { FtAddresses, USDC_ADDRESS, USDT_ADDRESS } from './types';

export const GAS = '200000000000000';
export const MAX_GAS = '300000000000000';
export const ONE_YOCTO = '1';
export const TOKEN_CONTRACT_SPEC = 'nft-1.0.0';
// TODO: This should be reduced to 3.5 NEAR once the new factory/stores
// are deployed to mainnet.
export const CONTRACT_DEPOSIT = `6500000${'0'.repeat(18)}`; // 6.5 NEAR
export const LISTING_DEPOSIT = `1000${'0'.repeat(18)}`; // 1 milliNEAR

export const GAS_CONSTANTS = {
  DEFAULT_GAS: '200000000000000',
  OPTIMAL_GAS: '225000000000000',
  MAX_GAS: '300000000000000',
};

export const DEPOSIT_CONSTANTS = {
  ONE_YOCTO: '1',
  ZERO_YOCTO: '0',
  LEGACY_LISTING: `4400${'0'.repeat(18)}`, // 440 bytes, 4.4 milliNEAR
};

export const STORAGE_BYTES = {
  COMMON: 80, // one royalty owner, one split owner, or one approval
  TOKEN_BASE: 440,
  MINTING_BASE: 92,
  MINTING_FEE: 100, // minting fee of 1 milliNEAR expressed as bytes
};

// currently 19, meaning that 1 bytes costs 1e19 yoctoNEAR
export const STORAGE_PRICE_PER_BYTE_EXPONENT = 19;

export const multipleTokensLegacyListing = (tokenLength: number): string => new BN(DEPOSIT_CONSTANTS.LEGACY_LISTING).mul(new BN(tokenLength)).toString();

export const DEFAULT_MB_LOGO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEXUlEQVRYR8VXW4hVVRj+vrX3OYbFNBl2eSsoa8pkxMJmzpGGoIwMY0wwImuCXmKKkiikKayHQIpAwbdAswskBYqJSlANek7TUOPURGKCWdmFkJnsoZnhzNn/F2vcZ9gez2UfEVoP+2Gv///Xt771X4mUq6enpz2Kogck3S2pk+R1ki736iT/kfQzyW/N7PNsNrtvcHDwTBrTbCbU1dV1cxiGGyWtA3BJM/l4f1rSLjPbPDQ0dKyRTl0AS5YsubStre11AP0AwiYHi+SJmJGFCdmypG3T09MDIyMjk7Vs1ASQy+VuIrkbQEezG3vqJfXGTzHhnFtlZttIuoTuUQC9hULheLW98wDkcrnbARwkeWWzw+P9ewCsB/AYgBkz6yW5lmRfUl/SOMmVhUJhJPn/HAD+5gCKLRzubS0AMO59MTa828z2Oud2VF8gBtGdZGIOQPzmX6ehPWk4iqKOIAg+BnCr/y/pJUmnnHPv1WHw6NTU1B0Vn5gDkM/ntwB4NiXtc2KS9kdR1B+G4aMA/pD0kaQHGwDwILcUi8UNs37jPz7UgiD4PoW318Qn6QSA/STbJc2T9EkjAAB8dCwuFos/zgLI5/M7YydqlYBa8vvMbFcTAJ6FncVisY/5fP4KT10LSaYZyFQAAEyHYXitB+BD6N1mVlvYTwsAZraeuVxuR3XMNjpM0mFJW0n+VUfub0mnSS6S5JxznQBeBpDMkBXV7R7AKEkv1HRJGiLpvX0rgHYzGyB5S5yuZ/VJHioUCv25XO4Vn/0AHDCzD51z35DMViWnUf8EEwC8H6RZj5O8Py5M3pF+D4JghZn9lFDeB+AtAF9U/vmw9CBJ3lt1yIQHYIks1gzEapJPSlodJ53xcrncmclkTiUOOwRgM8n9iX8Pk/S+tqqKAWsZgJmddM6971kzs+f9W5P0VbOyZmZmZjyo5yStcc4djKJoE8kxkvNrAWjlCVZLugHAYefcpJmtIzkAIKii7ldJL5jZkTAMF0t6A8CNNeidaMkJAXjqNwLobvZWafYljbYahhcVAIDtrSaiiwpgNhGlSMVjAI5J8m3Xm3FILapD8UKSd9XwiVriZ1Ox36lXjCRtMLPPwjC8s1QqHRgeHv6tu7v7IefcNYkQG8tkMqPlcnmNrylm9q9z7lMAlzXyg7li5IXqlOOvADwN4EsAPoOdLpVKHdlsdm/SCUku8/UdwIo4NzxF8noALzYAcG45jlmobkjelnTc014xRPI+Sa8BWJ4w7lsyH8qVtUfSHpLv1ANwXkPiBWu0ZEeiKOoLgsAzMd+nXTNb7pz7geTsQBLfuIvkqwBWnu3I9ASAZSSfqQOgdkvmhaubUpKboij6IAiCpSSH/aAB4JEqw9+VSqXeTCZzm6Q/nXNXA/A94rxqAA2b0opwjbb8JADfzy8FcFWdW01K8kwtqFdZU7XlCRCpB5M0GQ9A+sGkYrDF0awejgsbzZLW/rfhtPpKTcbzM5J+uZDx/D8+0FUx/4DhyAAAAABJRU5ErkJggg==';
export const DEFAULT_MB_BASE_URI = 'https://arweave.net';

export const DEPOSIT_FOR_BURN = ONE_YOCTO;
export const GAS_FOR_BURN = GAS;
export const DEPOSIT_FOR_TRANSFER = ONE_YOCTO;
// TODO: make this more accurate someday.
export const GAS_FOR_TRANSFER = GAS;

export const FT_ADDRESSES: { testnet: FtAddresses; mainnet: FtAddresses } = {
  testnet: {
    usdc: USDC_ADDRESS.testnet,
    usdt: USDT_ADDRESS.testnet,
  },
  mainnet: {
    usdc: USDC_ADDRESS.mainnet,
    usdt: USDT_ADDRESS.mainnet,
  },
};
