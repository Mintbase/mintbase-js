import * as nearAPI from 'near-api-js';

import type {
  Action,
  BrowserWallet,
  FinalExecutionOutcome,
  WalletBehaviourFactory,
} from '@near-wallet-selector/core';
import { getCallbackUrl } from './utils';
import { createAction } from '@near-wallet-selector/wallet-utils';


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

interface BitteWalletState {
  wallet: nearAPI.WalletConnection;
}

interface BitteWalletAccount {
  accountId: string;
  publicKey: string;
}

export type CallBackArgs = {
  args: object;
  type: TransactionSuccessEnum;
}


export const BitteWallet: WalletBehaviourFactory<
  BrowserWallet,
  {
    networkId: string;
    callback: string;
    successUrl?: string;
    failureUrl?: string;
    contractId?: string;
  }
> = async ({
  metadata,
  options,
  successUrl,
  failureUrl,
  contractId,
  callback,
  networkId,
}) => {

  const setupWalletState = async (): Promise<BitteWalletState> | null => {
    if (typeof window !== undefined) {
      const { connect, WalletConnection, keyStores } = nearAPI;
      const connectionConfig = {
        networkId: networkId,
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: options.network.nodeUrl,
        walletUrl: metadata.walletUrl,
        headers: {},
      };

      const searchParams = new URL(window.location.href);
      const acc = searchParams.searchParams.get('account_id');
      //make near-api-js not throw without lak
      if (acc && !contractId) {
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
      localStorage.setItem('mintbase-wallet:callback_url', callback);

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

  const signIn = async (): Promise<BitteWalletAccount[]> => {
    const existingAccounts = await getAccounts();
    const href = encodeURI(window?.location?.href);

    if (existingAccounts.length) {
      return existingAccounts;
    }

    await state.wallet.requestSignIn({
      methodNames: [],
      successUrl: successUrl || href,
      failureUrl: failureUrl || href,
      contractId: contractId,
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

  const signAndSendTransactions = async ({ transactions, callbackUrl }): Promise<void> => {
    if (!state.wallet.isSignedIn()) {
      throw new Error('Wallet not signed in');
    }
    //// near-api-js code fails if no lak
    // const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    // return state.wallet.requestSignTransactions({
    //   transactions: await transformTransactions(transactions),
    //   callbackUrl: cbUrl,
    // });

    const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    for (const { signerId } of transactions) {
      assertValidSigner(signerId);
    }
    const stringifiedParam = JSON.stringify(transactions);

    const urlParam = encodeURIComponent(stringifiedParam);
    const newUrl = new URL(`${metadata.walletUrl}/sign-transaction`);
    newUrl.searchParams.set('transactions_data', urlParam);
    newUrl.searchParams.set('callback_url', cbUrl);

    window.location.assign(newUrl.toString());
    return;
  };

  const signAndSendTransaction =  async ({
    receiverId,
    actions,
    signerId,
    callbackUrl,
  }: {
    receiverId: string;
    actions: Array<Action>;
    signerId: string;
    callbackUrl: string;
  }): Promise<FinalExecutionOutcome> => {
    assertValidSigner(signerId);

    if (!receiverId && !contractId) {
      throw new Error('No receiver found to send the transaction to');
    }

    const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    const callback = cbUrl || successUrl;

    if (!contractId) {
      const newUrl = new URL(`${metadata.walletUrl}/sign-transaction`);
      const stringifiedParam = JSON.stringify([{ receiverId, signerId, actions }]);
      const urlParam = encodeURIComponent(stringifiedParam);
      newUrl.searchParams.set('transactions_data', urlParam);
      newUrl.searchParams.set('callback_url', callback);
      window.location.assign(newUrl.toString());
    }
    const account = state.wallet.account();

    return account.signAndSendTransaction({
      receiverId: receiverId || contractId,
      actions: actions.map((action) => createAction(action)) as any,
      walletCallbackUrl: callback,
    });
  };


  const verifyOwner = async (): Promise<void> => {
    throw new Error(`The verifyOwner method is not supported by ${metadata.name}`);
  };

  const signMessage = async ({ message, nonce, recipient, callbackUrl }): Promise<void> => {
    const { cbUrl } = getCallbackUrl(callbackUrl ?? '');

    const newUrl = new URL(`${metadata.walletUrl}/sign-message`);
    newUrl.searchParams.set('message', message);
    newUrl.searchParams.set('nonce', nonce);
    newUrl.searchParams.set('recipient', recipient);
    newUrl.searchParams.set('callbackUrl', cbUrl);
    window.location.assign(newUrl.toString());
  };

  const verifyMessage = async ({ accountId, publicKey, signature, message, nonce, recipient, callbackUrl }): Promise<boolean> => {

    const newUrl = new URL(`${metadata.walletUrl}/api/verify-message`);
    newUrl.searchParams.set('message', message);
    newUrl.searchParams.set('accountId', accountId);
    newUrl.searchParams.set('publicKey', publicKey);
    newUrl.searchParams.set('signature', signature);
    newUrl.searchParams.set('nonce', nonce);
    newUrl.searchParams.set('recipient', recipient);
    newUrl.searchParams.set('callbackUrl', callbackUrl);

    try {
      const response = await fetch(newUrl.toString())
      const data = await response.json();

      const { isValid } = data
      return isValid
    } catch (e) {
      return false
    }
  }

  const getAvailableBalance = async (): Promise<void> => {
    // const accountId = state.wallet.getAccountId();
    // return await getBalance(accountId);
    throw (`The getAvailableBalance method is not supported by ${metadata.name}`);
  };

  const getAccounts = async (): Promise<BitteWalletAccount[]> => {
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

  // const transformTransactions = async (
  //   transactions: Array<Optional<Transaction, 'signerId'>>,
  // ): Promise<Array<nearAPI.transactions.Transaction>> => {
  //   const account = state.wallet.account();
  //   const { networkId, signer, provider } = account.connection;

  //   const localKey = await signer.getPublicKey(account.accountId, networkId);

  //   return Promise.all(
  //     transactions.map(async (transaction, index) => {
  //       const actions = transaction.actions.map((action) =>
  //         createAction(action),
  //       );
  //       const accessKey = await account.accessKeyForTransaction(
  //         transaction.receiverId,
  //         actions as any,
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
  //         actions as any,
  //         nearAPI.utils.serialize.base_decode(block.header.hash),
  //       );
  //     }),
  //   );
  // };

  return {
    getAccountId,
    isSignedIn,
    signIn,
    signOut,
    signAndSendTransaction,
    verifyOwner,
    signMessage,
    getAvailableBalance,
    getAccounts,
    switchAccount,
    signAndSendTransactions,
    verifyMessage
  };
};
