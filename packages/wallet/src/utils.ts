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
      console.error(
        'please set your callbackUrl property on setupMintbaseWallet - further help available on our telegram channel: https://t.me/mintdev',
      );
      return new URL(window.location.href).toString();
    }
  }

  return new URL(window.location.href).toString();
};

const getCallbackUrl = (callbackUrl?: string): { cbUrl: string } | null => {
  if (typeof window !== undefined) {

    const mbjsCallbackUrl = window?.['mbjs']?.keys.callbackUrl ? window?.['mbjs']?.keys.callbackUrl  : '';

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

export { checkCallbackUrl, getCallbackUrl };
