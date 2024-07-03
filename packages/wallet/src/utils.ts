/*
    Mintbase Wallet Utils file
*/

const checkCallbackUrl = (callbackUrl: string): string => {
  function isValidURL(url): boolean {
    const urlPattern = /^(https?|ftp|http?):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }

  if (callbackUrl !== null && callbackUrl.length > 0) {
    if (isValidURL(callbackUrl)) {
      if (
        callbackUrl.startsWith('https://') ||
        callbackUrl.startsWith('http://')
      ) {
        return callbackUrl.endsWith('/')
          ? callbackUrl.slice(0, -1)
          : callbackUrl;
      }
    } else {
      console.error(
        'callbackUrl set with wrong format. please use an URL with http:// or https:// instead.Further help available on our telegram channel: https://t.me/mintdev',
      );
      return new URL(window.location.href).toString();
    }
  } else {
    const globalCallBackUrl = localStorage.getItem(
      'mintbase-wallet:callback_url',
    );

    if (isValidURL(globalCallBackUrl)) {
      return globalCallBackUrl;
    } else {
      console.warn('We recommend you to set the callbackUrl property on setupMintbaseWallet  \n read more here:  \n https://docs.mintbase.xyz/dev/mintbase-sdk-ref/wallet#setupmintbasewallet  \n  \n further help available on our telegram channel:  \n https://t.me/mintdev');
      return new URL(window.location.href).toString();
    }
  }

  return new URL(window.location.href).toString();
};

const getCallbackUrl = (callbackUrl?: string): { cbUrl: string } | null => {
  if (typeof window !== undefined) {

    let mbjsCallbackUrl =  '';

    if ( window?.['mbjs']?.keys?.callbackUrl && window?.['mbjs']?.keys?.callbackUrl.length > 0  ) {
      mbjsCallbackUrl = window?.['mbjs']?.keys?.callbackUrl;
    }

    const globalCBUrl =  localStorage?.getItem('mintbase-wallet:callback_url') || mbjsCallbackUrl;

    // it gets always the passed callBackUrl first, if not check for the one on the Wallet Setup or mbjs.keys.callbackUrl
    const finalcbURL = callbackUrl ?? globalCBUrl;

    const callBackUrlRes = checkCallbackUrl(finalcbURL);

    // check if callBackUrl sent on the method is valid
    // method callbackUrl will always have priority over global callbackUrl , user can set different callbackUrls according to the method..

    return { cbUrl: callBackUrlRes };
  }
  return null;
};

const resolveWalletUrl = (network: string, walletUrl?: string): string  => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network) {
  case 'mainnet':
    return 'https://wallet.mintbase.xyz';
  case 'testnet':
    return 'https://testnet.wallet.mintbase.xyz/';
  default:
    throw new Error('Invalid wallet url');
  }
};

const resolveBitteWallet = (network: string, walletUrl?: string): string  => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network) {
  case 'mainnet':
    return 'https://wallet.bitte.ai';
  case 'testnet':
    return 'https://testnet.wallet.bitte.ai/';
  default:
    throw new Error('Invalid wallet url');
  }
};

export { checkCallbackUrl, getCallbackUrl, resolveBitteWallet, resolveWalletUrl };

