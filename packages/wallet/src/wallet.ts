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

    console.log(newUrl, 'newUrl')

    // window.location.assign(newUrl.toString());

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


  // async transformTransactions(
  //   transactions: Array<Optional<Transaction, 'signerId'>>,
  // ) {
  //   const account = (await this.getAccounts())[0];
  //   const { networkId, signer, provider } = account.connection;

  //   const localKey = await signer.getPublicKey(account.accountId, networkId);

  //   return Promise.all(
  //     transactions.map(async (transaction, index) => {
  //       const actions = transaction.actions.map((action) =>
  //         createAction(action),
  //       );
  //       const accessKey = await account.accessKeyForTransaction(
  //         transaction.receiverId,
  //         actions,
  //         localKey,
  //       );

  //       if (!accessKey) {
  //         throw new Error(
  //           `Failed to find matching key for transaction sent to ${transaction.receiverId}`,
  //         );
  //       }

  //       const block = await provider.block({ finality: 'final' });

  //       return nearAPI.transactions.createTransaction(
  //         account.accountId,
  //         nearAPI.utils.PublicKey.from(accessKey.public_key),
  //         transaction.receiverId,
  //         accessKey.access_key.nonce + index + 1,
  //         actions,
  //         nearAPI.utils.serialize.base_decode(block.header.hash),
  //       );
  //     }),
  //   );
  // }


  async signAndSendTransactions({
    transactions,
  }: {
    transactions: Transaction[];
  }) {

    console.log(transactions, 'transactions')

    // throw new Error('Mintbase Wallet does not support signing and sending multiple transactions.');
    for (const { signerId } of transactions) {
      this.assertValidSigner(signerId);
    }

    for (const { actions, receiverId, signerId } of transactions) {
      await this.signAndSendTransaction({ receiverId, signerId, actions });
    }
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


  private reloaded = false;

  private async _clearQueryParams() {

    const currentUrl = new URL(window.location.href);


    function generateRandomHash() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const length = 32; // Adjust the length of the hash as needed
      let hash = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hash += characters.charAt(randomIndex);
      }

      return hash;
    }

    function forceRefresh() {
      // Append a timestamp or random value as a query parameter to the URL
      currentUrl.searchParams.set('session', generateRandomHash());

      // Navigate to the modified URL, triggering a forced refresh
      window.location.href = currentUrl.toString();
    }
    const hadRefreshed =  currentUrl.searchParams.get('session') &&  currentUrl.searchParams.get('session').length > 0;
    // Check if account data is already set in localStorage
    const accountData = window.localStorage.getItem('mintbasewallet:account-data') && window.localStorage.getItem('mintbasewallet:account-data').length > 0;
    if (accountData && !this.reloaded && !hadRefreshed) {
      this.reloaded = true; // Set the flag
 
      // forceRefresh(); // Trigger a single forced refresh
      console.log('here login  2')

      currentUrl.searchParams.delete('account_id');
      currentUrl.searchParams.delete('public_key');
      currentUrl.searchParams.delete('session');
    }

  }

}
