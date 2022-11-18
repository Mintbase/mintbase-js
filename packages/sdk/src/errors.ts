
const NO_SIGNING_METHOD_ERROR_MSG = `
  SDK Error: No signing method passed.
  Account or near/wallet-selector Wallet is required to sign transactions
`;

export class NoSigningMethodPassed extends Error {
  message: string;
}

export const NoSigningMethodPassedError = new NoSigningMethodPassed(
  NO_SIGNING_METHOD_ERROR_MSG,
);
