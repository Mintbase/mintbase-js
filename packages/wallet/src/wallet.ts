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

    return this.getAccounts()

 
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

      console.log({ accountId: urlParams?.accountId, publicKey: urlParams?.publicKey },this.getAccounts(), '{publickKey: publicKey, accountId: accountId, active: true}');

    return this.getAccounts();

    }
  }

  private _initializeWalletState({ accountId, publicKey }: { accountId: string; publicKey?: string }) {
    this._setActiveAccountId(accountId);

    window.localStorage.setItem('near-wallet-selector:selectedWalletId', JSON.stringify('mintbasewallet'));

    if (publicKey) {
      window.localStorage.setItem('mintbasewallet:account-data', JSON.stringify({ accountId, publicKey }));
    }

    this._clearQueryParams();

    console.log({ publickKey: publicKey, accountId: accountId, active: true },this.getAccounts(), '{publickKey: publicKey, accountId: accountId, active: true}');

    return this.getAccounts();

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

  private _clearQueryParams() {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('account_id');
    currentUrl.searchParams.delete('public_key');
    window.history.replaceState({}, document.title, currentUrl.toString());
  }
}
