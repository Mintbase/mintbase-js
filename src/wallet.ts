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

import { MintbaseAPI } from './api'
import { Chain, MintbaseAPIConfig, WalletLoginProps, Network } from './types'

import {
  STORE_FACTORY_CONTRACT_NAME,
  DEFAULT_APP_NAME,
  NEAR_LOCAL_STORAGE_KEY_SUFFIX,
  BASE_ARWEAVE_URI,
  MARKET_ACCOUNT,
} from './constants'

import { KeyStore } from 'near-api-js/lib/key_stores'

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

    this.connect()

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
    }
  }

  /**
   * Removes connection from a NEAR smart contract
   * @param contractAddress the contract address to remove connection from
   *
   */
  public logout() {}

  /**
   * TODO1: Check for accounts not on local storage
   * TODO2: Manage errors
   */
  public async switchConnection({ accountId }: { accountId: string }) {
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
    }
    // TODO: Implement for Node environment
    // if(isNode) {}
  }

  /**
   * Fetch local storage connections
   */
  public listConnections() {}

  // TODO: fix account type
  public async getDetails() {
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

  private getKeyStore() {
    if (isNode) return new keyStores.InMemoryKeyStore()
    if (isBrowser) return new keyStores.BrowserLocalStorageKeyStore()

    throw new Error('Runtime environment has to be Node or Browser')
  }

  public async getSessionKeyPair() {
    const accountId = this.activeWallet?.getAccountId()
    const keyStore = this.keyStore

    if (!accountId) throw new Error('accountId is undefined')

    return await keyStore?.getKey(this.networkName, accountId)
  }

  public async setSessionKeyPair(accountId: string, privateKey: string) {
    const keyStore = this.keyStore

    keyStore.setKey(this.networkName, accountId, KeyPair.fromString(privateKey))

    return keyStore
  }

  public async transferAsset(
    contractName: string,
    tokenId: string | string[]
  ) {}

  public async listForSale(contractName: string, tokenId: string | string[]) {}

  public async makeOffer(listId: string) {}

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

    if (!account || !accountId) throw new Error('Account is not defined.')

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
    })
    return result
  }

  private rpcCall = async ({
    headers = {},
    body = {},
  }: {
    headers?: any
    body?: any
  }) => {
    const request = await fetch(this.nearConfig.nodeUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...body,
        jsonrpc: '2.0',
        id: `mintbase-${Math.random().toString().substr(2, 10)}`,
        method: 'query',
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
