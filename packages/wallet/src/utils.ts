/* 
    Mintbase Wallet Utils file
*/

const checkCallbackUrl = (callbackUrl: string): string | boolean => {

  function isValidURL(url): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }

  if (callbackUrl !== null && callbackUrl.length > 0) { 

    if (isValidURL(callbackUrl)) {
      if (callbackUrl.startsWith('https://') || callbackUrl.startsWith('http://')) {
        return callbackUrl;
      } 
    } else {
      console.error('callbackUrl set with wrong format. please use an URL with http:// or https:// instead.Further help available on our telegram channel: https://t.me/mintdev');
      return false;
    }
  } else {
    console.info('please set your callbackUrl property on setupMintbaseWallet - further help available on our telegram channel: https://t.me/mintdev');
    return false;
  }

  return false;

};

const getCallbackUrl = (callbackUrl?: string):  {cbUrl: string} | null => {
  const currentUrl = new URL(window.location.href);
  if (typeof window !== undefined) { 
    const isValidCallbackUrl = checkCallbackUrl(callbackUrl);
 
    // check if callBackUrl sent on the method is valid
    // method callbackUrl will always have priority over global callbackUrl , user can set different callbackUrls according to the method..

    if (!isValidCallbackUrl) {
      const storedCallbackUrl =  localStorage.getItem('mintbase-wallet_callback_url');
      const cbUrl = checkCallbackUrl(storedCallbackUrl);

      if (typeof cbUrl === 'string') {
        return { cbUrl : storedCallbackUrl }; 
      } else {
        return { cbUrl : currentUrl.toString() }; 
      }
    }
  }
  
  return null;

};


export { checkCallbackUrl, getCallbackUrl };
