import * as nearAPI from 'near-api-js';
import { networks } from './networks';
import BN from 'bn.js';

export interface MintbaseWalletParams {
  signInContractId?: string;
  networkId?: 'testnet' | 'mainnet';
  relayerUrl?: string;
  walletUrl?: string;
  deprecated?: boolean;
  successUrl?: string;
  failureUrl?: string;
}

interface MintbaseWalletState {
  networkId: string;
  signInContractId: string;
  activeAccountId?: string;
  keyStore: nearAPI.keyStores.BrowserLocalStorageKeyStore;
  near?: nearAPI.Near;
  relayerUrl: string;
  walletUrl: string;
}

const initializeMintbaseWallet = async ({
  signInContractId,
  networkId,
  relayerUrl,
  walletUrl,
}: MintbaseWalletParams): Promise<MintbaseWalletState> => {
  const state: MintbaseWalletState = {
    networkId,
    signInContractId,
    relayerUrl,
    walletUrl,
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  };

  state.near = new nearAPI.Near({
    ...networks[networkId],
    deps: { keyStore: state.keyStore },
  });

  await _setupWalletState(state);

  return state;
};

const _setupWalletState = async (state: MintbaseWalletState): Promise<void> => {
  const urlParams = _getQueryParams();

  if (Object.keys(urlParams).length === 0) {
    const accountId = window.localStorage.getItem('mintbasewallet:activeAccountId');

    if (accountId) {
      await _initializeWalletState(state, { accountId });

      return;
    }
  }

  if (urlParams?.accountId) {
    await _initializeWalletState(state, { accountId: urlParams?.accountId, publicKey: urlParams?.publicKey || '' });
  }
};

const _initializeWalletState = async (state: MintbaseWalletState, { accountId, publicKey }: { accountId: string; publicKey?: string }): Promise<void> => {
  _setActiveAccountId(state, accountId);

  window.localStorage.setItem('near-wallet-selector:selectedWalletId', JSON.stringify('mintbasewallet'));

  if (publicKey) {
    const usernameSet = new CustomEvent('mbWalletLogin', { detail: [{ publickKey: publicKey, accountId, active: true }] });

    window.dispatchEvent(usernameSet);
    window.localStorage.setItem('mintbasewallet:account-data', JSON.stringify({ accountId, publicKey }));
  }
};

const _setActiveAccountId = (state: MintbaseWalletState, accountId: string): void => {
  state.activeAccountId = accountId;
  window.localStorage.setItem('mintbasewallet:activeAccountId', accountId);
};

const _getQueryParams = (): Record<string, string> => {
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
};

const assertSigner = (signerId, state) => {
  if (signerId && signerId !== state.activeAccountId) {
    throw new Error(`Cannot sign transactions for ${signerId} while signed in as ${state.activeAccountId}`);
  }
};

const signTransaction = ({ receiverId, actions, signerId, successUrl, failureUrl, state }) => {
  assertSigner(signerId, state);

  const stringifiedParam = JSON.stringify([{ receiverId, signerId, actions }]);

  const urlParam = encodeURIComponent(stringifiedParam);

  const currentUrl = new URL(window.location.href);

  const newUrl = new URL(`${state.walletUrl}/sign-transaction`);
  newUrl.searchParams.set('transactions_data', urlParam);
  newUrl.searchParams.set('success_url', successUrl || currentUrl.toString());
  newUrl.searchParams.set('failure_url', failureUrl || currentUrl.toString());

  console.log(newUrl, 'newUrl');


};

export const MintbaseWallet = async (params: MintbaseWalletParams) => {
  const state = await initializeMintbaseWallet(params);
      console.log(state, 'state 1')

  return {
    getContractId: (): string => state.signInContractId,
    getAccountId: (): string | undefined => state.activeAccountId,
    isSignedIn: async (): Promise<boolean> => !!state.activeAccountId,
    signIn: async (): Promise<any> => {
      const currentUrl = new URL(window.location.href);
      const newUrl = new URL(`${state.walletUrl}/connect`);
      newUrl.searchParams.set('success_url', currentUrl.href);
      newUrl.searchParams.set('failure_url', currentUrl.href);

      console.log(state, 'state')

      window.location.assign(newUrl.toString());
    },
    signOut: async (): Promise<void> => {
      if (state.activeAccountId === undefined || state.activeAccountId === null) {
        throw new Error('Wallet is already signed out');
      }

      await state.keyStore.removeKey(state.networkId, state.activeAccountId);
      window.localStorage.removeItem('mintbasewallet:activeAccountId');
      window.localStorage.removeItem('mintbasewallet:account-data');
    },
    assertValidSigner: (signerId: string): void => {
      if (signerId && signerId !== state.activeAccountId) {
        throw new Error(`Cannot sign transactions for ${signerId} while signed in as ${state.activeAccountId}`);
      }
    },
    signAndSendTransaction: async ({ receiverId, actions, signerId, successUrl, failureUrl }: { receiverId: string; actions: any[]; signerId: string; successUrl?: string; failureUrl?: string }): Promise<void> => {
      return signTransaction({ receiverId, actions, signerId, successUrl, failureUrl, state });
    },
    signAndSendTransactions: async ({ transactions }: { transactions: any[] }): Promise<void> => {
      console.log(transactions, 'transactions');

      for (const { signerId } of transactions) {
        assertSigner(signerId, state);
      }

      for (const { actions, receiverId, signerId, successUrl, failureUrl } of transactions) {
        await signTransaction({ receiverId, actions, signerId, successUrl, failureUrl, state });
      }
    },
    showModal: (): void => {
      // unused
    },
    verifyOwner: async (): Promise<void> => {
      throw new Error('mintbasewallet:verifyOwner is unsupported!');
    },
    getAvailableBalance: async (): Promise<BN> => {
      return new BN(0);
    },
    getAccounts: async (): Promise<nearAPI.Account[]> => {
      if (state.activeAccountId !== undefined && state.activeAccountId !== null) {
        const accountObj = new nearAPI.Account(state.near.connection, state.activeAccountId);
        return [accountObj];
      }

      return [];
    },
    switchAccount: (id: string): void => {
      _setActiveAccountId(state, id);
    },
  };
};

