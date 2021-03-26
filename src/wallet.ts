import 'isomorphic-unfetch'
import { isBrowser, isNode } from 'browser-or-node'
import {
  keyStores,
  WalletAccount,
  KeyPair,
  Near,
  Account,
  utils,
  WalletConnection,
  Contract,
} from 'near-api-js'
import BN from 'bn.js'
import { KeyStore } from 'near-api-js/lib/key_stores'

import { MintbaseAPI } from './api'
import {
  Chain,
  MintbaseAPIConfig,
  WalletLoginProps,
  Network,
  MakeOfferProps,
  TransferAssetProps,
  Token,
  Split,
} from './types'

import {
  STORE_FACTORY_CONTRACT_NAME,
  DEFAULT_APP_NAME,
  NEAR_LOCAL_STORAGE_KEY_SUFFIX,
  BASE_ARWEAVE_URI,
  MARKET_ACCOUNT,
  STORE_CONTRACT_VIEW_METHODS,
  STORE_CONTRACT_CALL_METHODS,
} from './constants'

export class Wallet {
  public readonly api: MintbaseAPI

  public activeWallet?: WalletConnection
  public activeNearConnection?: Near
  public activeAccount?: Account

  public networkName: string = Network.testnet
  public chain: string = Chain.near

  public keyStore: KeyStore

  public nearConfig: any

  constructor(apiConfig: MintbaseAPIConfig) {
    this.api = new MintbaseAPI(apiConfig)

    this.networkName = apiConfig.networkName || Network.testnet
    this.chain = apiConfig.chain || Chain.near

    this.nearConfig = this.getNearConfig(this.networkName)
    this.keyStore = this.getKeyStore()

    return this
  }

  /**
   * Creates a connection to a NEAR smart contract
   * @param contractAddress the contract address to initiate a connection
   *
   */
  public async connect(props: WalletLoginProps = {}) {
    const contractAddress = props.contractAddress || STORE_FACTORY_CONTRACT_NAME

    if (isBrowser) {
      const _connectionObject = {
        deps: { keyStore: this.getKeyStore() },
        ...this.getNearConfig(this.networkName, contractAddress),
      }

      const near = new Near(_connectionObject)

      this.activeNearConnection = near
      this.activeWallet = new WalletAccount(near, DEFAULT_APP_NAME)

      if (this.activeWallet.isSignedIn()) {
        const accountId = this.activeWallet.getAccountId()

        this.activeAccount = await this.activeNearConnection.account(accountId)
      } else {
        this.activeWallet.requestSignIn(contractAddress, DEFAULT_APP_NAME)
      }
    } else if (isNode) {
      const privateKey = props.privateKey

      if (!privateKey) throw new Error('Private key is not defined.')

      this.setSessionKeyPair(STORE_FACTORY_CONTRACT_NAME, privateKey)

      const _connectionObject = {
        deps: { keyStore: this.getKeyStore() },
        ...this.getNearConfig(this.networkName, contractAddress),
      }

      const near = new Near(_connectionObject)

      this.activeNearConnection = near
      this.activeWallet = new WalletAccount(near, DEFAULT_APP_NAME)

      const accountId = this.activeWallet.getAccountId()
      this.activeAccount = await this.activeNearConnection.account(accountId)
    } else {
      throw new Error('Only Browser or Node environment supported.')
    }
  }

  /**
   * Disconnects user. Removes the LocalStorage entry that
   * represents an authorized wallet account but leaves private keys intact.
   *
   */
  public disconnect() {
    this.activeWallet?.signOut()
    this.activeNearConnection = undefined
    this.activeAccount = undefined
  }

  /**
   * TODO1: Manage errors
   */
  public async connectTo(accountId: string) {
    // get localstorage accounts
    const localAccounts = this.getLocalAccounts() as any

    // does account user is trying to connect exists in storage?
    if (!localAccounts[accountId]) {
      return false
    }

    // get a full access public key with the largest nonce
    const _getFullAccessPublicKey = async (accountId: string) => {
      const keysRequest = await this.viewAccessKeyList({ accountId: accountId })

      // filter by full access keys
      const fullAccessKeys = keysRequest.keys.filter(
        (acc: { access_key: { permission: string } }) =>
          acc.access_key.permission === 'FullAccess'
      )

      // get the highest nonce key
      const highestNonceKey = fullAccessKeys.reduce(
        (
          acc: { access_key: { nonce: number } },
          curr: { access_key: { nonce: number } }
        ) => (acc?.access_key?.nonce > curr?.access_key?.nonce ? acc : curr)
      )

      return highestNonceKey
    }

    if (isBrowser) {
      const localStorageKey = `${DEFAULT_APP_NAME}${NEAR_LOCAL_STORAGE_KEY_SUFFIX}`
      const fullAccessKey = await _getFullAccessPublicKey(accountId)

      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          accountId: accountId,
          allKeys: [fullAccessKey.public_key],
        })
      )

      this.connect()

      return true
    }
    // TODO: Implement for Node environment
    // if(isNode) {}

    return false
  }

  /**
   * Fetches connected account details.
   * @returns
   */
  public async details() {
    const accountId = this.activeWallet?.getAccountId()
    const keyPair = await this.getSessionKeyPair()

    if (!keyPair || !accountId)
      throw new Error(`No Key Pair for account ${accountId}`)

    const publicKey = keyPair.getPublicKey().toString()
    const balance = await this.activeWallet?.account().getAccountBalance()

    if (!balance) throw new Error(``)

    const accessKey = await this.viewAccessKey({
      account: accountId,
      publicKey: publicKey,
    })

    const allowance = utils.format.formatNearAmount(
      accessKey.permission.FunctionCall.allowance
    )

    const contractName = this.activeNearConnection?.config.contractName

    return {
      accountId: accountId,
      balance: utils.format.formatNearAmount(balance?.total, 2),
      allowance: allowance,
      contractName: contractName,
    }
  }

  public async transfer({ contractName, tokenIds }: TransferAssetProps) {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const MAX_GAS = new BN('300000000000000')
    const ZERO = new BN('0')

    if (!account || !accountId) throw new Error('Account is undefined.')

    if (!contractName) throw new Error('No contract was provided.')

    const assetContract = new Contract(account, contractName, {
      viewMethods: STORE_CONTRACT_VIEW_METHODS,
      changeMethods: STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await assetContract.batch_transfer({ token_ids: tokenIds }, MAX_GAS, ZERO)
  }

  public async listForSale(
    tokenId: number /*| string[]*/,
    storeId: string,
    price: string,
    splitOwners: Split[]
  ) {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const GAS = new BN('300000000000000')
    const bal = '100000000000000000000000'

    if (!account || !accountId) throw new Error('Account is undefined.')

    const token: Token = await this.api.fetchToken(
      tokenId,
      `${tokenId}:${storeId}`
    )

    const isOwner = token.ownerId === accountId
    if (!isOwner) throw new Error('User does not own token.')

    const assetContract = new Contract(account, token.storeId, {
      viewMethods: STORE_CONTRACT_VIEW_METHODS,
      changeMethods: STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await assetContract.list_tokens(
      {
        contract_address: null,
        token_ids: [Number(token.tokenId)],
        autotransfer: true,
        asking_price: price,
        split_owners: null, //{ [accountId]: 10000 },
      },
      GAS,
      bal
    )
  }

  /**
   * Makes offer.
   * @param xxx
   * @returns
   */
  public async makeOffer(props: MakeOfferProps = {}) {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const GAS = new BN('300000000000000')

    if (!account || !accountId) throw new Error('Account is undefined.')

    const groupId = props.groupId
    if (!groupId) throw new Error('Please provide a groupId')

    const result = await this.api.fetchLists(groupId)

    if (result.list.length === 0) throw new Error('List is empty')

    const list = result.list[0]

    const tokenContract = new Contract(account, MARKET_ACCOUNT, {
      viewMethods: ['get_token_owner_id', 'get_token', 'get_token_token_id'],
      changeMethods: ['make_offer'],
    })

    // @ts-ignore: method does not exist on Contract type
    await tokenContract.make_offer(
      {
        token_key: list.tokenKey,
        price: list.price,
        timeout: { Hours: 72 },
      },
      GAS,
      list.price
    )
  }

  /**
   * Creates a store. Interacts with the store factory to deploy a contract.
   * @param xxx
   * @returns
   */
  public async deployStore({
    storeId,
    symbol,
  }: {
    storeId: string
    symbol: string
  }) {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const balance = '7000000000000000000000000'
    const gas = new BN('300000000000000')

    if (!account || !accountId) throw new Error('Account is undefined.')

    const factoryContract = new Contract(account, STORE_FACTORY_CONTRACT_NAME, {
      viewMethods: [
        'get_min_attached_balance',
        'get_number_of_tokens',
        'get_store_descriptions',
        'get_token_description',
        'get_owner',
        'get_mintbase_fee',
      ],
      changeMethods: [
        'create_store',
        'set_mintbase_fee',
        'transfer_ownership',
        'new',
      ],
    })

    const storeData = {
      store_description: {
        store_id: storeId,
        owner_id: accountId,
        symbol: symbol,
        icon_base64: 'eeieieieie',
        base_uri: BASE_ARWEAVE_URI,
        marketplace_id: MARKET_ACCOUNT,
      },
    }

    // @ts-ignore: method does not exist on Contract type
    factoryContract.create_store(storeData, gas, balance)
  }

  /**
   * TODO: Figure out how to make this work with Arweave?
   * 1. Upload files to Arweave
   * 2. Generate metadata
   * 3. Interact with contract
   */
  public async mint() {}

  public async setSessionKeyPair(accountId: string, privateKey: string) {
    const keyStore = this.keyStore

    keyStore.setKey(this.networkName, accountId, KeyPair.fromString(privateKey))

    return keyStore
  }

  public async getSessionKeyPair() {
    const accountId = this.activeWallet?.getAccountId()
    const keyStore = this.keyStore

    if (!accountId) throw new Error('accountId is undefined')

    return await keyStore?.getKey(this.networkName, accountId)
  }

  private getKeyStore() {
    if (isNode) return new keyStores.InMemoryKeyStore()
    if (isBrowser) return new keyStores.BrowserLocalStorageKeyStore()

    throw new Error('Runtime environment has to be Node or Browser')
  }

  private getKeyPairFromLocalstorage() {}

  /**
   * Fetch local storage connections
   */
  public getLocalAccounts() {
    const regex = /near-api-js:keystore:/gm
    const keys = Object.keys(localStorage)

    const matches = keys.filter((key) => {
      return regex.exec(key) !== null
    })

    let accounts = {}
    matches.forEach((key) => {
      const accountId = key.split(':')[2]

      accounts = {
        ...accounts,
        [accountId]: {
          accountId: accountId,
          contractName: '', // get contractName connection
        },
      }
    })

    return accounts
  }

  public async fetchTransactionResult(txHash: string) {
    const connection = this.activeNearConnection?.connection
    if (!connection) throw new Error('Near connection is undefined.')

    const accountId = this.activeWallet?.account().accountId
    if (!accountId) throw new Error('Account Id is undefined.')

    const decodeHash = utils.serialize.base_decode(txHash)

    const txResult = await connection.provider.txStatus(decodeHash, accountId)

    return txResult
  }

  // === RPC CALLS ===

  public viewAccessKey = async ({
    account,
    publicKey,
  }: {
    account: string
    publicKey: string
  }) => {
    const result = await this.rpcCall({
      body: {
        params: {
          request_type: 'view_access_key',
          finality: 'final',
          account_id: account,
          public_key: publicKey,
        },
      },
      method: 'query',
    })
    return result
  }

  /**
   * Fetch all account access keys
   * @param accountId account name
   * @returns array of
   */
  public viewAccessKeyList = async ({ accountId }: { accountId: string }) => {
    const result = await this.rpcCall({
      body: {
        params: {
          request_type: 'view_access_key_list',
          finality: 'final',
          account_id: accountId,
        },
      },
      method: 'query',
    })
    return result
  }

  public transactionStatus = async (
    transactionHash: string,
    accountId: string
  ) => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'tx',
    })

    return result
  }

  public transactionStatusWithReceipts = async (
    transactionHash: string,
    accountId: string
  ) => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'EXPERIMENTAL_tx_status',
    })

    return result
  }

  private rpcCall = async ({
    headers = {},
    body = {},
    method,
  }: {
    headers?: any
    body?: any
    method: string
  }) => {
    const request = await fetch(this.nearConfig.nodeUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        jsonrpc: '2.0',
        id: `mintbase-${Math.random().toString().substr(2, 10)}`,
        method: method,
      }),
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    })

    const data = await request.json()
    return data?.result
  }

  /**
   * Get NEAR configuration object. Defaults to testnet.
   * @param networkName
   * @param contractAddress
   */
  private getNearConfig(networkName: string, contractAddress?: string) {
    switch (networkName) {
      case Network.testnet:
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName: contractAddress || STORE_FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
        }

      case Network.main:
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          contractName: contractAddress || STORE_FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.mainnet.near.org',
          helperUrl: 'https://helper.mainnet.near.org',
        }
      default:
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName: contractAddress || STORE_FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
        }
    }
  }
}
