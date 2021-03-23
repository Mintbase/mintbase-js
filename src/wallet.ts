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
} from 'near-api-js'
import { MintbaseAPI } from './api'
import { Chain, MintbaseAPIConfig, WalletLoginProps, Network } from './types'

import { STORE_FACTORY_CONTRACT_NAME, DEFAULT_APP_NAME } from './constants'

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
    }
  }

  /**
   * Removes connection from a NEAR smart contract
   * @param contractAddress the contract address to remove connection from
   *
   */
  public logout() {}

  /**
   * TODO: switch accounts
   */
  public switchConnection({ account }: { account: string }) {
    // allKeys: keys.find(elm => elm.access_key.permission === "FullAccess")
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

  public async transferAsset() {}

  public async makeOffer() {}

  public async deployStore() {}

  public async mint() {}

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
