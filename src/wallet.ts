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

import { API } from './api'
import {
  Chain,
  MintbaseAPIConfig,
  WalletLoginProps,
  Network,
  Token,
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
import { Minter } from './minter'

/**
 * Mintbase Wallet.
 * Main entry point for users to sign and interact with NEAR and Mintbase infrastructure.
 */
export class Wallet {
  public api: API

  public activeWallet?: WalletConnection
  public activeNearConnection?: Near
  public activeAccount?: Account

  public networkName: string = Network.testnet
  public chain: string = Chain.near

  public keyStore: KeyStore

  public nearConfig: any
  public minter: Minter

  /**
   * Mintbase wallet constructor.
   * Creates an instance of a Mintbase wallet.
   * @param apiConfig api confuguration options.
   * @returns the wallet instance
   */
  constructor(apiConfig: MintbaseAPIConfig) {
    this.api = new API(apiConfig)

    this.networkName = apiConfig.networkName || Network.testnet
    this.chain = apiConfig.chain || Chain.near

    this.nearConfig = this.getNearConfig(this.networkName)
    this.keyStore = this.getKeyStore()

    this.minter = new Minter({ apiKey: apiConfig.apiKey })

    return this
  }

  /**
   * Creates a connection to a NEAR smart contract
   * @param props wallet connection properties - the config to create a connection with
   *
   */
  public async connect(props: WalletLoginProps = {}): Promise<void> {
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
   */
  public disconnect(): void {
    this.activeWallet?.signOut()
    this.activeNearConnection = undefined
    this.activeAccount = undefined
  }

  /**
   * Connects to a wallet stored on local storage.
   * @param accountId the account identifier to connect.
   * @returns whether connection was successful or not.
   */
  public async connectTo(accountId: string): Promise<boolean> {
    // get localstorage accounts
    const localAccounts = this.getLocalAccounts()

    // does account user is trying to connect exists in storage?
    if (!localAccounts[accountId]) {
      return false
    }

    // get a full access public key with the largest nonce
    const _getFullAccessPublicKey = async (accountId: string) => {
      const keysRequest = await this.viewAccessKeyList(accountId)

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
   * @returns details of the current connection.
   */
  public async details(): Promise<{
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }> {
    const account = this.activeWallet?.account()
    const accountId = account?.accountId
    const keyPair = await this.getSessionKeyPair()

    if (!account || !accountId) throw new Error('Account is undefined.')

    if (!keyPair || !accountId)
      throw new Error(`No Key Pair for account ${accountId}`)

    const publicKey = keyPair.getPublicKey().toString()
    const balance = await account.getAccountBalance()

    if (!balance) throw new Error(``)

    const accessKey = await this.viewAccessKey(accountId, publicKey)

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

  /**
   * Transfer one or more tokens.
   * @param contractName The contract name to transfer tokens from.
   * @param tokenIds The mapping of transfers, defined by: [[accountName1, tokenId1], [accountName2, tokenId2]]
   */

  // TODO: need more checks on the tokenIds
  public async transfer({
    contractName,
    tokenIds,
  }: {
    contractName: string
    tokenIds: [string, number][]
  }): Promise<void> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const MAX_GAS = new BN('300000000000000')
    const ZERO = new BN('0')

    if (!account || !accountId) throw new Error('Account is undefined.')

    if (!contractName) throw new Error('No contract was provided.')

    const contract = new Contract(account, contractName, {
      viewMethods: STORE_CONTRACT_VIEW_METHODS,
      changeMethods: STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.batch_transfer({ token_ids: tokenIds }, MAX_GAS, ZERO)
  }

  /**
   * List an item for sale in the market.
   * @param tokenId The token id.
   * @param storeId The token store id (contract name).
   * @param price The listing price.
   * @param splitOwners List of splits.
   */
  public async listForSale(
    tokenId: number /*| string[]*/,
    storeId: string,
    price: string,
    splitOwners: { accountId: string; split: number }[]
  ): Promise<void> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const GAS = new BN('300000000000000')
    const bal = '100000000000000000000000'

    if (!account || !accountId) throw new Error('Account is undefined.')

    // TODO: Check if account owns the tokens that are trying to sell

    console.log(splitOwners)

    const token: Token = await this.api.fetchToken(
      tokenId,
      `${tokenId}:${storeId}`
    )

    const isOwner = token.ownerId === accountId
    if (!isOwner) throw new Error('User does not own token.')

    const contract = new Contract(account, token.storeId, {
      viewMethods: STORE_CONTRACT_VIEW_METHODS,
      changeMethods: STORE_CONTRACT_CALL_METHODS,
    })

    // TODO: Checks on split_owners

    // @ts-ignore: method does not exist on Contract type
    await contract.list_tokens(
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
   * Makes offer to a listing in the market.
   * @param groupId
   * @param price
   */
  public async makeOffer(groupId: string, price?: number): Promise<void> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const GAS = new BN('300000000000000')

    if (!account || !accountId) throw new Error('Account is undefined.')

    if (!groupId) throw new Error('Please provide a groupId')

    const result = await this.api.fetchLists(groupId)

    if (result.list.length === 0) throw new Error('List is empty')

    // TODO: make sure to get a list that is available
    const list = result.list[0]

    const contract = new Contract(account, MARKET_ACCOUNT, {
      viewMethods: ['get_token_owner_id', 'get_token', 'get_token_token_id'],
      changeMethods: ['make_offer'],
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.make_offer(
      {
        token_key: list.tokenKey,
        price: price || list.price,
        timeout: { Hours: 72 },
      },
      GAS,
      list.price
    )
  }

  /**
   * Creates a store
   * @param storeId Store name
   * @param symbol Store symbol
   */
  public async deployStore(storeId: string, symbol: string): Promise<void> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const balance = '7000000000000000000000000'
    const gas = new BN('300000000000000')

    if (!account || !accountId) throw new Error('Account is undefined.')

    // TODO: regex check inputs (storeId and symbol)

    const contract = new Contract(account, STORE_FACTORY_CONTRACT_NAME, {
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
    await contract.create_store(storeData, gas, balance)
  }

  /**
   * Mint a token
   * @param amount The number of tokens to mint.
   * @param contractName The contract in which tokens will be minted.
   */
  public async mint(amount: number, contractName: string): Promise<void> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const MAX_GAS = new BN('300000000000000')
    const ZERO = new BN('0')

    if (!account || !accountId) throw new Error('Account is undefined.')
    if (!contractName) throw new Error('No contract was provided.')

    const contract = new Contract(account, contractName, {
      viewMethods: STORE_CONTRACT_VIEW_METHODS,
      changeMethods: STORE_CONTRACT_CALL_METHODS,
    })

    // TODO: Check if minter has a valid object to mint.

    const metadataId = await this.minter.getMetadataId()

    const obj = {
      owner_id: accountId,
      meta_id: metadataId,
      num_to_mint: amount, //numToMint,
      royalty_f: 1000,
      royalty: null, //data[Field.Royalty],
    }

    // @ts-ignore: method does not exist on Contract type
    await contract.mint_tokens(obj, MAX_GAS, ZERO)
  }

  public async setSessionKeyPair(
    accountId: string,
    privateKey: string
  ): Promise<KeyStore> {
    const keyStore = this.keyStore

    keyStore.setKey(this.networkName, accountId, KeyPair.fromString(privateKey))

    return keyStore
  }

  public async getSessionKeyPair(): Promise<KeyPair> {
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

  // private getKeyPairFromLocalstorage() {}

  /**
   * Fetch local storage connections
   */
  public getLocalAccounts():
    | { accountId: string; contractName: string }[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | any {
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
          contractName: '', // TODO: get contractName connection
        },
      }
    })

    return accounts
  }

  /**
   * Fetch transaction result given a transaction hash.
   * @param txHash the transaction's hash
   * @returns the transaction result
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchTransactionResult(txHash: string): Promise<any> {
    const connection = this.activeNearConnection?.connection
    if (!connection) throw new Error('Near connection is undefined.')

    const accountId = this.activeWallet?.account().accountId
    if (!accountId) throw new Error('Account Id is undefined.')

    const decodeHash = utils.serialize.base_decode(txHash)

    const txResult = await connection.provider.txStatus(decodeHash, accountId)

    return txResult
  }

  private rpcCall = async ({
    headers = {},
    body = {},
    method,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   * Fetch access key information
   * @param accountId account id
   * @param publicKey public key
   * @returns Access Key information
   */
  public viewAccessKey = async (
    accountId: string,
    publicKey: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    const result = await this.rpcCall({
      body: {
        params: {
          request_type: 'view_access_key',
          finality: 'final',
          account_id: accountId,
          public_key: publicKey,
        },
      },
      method: 'query',
    })
    return result
  }

  /**
   * Fetch list of access keys for a given account
   * @param accountId account id
   * @returns List of access keys
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public viewAccessKeyList = async (accountId: string): Promise<any> => {
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

  /**
   * Fetch a transaction status.
   * @param transactionHash The transactions' hash.
   * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
   * @returns The transaction result
   */
  public transactionStatus = async (
    transactionHash: string,
    accountId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'tx',
    })

    return result
  }

  /**
   * Fetch transaction status with all receipts.
   * @param transactionHash The transactions' hash.
   * @param accountId The account who initiated the transation. TODO: Might not be really necessary to pass this.
   * @returns The transaction result with all receipts.
   */
  public transactionStatusWithReceipts = async (
    transactionHash: string,
    accountId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'EXPERIMENTAL_tx_status',
    })

    return result
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
