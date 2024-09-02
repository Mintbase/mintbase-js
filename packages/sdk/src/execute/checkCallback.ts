import { Wallet } from '@near-wallet-selector/core';

type Environment = 'client' | 'server';

const getEnvironment = (): Environment => {
  if (typeof window !== 'undefined') {
    return 'client';
  } else {
    return 'server';
  }
};

const currentEnv: Environment = getEnvironment();


export const callbackSideCheck = (
  callbackUrl: string | undefined,
  wallet: Wallet,
): string => {
  let callbackFinal = callbackUrl;

  if (currentEnv === 'client') {
    const shouldGetFromMbjs = callbackUrl?.length < 1 || callbackUrl === undefined &&
      window?.['mbjs']?.callbackUrl && window?.['mbjs']?.callbackUrl.length > 0;

    if (wallet?.id == 'mintbase-wallet' || wallet?.id == 'bitte-wallet') {
      if (callbackUrl?.length < 1 || callbackUrl === undefined) {
        let mbjsCallbackUrl = '';

        if (
        window?.['mbjs']?.callbackUrl &&
        window?.['mbjs']?.callbackUrl.length > 0
        ) {
          mbjsCallbackUrl = window?.['mbjs']?.callbackUrl;
        }

        const globalCBUrl =
        localStorage?.getItem('mintbase-wallet:callback_url') || mbjsCallbackUrl;

        callbackFinal = globalCBUrl;
      }
    }

    if (shouldGetFromMbjs) {
      callbackFinal = window?.['mbjs']?.callbackUrl || '';
    }
  }

  // Return the final callback URL.
  return callbackFinal;
};


