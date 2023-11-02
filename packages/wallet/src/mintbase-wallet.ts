import * as nearAPI from 'near-api-js';

import BN from 'bn.js';
import type {
  Action,
  BrowserWallet,
  Transaction,
  WalletBehaviourFactory,
} from '@near-wallet-selector/core';
import { getCallbackUrl } from './utils';

export enum TransactionSuccessEnum {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  DEPLOY_STORE = 'deploy-store',
  MAKE_OFFER = 'make-offer',
  REVOKE_MINTER = 'revoke-minter',
  ADD_MINTER = 'add-minter',
  TRANSFER_STORE_OWNERSHIP = 'transfer-store-ownership',
  AUCTION_LIST = 'list',
  SIMPLE_SALE_LIST = 'simple-sale-list',
  UNLIST = 'unlist',
  TAKE_OFFER = 'take-offer',
  WITHDRAW_OFFER = 'withdraw-offer',
}

interface MintbaseWalletState {
  wallet: nearAPI.WalletConnection;
}

interface MintbaseWalletAccount {
  accountId: string;
  publicKey: string;
}

export type CallBackArgs = {
  args: object;
  type: TransactionSuccessEnum;
}

export const MintbaseWallet: WalletBehaviourFactory<
  BrowserWallet,
  {
    walletUrl: string;
    networkId: string;
    callback: string;
    successUrl?: string;
    failureUrl?: string;
  }
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
  const setupWalletState = async (): Promise<MintbaseWalletState> | null => {
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
        localStorage.setItem('mintbase-wallet:callback_url', callback);

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

    return null;
  };

  const state = await setupWalletState();

  let activeAccountId: string;

  const getAccountId = (): string => activeAccountId;

  const isSignedIn = async (): Promise<boolean> => !!activeAccountId;

  const signIn = async (): Promise<MintbaseWalletAccount[]> => {
    const existingAccounts = await getAccounts();

    const origin = window.location.origin;

    const callBackUrl = localStorage?.getItem('mintbase-wallet:callback_url');

    if (existingAccounts.length) {
      return existingAccounts;
    }

    await state.wallet.requestSignIn({
      methodNames: [],
      successUrl: callBackUrl ?? origin,
      failureUrl: callBackUrl ?? origin,
    });

    return getAccounts();
  };

  const signOut = async (): Promise<void> => {
    window.localStorage.removeItem('mintbase-wallet:account-data');

    if (state.wallet.isSignedIn()) {
      state.wallet.signOut();
    }

    return;
  };

  const assertValidSigner = (signerId: string): void => {
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
    callbackUrl?: string;
  }): Promise<void> => {
    const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    // fix txn length issue
    // if (transactions?.length > 10) {
    // }

    for (const { signerId } of transactions) {
      assertValidSigner(signerId);
    }
    const stringifiedParam = JSON.stringify(transactions);

    const urlParam = encodeURIComponent(stringifiedParam);
    const newUrl = new URL(`${walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);
    newUrl.searchParams.set('callback_url', cbUrl);

    window.location.assign(newUrl.toString());
    return;
  };

  const signAndSendTransaction = ({
    receiverId,
    actions,
    signerId,
    callbackUrl,
  }: {
    receiverId: string;
    actions: Array<Action>;
    signerId: string;
    callbackUrl: string;
  }): Promise<void> => {
    assertValidSigner(signerId);

    const stringifiedParam = JSON.stringify([{ receiverId, signerId, actions }]);

    const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    const urlParam = encodeURIComponent(stringifiedParam);

    const currentUrl = new URL(window.location.href);

    const newUrl = new URL(`${walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);

    if (successUrl) {
      if (successUrl && successUrl.length > 0) {
        newUrl.searchParams.set(
          'success_url',
          successUrl || currentUrl.toString(),
        );
      }
    }

    newUrl.searchParams.set('callback_url', cbUrl);

    window.location.assign(newUrl.toString());
    return;
  };

  const verifyOwner = async (): Promise<void> => {
    console.error('mintbasewallet:verifyOwner is unsupported!');

    return;
  };

  const getAvailableBalance = async (): Promise<BN> => {
    return new BN(0);
  };

  const getAccounts = async (): Promise<MintbaseWalletAccount[]> => {
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

  const switchAccount = async (id: string): Promise<null> => {
    //TODO fix
    setActiveAccountId(id);

    return null;
  };

  const setActiveAccountId = (accountId: string): null => {
    activeAccountId = accountId;
    window.localStorage.setItem('mintbase-wallet:activeAccountId', accountId);

    return null;
  };

  return {
    getAccountId,
    isSignedIn,
    signIn,
    signOut,
    signAndSendTransaction,
    verifyOwner,
    getAvailableBalance,
    getAccounts,
    switchAccount,
    signAndSendTransactions,
  };
};
