// this util has been implemented because NEAR API JS stills on v2.1.3 on near-wallet-selector

import * as nearAPI from 'near-api-js';

const LOGIN_WALLET_URL_SUFFIX = '/login/';
const PENDING_ACCESS_KEY_PREFIX = 'pending_key';

interface SignInOptions {
  contractId?: string;
  methodNames?: string[];
  // TODO: Replace following with single callbackUrl
  successUrl?: string;
  failureUrl?: string;
}


export  async  function requestSignInUrl({ contractId, methodNames, successUrl, failureUrl }: SignInOptions): Promise<string> {
  const currentUrl = new URL(window.location.href);
  const newUrl = new URL(this._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX);
  newUrl.searchParams.set('success_url', successUrl || currentUrl.href);
  newUrl.searchParams.set('failure_url', failureUrl || currentUrl.href);
  if (contractId) {
    /* Throws exception if contract account does not exist */
    const contractAccount = await this._near.account(contractId);
    await contractAccount.state();

    const { KeyPair } = nearAPI;

    newUrl.searchParams.set('contract_id', contractId);
    const accessKey = KeyPair.fromRandom('ed25519');
    newUrl.searchParams.set('public_key', accessKey.getPublicKey().toString());
    await this._keyStore.setKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(), accessKey);
  }

  if (methodNames) {
    methodNames.forEach(methodName => {
      newUrl.searchParams.append('methodNames', methodName);
    });
  }

  return newUrl.toString();
}


export async function requestSignIn(options: SignInOptions): Promise<void> {
  const url = await requestSignInUrl(options);

  window.location.assign(url);
}
