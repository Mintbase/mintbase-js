import * as nearAPI from 'near-api-js';

import BN from 'bn.js';
import type {
  Action,
  BrowserWallet,
  Transaction,
  WalletBehaviourFactory,
} from '@near-wallet-selector/core';

interface MintbaseWalletState {
  wallet: nearAPI.WalletConnection;
}

export const MintbaseWallet: WalletBehaviourFactory<
  BrowserWallet,
  { walletUrl: string; networkId: string; callback: string; successUrl?: string; failureUrl?: string }
> = async ({
  metadata,
  options,
  store,
  logger,
  emitter,
  walletUrl,
  successUrl,
  failureUrl,
  callback,
  networkId,
}) => {
  const setupWalletState = async (): Promise<MintbaseWalletState> => {

    if (typeof window !== undefined) {
      const { connect, WalletConnection, keyStores } = nearAPI;

      const connectionConfig = {
        networkId: networkId,
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: walletUrl,
        headers: {},
      };

      const searchParams = new URL(window.location.href);

      const acc = searchParams.searchParams.get('account_id');

      if (acc && acc?.length > 0) {
        localStorage.setItem('mintbase-wallet_callback_url', callback);

        localStorage.setItem(
          'mintbase-wallet_wallet_auth_key',
          JSON.stringify({
            accountId: acc as string,
            allKeys: [],
          }),
        );
      }

      const nearConnection = await connect(connectionConfig);

      const wallet = new WalletConnection(nearConnection, 'mintbase-wallet');

      return {
        wallet,
      };

    }
  
  };

  const state = await setupWalletState();

  let activeAccountId: string;

  const getAccountId = ():  string => activeAccountId;

  const isSignedIn = async (): Promise<boolean> => !!activeAccountId;

  const signIn = async () => {
    const existingAccounts = await getAccounts();

    const origin = window.location.origin;

    if (existingAccounts.length) {
      return existingAccounts;
    }

    await state.wallet.requestSignIn({
      methodNames: [],
      successUrl: successUrl ?? origin,
      failureUrl: failureUrl ?? origin,
    });

    return getAccounts();
  };

  const signOut = async () => {
    // if (activeAccountId === undefined || activeAccountId === null) {
    //   throw new Error("Wallet is already signed out");
    // }

    window.localStorage.removeItem('mintbase-wallet:account-data');

    if (state.wallet.isSignedIn()) {
      state.wallet.signOut();
    }
  };

  const assertValidSigner = (signerId: string) => {
    if (signerId && signerId !== state.wallet.getAccountId()) {
      throw new Error(
        `Cannot sign transactions for ${signerId} while signed in as ${activeAccountId}`,
      );
    }
  };

  const signAndSendTransactions = async ({
    transactions,
    callbackUrl,
  }: {
    transactions: Array<Transaction>;
    callbackUrl: string;
  }): Promise<void> => {
    // throw new Error(
    //   "Mintbase Wallet does not support signing and sending multiple transactions."
    // );

    for (const { signerId } of transactions) {
      assertValidSigner(signerId);
    }
    const stringifiedParam = JSON.stringify(transactions);

    const urlParam = encodeURIComponent(stringifiedParam);
    //const currentUrl = new URL(window.location.href);
    const newUrl = new URL(`${walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);
    newUrl.searchParams.set('callback_url', callbackUrl);

    window.location.assign(newUrl.toString());
    return;
  };

  const signAndSendTransaction = ({
    receiverId,
    actions,
    signerId,
    successUrl,
    failureUrl,
    callbackUrl,
  }: {
    receiverId: string;
    actions: Array<Action>;
    signerId: string;
    successUrl: string;
    failureUrl: string;
    callbackUrl: string;
  }): Promise<void> => {
    assertValidSigner(signerId);

    const stringifiedParam = JSON.stringify([{ receiverId, signerId, actions }]);

    const urlParam = encodeURIComponent(stringifiedParam);

    const currentUrl = new URL(window.location.href);

    const newUrl = new URL(`${walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);

    if (!callbackUrl) {
      if (successUrl && successUrl.length > 0) {
        newUrl.searchParams.set(
          'success_url',
          successUrl || currentUrl.toString(),
        );
      }

      if (failureUrl && failureUrl.length > 0) {
        newUrl.searchParams.set(
          'success_url',
          failureUrl || currentUrl.toString(),
        );
      }
    }

    newUrl.searchParams.set(
      'callback_url',
      callbackUrl || currentUrl.toString(),
    );

    window.location.assign(newUrl.toString());
    return;
  };

  const showModal = () => {
    // unused
  };

  const verifyOwner = async () => {
    throw Error('mintbasewallet:verifyOwner is unsupported!');
  };

  const getAvailableBalance = async () => {
    return new BN(0);
  };

  const getAccounts = async () => {
    const accountId = state.wallet.getAccountId();
    const account = state.wallet.account();

    if (!accountId || !account) {
      return [];
    }

    const currentAccount: string = window.localStorage.getItem(
      'mintbase-wallet:account-creation-data',
    )!;

    return [
      {
        accountId,
        publicKey: JSON.parse(currentAccount)?.devicePublicKey,
      },
    ];
  };

  const switchAccount = async (id: string) => {
    //TODO fix
    setActiveAccountId(id);
  };

  const setActiveAccountId = (accountId: string) => {
    activeAccountId = accountId;
    window.localStorage.setItem('mintbase-wallet:activeAccountId', accountId);
  };

  return {
    getAccountId,
    isSignedIn,
    signIn,
    signOut,
    signAndSendTransaction,
    showModal,
    verifyOwner,
    getAvailableBalance,
    getAccounts,
    switchAccount,
    signAndSendTransactions,
  };
};
