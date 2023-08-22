import * as nearAPI from 'near-api-js';
import { networks } from './networks';

import { Action, Transaction } from '@near-wallet-selector/core';
import BN from 'bn.js';

export class MintbaseWallet {
  networkId: string;
  signInContractId: string;
  activeAccountId?: string;
  keyStore: nearAPI.keyStores.BrowserLocalStorageKeyStore;
  near: nearAPI.Near;
  relayerUrl: string;
  walletUrl: string;
  constructor({
    signInContractId,
    networkId,
    relayerUrl,
    walletUrl,
  }: {
    signInContractId: string;
    networkId: 'testnet' | 'mainnet';
    relayerUrl: string;
    walletUrl: string;
  }) {
    this.networkId = networkId;
    this.signInContractId = signInContractId;

    this._setupWalletState();

    this.keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

    this.near = new nearAPI.Near({
      ...networks[networkId],
      deps: { keyStore: this.keyStore },
    });

    this.relayerUrl = relayerUrl;
    this.walletUrl = walletUrl;
  }

  getContractId() {
    return this.signInContractId;
  }

  getAccountId() {
    return this.activeAccountId;
  }

  async isSignedIn() {
    return !!this.activeAccountId;
  }

  async signIn() {
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(`${this.walletUrl}/connect`);
    newUrl.searchParams.set('success_url', currentUrl.href);
    newUrl.searchParams.set('failure_url', currentUrl.href);

    window.location.assign(newUrl.toString());
  }

  async signOut() {
    if (this.activeAccountId === undefined || this.activeAccountId === null) {
      throw new Error('Wallet is already signed out');
    }

    await this.keyStore.removeKey(this.networkId, this.activeAccountId);
    window.localStorage.removeItem('mintbasewallet:activeAccountId');
    window.localStorage.removeItem('mintbasewallet:account-data');
  }

  assertValidSigner(signerId: string) {
    if (signerId && signerId !== this.activeAccountId) {
      throw new Error(
        `Cannot sign transactions for ${signerId} while signed in as ${this.activeAccountId}`,
      );
    }
  }

  async signAndSendTransaction({
    receiverId,
    actions,
    signerId,
    successUrl,
    failureUrl,
  }: {
    receiverId: string;
    actions: Action[];
    signerId: string;
    successUrl?: string;
    failureUrl?: string;
  }) {
    this.assertValidSigner(signerId);

    const stringifiedParam = JSON.stringify([{ receiverId, signerId, actions }]);

    const urlParam = encodeURIComponent(stringifiedParam);

    const currentUrl = new URL(window.location.href);

    const newUrl = new URL(`${this.walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);
    newUrl.searchParams.set('success_url', successUrl || currentUrl.toString());
    newUrl.searchParams.set('failure_url', failureUrl || currentUrl.toString());
    window.location.assign(newUrl.toString());

    // const account = (await this.getAccounts())[0];

    // const signedDelegate = await account.signedDelegate({
    //   actions: actions.map((action) => createAction(action)),
    //   blockHeightTtl: 60,
    //   receiverId,
    // });

    // await fetch(this.relayerUrl, {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(Array.from(encodeSignedDelegate(signedDelegate))),
    //   headers: new Headers({ "Content-Type": "application/json" }),
    // });
  }

  async signAndSendTransactions({
    transactions,
  }: {
    transactions: Transaction[];
  }) {

    throw new Error('Mintbase Wallet does not support signing and sending multiple transactions.');

    // TODO: support multiple transactions in the future
    // for (let { signerId } of transactions) {
    //   this.assertValidSigner(signerId);
    // }

    // for (let { actions, receiverId, signerId } of transactions) {
    //   await this.signAndSendTransaction({ receiverId, signerId, actions });
    // }
  }

  showModal = () => {
    // unused
  };

  async verifyOwner() {
    throw Error('mintbasewallet:verifyOwner is unsupported!');
  }

  async getAvailableBalance() {
    return new BN(0);
  }

  async getAccounts() {
    if (this.activeAccountId !== undefined && this.activeAccountId !== null) {
      const accountObj = new nearAPI.Account(
        this.near.connection,
        this.activeAccountId,
      );
      return [accountObj];
    }

    return [];
  }

  async switchAccount(id: string) {
    this._setActiveAccountId(id);
  }

  private _setupWalletState() {
    const urlParams = this._getQueryParams();

    if (Object.keys(urlParams).length === 0) {
      const accountId = window.localStorage.getItem('mintbasewallet:activeAccountId');

      if (accountId) {
        this._initializeWalletState({ accountId });

        return [{ accountId: accountId, active:true }];
      }
   
    }

    if (urlParams?.accountId) {
      this._initializeWalletState({ accountId: urlParams?.accountId, publicKey: urlParams?.publicKey || '' });

      console.log({ accountId: urlParams?.accountId, publicKey: urlParams?.publicKey }, '{publickKey: publicKey, accountId: accountId, active: true}');

      return [{ accountId: urlParams?.accountId, publicKey: urlParams?.publicKey }];

    }
  }

  private _initializeWalletState({ accountId, publicKey }: { accountId: string; publicKey?: string }) {
    this._setActiveAccountId(accountId);

    window.localStorage.setItem('near-wallet-selector:selectedWalletId', JSON.stringify('mintbasewallet'));

    if (publicKey) {
      const usernameSet = new CustomEvent('mbWalletLogin', { detail: [{ publickKey: publicKey, accountId: accountId, active: true }] });

      window.dispatchEvent(usernameSet);


      window.localStorage.setItem('mintbasewallet:account-data', JSON.stringify({ accountId, publicKey }));
    }

    this._clearQueryParams();


    return [{ publickKey: publicKey, accountId: accountId, active: true }];

  }

  private _setActiveAccountId(accountId: string) {
    this.activeAccountId = accountId;
    window.localStorage.setItem('mintbasewallet:activeAccountId', accountId);
  }

  private _getQueryParams(): Record<string, string> {
    const currentUrl = new URL(window.location.href);
    const accountId = currentUrl.searchParams.get('account_id') || '';
    const publicKey = currentUrl.searchParams.get('public_key') || '';

    if (!accountId || !publicKey) {
      return {};
    }

    return {
      accountId,
      publicKey,
    };
  }
    private loadingElement: HTMLDivElement | null = null;


    private createLoadingElement(): void {
    // Create the loading element
      this.loadingElement = document.createElement('div');
      this.loadingElement.className = 'centeredLoading';

      const ellipsisContainer = document.createElement('div');
      ellipsisContainer.className = 'lds-ellipsis';

      for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.style.animation = `0.6s infinite`;
        ellipsisContainer.appendChild(dot);
      }

      this.loadingElement.appendChild(ellipsisContainer);
    }

    private showLoadingAnimation(): void {
      if (!this.loadingElement) {
        this.createLoadingElement();
      }
      document.body.appendChild(this.loadingElement);
    }

    private hideLoadingAnimation(): void {
      const centeredDiv = document.querySelector('.centeredLoading'); // Find the div with the class "centered"
      if (centeredDiv && centeredDiv.parentNode) {
        centeredDiv.parentNode.removeChild(centeredDiv); // Remove the parent div
      }
    }

    private injectKeyframeAnimations(): void {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
      .centeredLoading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position:fixed;
        top:0px;
        left:0px;
        width:100vw;
        background:#fff;
        z-index: 999;
      }

      .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }


      .lds-ellipsis div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #ff2424;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }

      .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
      }

      .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
      }

      .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
      }

      .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
      }

         @keyframes lds-ellipsis1 {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes lds-ellipsis2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(24px, 0);
        }
      }

      @keyframes lds-ellipsis3 {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }

      
    `;
      document.head.appendChild(styleTag);
    }

  private reloaded = false;

  private async _clearQueryParams() {

    const currentUrl = new URL(window.location.href);


    function forceRefresh() {
      // Append a timestamp or random value as a query parameter to the URL
      currentUrl.searchParams.set('session', String(Math.random())); // Convert the random number to a string

      // Navigate to the modified URL, triggering a forced refresh
      window.location.href = currentUrl.toString();
    }
    const hadRefreshed =  currentUrl.searchParams.get('session') &&  currentUrl.searchParams.get('session').length > 0;
    // Check if account data is already set in localStorage
    const accountData = window.localStorage.getItem('mintbasewallet:account-data') && window.localStorage.getItem('mintbasewallet:account-data').length > 0;
    if (accountData && !this.reloaded && !hadRefreshed) {
      this.reloaded = true; // Set the flag
 
      forceRefresh(); // Trigger a single forced refresh
  

      currentUrl.searchParams.delete('account_id');
      currentUrl.searchParams.delete('public_key');
      currentUrl.searchParams.delete('session');
    }

      
  }

}
