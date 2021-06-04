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
  connect,
} from 'near-api-js'
import BN from 'bn.js'
import { KeyStore } from 'near-api-js/lib/key_stores'

import { API } from './api'
import {
  Chain,
  WalletLoginProps,
  Network,
  Split,
  Royalties,
  NEARConfig,
  Constants,
  WalletConfig,
} from './types'

import {
  FACTORY_CONTRACT_NAME,
  DEFAULT_APP_NAME,
  NEAR_LOCAL_STORAGE_KEY_SUFFIX,
  BASE_ARWEAVE_URI,
  STORE_CONTRACT_VIEW_METHODS,
  STORE_CONTRACT_CALL_METHODS,
  DEFAULT_ROYALTY_PERCENT,
  MARKET_CONTRACT_VIEW_METHODS,
  MARKET_CONTRACT_CALL_METHODS,
  MAX_GAS,
  ONE_YOCTO,
  ZERO,
  DEPLOY_STORE_COST,
  FACTORY_CONTRACT_VIEW_METHODS,
  FACTORY_CONTRACT_CALL_METHODS,
  TWENTY_FOUR,
  MINTBASE_32x32_BASE64_DARK_LOGO,
} from './constants'
import { Minter } from './minter'

import { calculateListCost } from './utils/near-costs'
import { initializeExternalConstants } from './utils/external-constants'
import { formatResponse, ResponseData } from './utils/responseBuilder'
import { FinalExecutionOutcome } from 'near-api-js/lib/providers'

/**
 * Mintbase Wallet.
 * Main entry point for users to sign and interact with NEAR and Mintbase infrastructure.
 */
export class Wallet {
  public api: API | undefined

  public activeWallet?: WalletConnection
  public activeNearConnection?: Near
  public activeAccount?: Account

  public networkName: Network = Network.testnet
  public chain: Chain = Chain.near

  public keyStore: KeyStore | undefined

  public nearConfig: NEARConfig | undefined
  public minter: Minter | undefined

  public constants: Constants

  /**
   * Mintbase wallet constructor.
   * Creates an instance of a Mintbase wallet.
   * @param apiConfig api confuguration options.
   * @returns the wallet instance
   */
  constructor() {
    this.constants = {}
  }

  public async init(
    walletConfig: WalletConfig
  ): Promise<ResponseData<{ wallet: Wallet; isConnected: boolean }>> {
    try {
      this.constants = await initializeExternalConstants({
        apiKey: walletConfig.apiKey,
        networkName: walletConfig.networkName || this.networkName,
      })

      this.api = new API({
        networkName: walletConfig.networkName || this.networkName,
        chain: walletConfig.chain || this.chain,
        constants: this.constants,
      })

      this.networkName = walletConfig.networkName || Network.testnet
      this.chain = walletConfig.chain || Chain.near
      this.nearConfig = this.getNearConfig(this.networkName)
      this.keyStore = this.getKeyStore()

      this.minter = new Minter({
        apiKey: walletConfig.apiKey,
        constants: this.constants,
      })

      await this.connect()

      const data = { wallet: this, isConnected: this.isConnected() }

      // TODO: decide if we should really return the formatted response or the atual instance
      return formatResponse({
        data,
      })
    } catch (error) {
      return formatResponse({ error })
    }
  }

  public isConnected(): boolean {
    return this.activeWallet?.isSignedIn() ?? false
  }

  /**
   * Creates a connection to a NEAR smart contract
   * @param props wallet connection properties - the config to create a connection with
   *
   */
  public async connect(
    props: WalletLoginProps = {}
  ): Promise<ResponseData<string>> {
    const contractAddress =
      props.contractAddress ||
      this.constants.FACTORY_CONTRACT_NAME ||
      FACTORY_CONTRACT_NAME

    if (isBrowser) {
      const _connectionObject = {
        deps: { keyStore: this.getKeyStore() },
        ...this.getNearConfig(this.networkName, contractAddress),
      }

      const near = await connect(_connectionObject)
      this.activeNearConnection = near
      this.activeWallet = new WalletAccount(near, DEFAULT_APP_NAME)

      if (props?.requestSignIn) {
        this.activeWallet.requestSignIn(contractAddress, DEFAULT_APP_NAME)
      } else if (this.activeWallet.isSignedIn()) {
        const accountId = this.activeWallet.getAccountId()

        this.activeAccount = await this.activeNearConnection.account(accountId)
      }

      await connect(_connectionObject)
      // TODO: define a proper return value
      return formatResponse({ data: 'connected' })
    } else if (isNode) {
      const privateKey = props.privateKey

      if (!privateKey)
        return formatResponse({ error: 'Private key is not defined.' })

      this.setSessionKeyPair(
        this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME,
        privateKey
      )

      const _connectionObject = {
        deps: { keyStore: this.getKeyStore() },
        ...this.getNearConfig(this.networkName, contractAddress),
      }

      const near = new Near(_connectionObject)

      this.activeNearConnection = near
      this.activeWallet = new WalletAccount(near, DEFAULT_APP_NAME)

      const accountId = this.activeWallet.getAccountId()
      this.activeAccount = await this.activeNearConnection.account(accountId)
      return formatResponse({ data: 'connection activated' })
    } else {
      return formatResponse({
        error: 'Only Browser or Node environment supported.',
      })
    }
  }

  /**
   * Disconnects user. Removes the LocalStorage entry that
   * represents an authorized wallet account but leaves private keys intact.
   */
  public disconnect(): ResponseData<string> {
    this.activeWallet?.signOut()
    this.activeNearConnection = undefined
    this.activeAccount = undefined
    return formatResponse({ data: 'disconnected' })
  }

  /**
   * Connects to a wallet stored on local storage.
   * @param accountId the account identifier to connect.
   * @returns whether connection was successful or not.
   */
  public async connectTo(accountId: string): Promise<ResponseData<boolean>> {
    if (isNode)
      return formatResponse({
        error: 'Node environment does not yet support the connectTo method.',
      })

    // get localstorage accounts
    const { data: localAccounts } = this.getLocalAccounts()

    // does account user is trying to connect exists in storage?
    if (!localAccounts[accountId]) {
      return formatResponse({ data: false })
      // return false
    }

    // get a full access public key with the largest nonce
    const _getFullAccessPublicKey = async (accountId: string) => {
      const { data: keysRequest } = await this.viewAccessKeyList(accountId)

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

      return formatResponse({ data: true })
    }
    // TODO: Implement for Node environment
    // if(isNode) {}

    return formatResponse({ data: false })
  }

  /**
   * Fetches connected account details.
   * @returns details of the current connection.
   */
  public async details(): Promise<
    ResponseData<{
      accountId: string
      balance: string
      allowance: string
      contractName: string
    }>
  > {
    const account = this.activeWallet?.account()
    const accountId = account?.accountId
    const { data: keyPair } = await this.getSessionKeyPair()

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    if (!keyPair || !accountId)
      return formatResponse({ error: `No Key Pair for account ${accountId}` })

    const publicKey = keyPair.getPublicKey().toString()
    const balance = await account.getAccountBalance()

    // TODO: we should add a proper error message for this one
    if (!balance) return formatResponse({ error: '' })

    const { data: accessKey } = await this.viewAccessKey(accountId, publicKey)

    const allowance = utils.format.formatNearAmount(
      accessKey.permission.FunctionCall.allowance
    )

    const contractName = this.activeNearConnection?.config.contractName

    const data = {
      accountId: accountId,
      balance: utils.format.formatNearAmount(balance?.total, 2),
      allowance: allowance,
      contractName: contractName,
    }

    return formatResponse({ data })
  }

  /**
   * Transfer one or more tokens.
   * @param tokenIds The mapping of transfers, defined by: [[accountName1, tokenId1], [accountName2, tokenId2]]
   * @param contractName The contract name to transfer tokens from.
   */
  // TODO: need more checks on the tokenIds
  public async transfer(
    tokenIds: [string, string][],
    contractName: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!contractName)
      return formatResponse({ error: 'No contract was provided.' })

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.batch_transfer({ token_ids: tokenIds }, MAX_GAS, ONE_YOCTO)
    return formatResponse({ data: true })
  }

  /**
   * Burn one or more tokens from the same contract.
   * @param contractName The contract name to burn tokens from.
   * @param tokenIds An array containing token ids to be burnt.
   */
  public async burn(tokenIds: string[]): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    const contractName = tokenIds[0].split(':')[1]
    const isSameContract = tokenIds.every((id) => {
      const split = id.split(':')

      if (split.length === 2) return split[1] === contractName

      return false
    })

    if (!isSameContract)
      return formatResponse({
        error: 'Tokens need to be all from the same contract.',
      })
    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!contractName)
      return formatResponse({ error: 'No contract was provided.' })

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    const burnIds = tokenIds.map((id) => id.split(':')[0])

    // @ts-ignore: method does not exist on Contract type
    await contract.burn_tokens({ token_ids: burnIds }, MAX_GAS, ONE_YOCTO)
    return formatResponse({ data: true })
  }

  /**
   * List an item for sale in the market.
   * @param tokenId The token id list.
   * @param storeId The token store id (contract name).
   * @param price The listing price.
   * @param splitOwners List of splits.
   */
  public async batchList(
    tokenId: string[],
    storeId: string,
    price: string,
    options?: {
      autotransfer?: boolean
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    // TODO: Check if account owns the tokens that are trying to sell
    /*const token: Token = await this.api.fetchToken(
      tokenId,
      `${tokenId}:${storeId}`
    )

    const isOwner = token.ownerId === accountId
    if (!isOwner) throw new Error('User does not own token.')*/

    const contract = new Contract(account, storeId, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // TODO: Checks on split_owners

    const listCost = calculateListCost(tokenId.length)

    // @ts-ignore: method does not exist on Contract type
    await contract.nft_batch_approve(
      {
        token_ids: tokenId,
        account_id:
          options?.marketAddress ||
          this.constants.MARKET_ADDRESS ||
          `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
        msg: JSON.stringify({
          price: price,
          autotransfer: options?.autotransfer ?? true,
        }),
      },
      MAX_GAS,
      utils.format.parseNearAmount(listCost.toString())
    )
    return formatResponse({ data: true })
  }

  /**
   * List an item for sale in the market.
   * @param tokenId The token id.
   * @param storeId The token store id (contract name).
   * @param price The listing price.
   * @param splitOwners List of splits.
   */
  public async list(
    tokenId: string,
    storeId: string,
    price: string,
    options?: {
      autotransfer?: boolean
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    // TODO: Check if account owns the tokens that are trying to sell
    /*const token: Token = await this.api.fetchToken(
      tokenId,
      `${tokenId}:${storeId}`
    )

    const isOwner = token.ownerId === accountId
    if (!isOwner) throw new Error('User does not own token.')*/

    const contract = new Contract(account, storeId, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // TODO: Checks on split_owners

    const listCost = calculateListCost(1)

    // @ts-ignore: method does not exist on Contract type
    await contract.nft_approve(
      {
        token_id: tokenId,
        account_id:
          options?.marketAddress ||
          this.constants.MARKET_ADDRESS ||
          `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
        msg: JSON.stringify({
          price: price,
          autotransfer: options?.autotransfer ?? true,
        }),
      },
      MAX_GAS,
      utils.format.parseNearAmount(listCost.toString())
    )
    return formatResponse({ data: true })
  }

  public async revokeAccount(
    tokenId: string,
    storeId: string,
    accountRevokeId: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    const contract = new Contract(account, storeId, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.nft_revoke(
      { token_id: tokenId, account_id: accountRevokeId },
      MAX_GAS
    )
    return formatResponse({ data: true })
  }

  public async revokeAllAccounts(
    tokenId: string,
    storeId: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId
    const GAS = new BN('300000000000000')

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    const contract = new Contract(account, storeId, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.nft_revoke_all({ token_id: tokenId }, GAS)
    return formatResponse({ data: true })
  }

  /**
   * Make an offer to a token from a group.
   * @param groupId
   * @param price
   */
  public async makeGroupOffer(
    groupId: string,
    price?: string,
    options?: {
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!groupId) formatResponse({ error: 'Please provide a groupId' })

    if (!this.api) return formatResponse({ error: 'API is not defined.' })

    const { data: list, error } = await this.api.fetchListById(groupId)

    if (error) return formatResponse({ error })

    const contract = new Contract(
      account,
      options?.marketAddress ||
        this.constants.MARKET_ADDRESS ||
        `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
      {
        viewMethods:
          this.constants.MARKET_CONTRACT_VIEW_METHODS ||
          MARKET_CONTRACT_VIEW_METHODS,
        changeMethods:
          this.constants.MARKET_CONTRACT_CALL_METHODS ||
          MARKET_CONTRACT_CALL_METHODS,
      }
    )

    const setPrice = price || list.price

    // @ts-ignore: method does not exist on Contract type
    await contract.make_offer(
      {
        token_key: list.token.id,
        price: setPrice,
        timeout: { Hours: TWENTY_FOUR },
      },
      MAX_GAS,
      setPrice
    )
    return formatResponse({ data: true })
  }

  /**
   * Make an offer to a token.
   * @param tokenId
   * @param price
   */
  public async makeOffer(
    tokenId: string,
    price: string,
    options?: {
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!tokenId) return formatResponse({ error: 'Please provide a tokenId' })

    const contract = new Contract(
      account,
      options?.marketAddress ||
        this.constants.MARKET_ADDRESS ||
        `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
      {
        viewMethods:
          this.constants.MARKET_CONTRACT_VIEW_METHODS ||
          MARKET_CONTRACT_VIEW_METHODS,
        changeMethods:
          this.constants.MARKET_CONTRACT_CALL_METHODS ||
          MARKET_CONTRACT_CALL_METHODS,
      }
    )

    // @ts-ignore: method does not exist on Contract type
    await contract.make_offer(
      {
        token_key: tokenId,
        price: price,
        timeout: { Hours: TWENTY_FOUR },
      },
      MAX_GAS,
      price
    )
    return formatResponse({ data: true })
  }

  /**
   * Make an offer to a token.
   * @param tokenId
   * @param price
   */
  public async acceptAndTransfer(
    tokenId: string,
    options?: {
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!tokenId) return formatResponse({ error: 'Please provide a tokenId' })

    const contract = new Contract(
      account,
      options?.marketAddress ||
        this.constants.MARKET_ADDRESS ||
        `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
      {
        viewMethods:
          this.constants.MARKET_CONTRACT_VIEW_METHODS ||
          MARKET_CONTRACT_VIEW_METHODS,
        changeMethods:
          this.constants.MARKET_CONTRACT_CALL_METHODS ||
          MARKET_CONTRACT_CALL_METHODS,
      }
    )

    // @ts-ignore: method does not exist on Contract type
    await contract.accept_and_transfer(
      {
        token_key: tokenId,
      },
      MAX_GAS,
      ONE_YOCTO
    )
    return formatResponse({ data: true })
  }

  /**
   *  Withdraw the escrow deposited for an offer.
   * @param tokenKey The token key. `<tokenId>:<contractName>`
   */
  public async withdrawOffer(
    tokenKey: string,
    options?: {
      marketAddress?: string
    }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    const contract = new Contract(
      account,
      options?.marketAddress ||
        this.constants.MARKET_ADDRESS ||
        `0.${this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME}`,
      {
        viewMethods:
          this.constants.MARKET_CONTRACT_VIEW_METHODS ||
          MARKET_CONTRACT_VIEW_METHODS,
        changeMethods:
          this.constants.MARKET_CONTRACT_CALL_METHODS ||
          MARKET_CONTRACT_CALL_METHODS,
      }
    )

    // @ts-ignore: method does not exist on Contract type
    await contract.withdraw_offer({ token_key: tokenKey }, MAX_GAS)
    return formatResponse({ data: true })
  }

  /**
   * Creates a store
   * @param storeId Store name
   * @param symbol Store symbol
   */
  public async deployStore(
    storeId: string,
    symbol: string,
    options?: { attachedDeposit?: string; icon?: string }
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })

    // TODO: regex check inputs (storeId and symbol)

    const contract = new Contract(
      account,
      this.constants.FACTORY_CONTRACT_NAME || FACTORY_CONTRACT_NAME,
      {
        viewMethods:
          this.constants.FACTORY_CONTRACT_VIEW_METHODS ||
          FACTORY_CONTRACT_VIEW_METHODS,
        changeMethods:
          this.constants.FACTORY_CONTRACT_CALL_METHODS ||
          FACTORY_CONTRACT_CALL_METHODS,
      }
    )

    const storeData = {
      owner_id: accountId,
      metadata: {
        spec: 'nft-1.0.0',
        name: storeId.replace(/[^a-z0-9]+/gim, '').toLowerCase(),
        symbol: symbol.replace(/[^a-z0-9]+/gim, '').toLowerCase(),
        icon: options?.icon ?? MINTBASE_32x32_BASE64_DARK_LOGO,
        base_uri: this.constants.BASE_ARWEAVE_URI || BASE_ARWEAVE_URI,
        reference: null,
        reference_hash: null,
      },
    }

    const attachedDeposit = !options?.attachedDeposit
      ? DEPLOY_STORE_COST
      : new BN(options?.attachedDeposit)

    // @ts-ignore: method does not exist on Contract type
    await contract.create_store(storeData, MAX_GAS, attachedDeposit)
    return formatResponse({ data: true })
  }

  /**
   * Mint a token
   * @param amount The number of tokens to mint.
   * @param contractName The contract in which tokens will be minted.
   */
  public async mint(
    amount: number,
    contractName: string,
    royalties?: Royalties,
    splits?: Split,
    category?: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!contractName)
      return formatResponse({ error: 'No contract was provided.' })

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // TODO: Check if minter has a valid object to mint.

    if (!this.minter) return formatResponse({ error: 'Minter not defined.' })

    const { data: metadataId } = await this.minter.getMetadataId()

    const obj = {
      owner_id: accountId,
      metadata: {
        reference: metadataId,
        // TODO: check if category is lowercase
        extra: !category ? null : category,
      },
      num_to_mint: amount,
      royalty_args: !royalties
        ? null
        : { split_between: royalties, percentage: DEFAULT_ROYALTY_PERCENT },
      split_owners: splits || null,
    }

    // @ts-ignore: method does not exist on Contract type
    await contract.mint_tokens(obj, MAX_GAS, ONE_YOCTO)
    return formatResponse({ data: true })
  }

  /**
   * Mint more pieces of tokens of a thing.
   * @param amount The number of tokens to mint.
   * @param id The thing id
   * @param splits The contract in which tokens will be minted.
   */
  public async mintMore(
    amount: number,
    id: string,
    splits?: Split
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId) throw new Error('Account is undefined.')
    if (!this.api) throw new Error('API is not defined.')

    // TODO: move this thing type to a proper place
    const { data, error } = await this.api.custom<{
      thing: {
        metaId: string
        storeId: string
        memo: string
        tokens: {
          royaltyPercent: string
          royaltys: { account: string; percent: string }[]
        }[]
      }[]
    }>(
      `query GET_THING_BY_ID($id: String!) {
      thing(where: {id: {_eq: $id}}) {
        metaId
        storeId
        memo
        tokens {
          royaltyPercent
          royaltys {
            account
            percent
          }
        }
      }
    }
    `,
      { id }
    )

    const { thing: _thing } = data

    if (error || _thing.length === 0) {
      return formatResponse({ error: 'Thing does not exist.' })
    }

    const thing = _thing[0]

    if (thing.tokens.length === 0)
      return formatResponse({ error: 'Thing does not have tokens.' })

    const contractName = thing.storeId
    const memo = thing.memo
    const metaId = thing.metaId
    const token = thing.tokens[0]

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    const _royalties = token.royaltys.reduce(
      (accumulator, { account, percent }) => {
        return {
          ...accumulator,
          [account]: percent,
        }
      },
      {}
    )

    const obj = {
      owner_id: accountId,
      metadata: {
        reference: metaId,
        extra: memo,
      },
      num_to_mint: amount,
      royalty_args:
        Object.keys(_royalties).length > 0
          ? {
              split_between: _royalties,
              percentage: token.royaltyPercent,
            }
          : null,
      split_owners: splits || null,
    }

    // @ts-ignore: method does not exist on Contract type
    await contract.mint_tokens(obj, MAX_GAS, ONE_YOCTO)
    // TODO: define a response for this
    return formatResponse({ data: true })
  }

  public async grantMinter(
    minterAccountId: string,
    contractName: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!contractName)
      return formatResponse({ error: 'No contract was provided.' })

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.grant_minter(
      { account_id: minterAccountId },
      MAX_GAS,
      ONE_YOCTO
    )
    // TODO: define a response for this
    return formatResponse({ data: true })
  }

  public async revokeMinter(
    minterAccountId: string,
    contractName: string
  ): Promise<ResponseData<boolean>> {
    const account = this.activeWallet?.account()
    const accountId = this.activeWallet?.account().accountId

    if (!account || !accountId)
      return formatResponse({ error: 'Account is undefined.' })
    if (!contractName)
      return formatResponse({ error: 'No contract was provided.' })

    const contract = new Contract(account, contractName, {
      viewMethods:
        this.constants.STORE_CONTRACT_VIEW_METHODS ||
        STORE_CONTRACT_VIEW_METHODS,
      changeMethods:
        this.constants.STORE_CONTRACT_CALL_METHODS ||
        STORE_CONTRACT_CALL_METHODS,
    })

    // @ts-ignore: method does not exist on Contract type
    await contract.revoke_minter(
      { account_id: minterAccountId },
      MAX_GAS,
      ONE_YOCTO
    )
    // TODO: define a response for this
    return formatResponse({ data: true })
  }

  public async setSessionKeyPair(
    accountId: string,
    privateKey: string
  ): Promise<ResponseData<KeyStore>> {
    if (!this.keyStore)
      return formatResponse({ error: 'KeyStore not defined.' })

    this.keyStore.setKey(
      this.networkName,
      accountId,
      KeyPair.fromString(privateKey)
    )

    return formatResponse({ data: this.keyStore })
  }

  public async getSessionKeyPair(): Promise<ResponseData<KeyPair>> {
    const accountId = this.activeWallet?.getAccountId()

    if (!accountId) return formatResponse({ error: 'accountId is undefined' })

    if (!this.keyStore)
      return formatResponse({ error: 'KeyStore not defined.' })

    const data = await this.keyStore?.getKey(this.networkName, accountId)
    return formatResponse({ data })
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
  public getLocalAccounts(): ResponseData<{
    [accountId: string]: { accountId?: string; contractName?: string }
  }> {
    const regex = /near-api-js:keystore:/
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

    return formatResponse({ data: accounts })
  }

  /**
   * Fetch transaction result given a transaction hash.
   * @param txHash the transaction's hash
   * @returns the transaction result
   */
  public async fetchTransactionResult(
    txHash: string
  ): Promise<ResponseData<FinalExecutionOutcome>> {
    const connection = this.activeNearConnection?.connection
    if (!connection) throw new Error('Near connection is undefined.')

    const accountId = this.activeWallet?.account().accountId
    if (!accountId) throw new Error('Account Id is undefined.')

    const decodeHash = utils.serialize.base_decode(txHash)

    const txResult = await connection.provider.txStatus(decodeHash, accountId)

    return formatResponse({ data: txResult })
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
    if (!this.nearConfig) throw new Error('NEAR Config not defined.')

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
  ): Promise<ResponseData<any>> => {
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
    return formatResponse({ data: result })
  }

  /**
   * Fetch list of access keys for a given account
   * @param accountId account id
   * @returns List of access keys
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public viewAccessKeyList = async (
    accountId: string
  ): Promise<ResponseData<any>> => {
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
    return formatResponse({ data: result })
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
  ): Promise<ResponseData<any>> => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'tx',
    })

    return formatResponse({ data: result })
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
  ): Promise<ResponseData<any>> => {
    const result = await this.rpcCall({
      body: {
        params: [transactionHash, accountId],
      },
      method: 'EXPERIMENTAL_tx_status',
    })

    return formatResponse({ data: result })
  }

  /**
   * Get NEAR configuration object. Defaults to testnet.
   * @param networkName
   * @param contractAddress
   */
  private getNearConfig(
    networkName: Network,
    contractAddress?: string
  ): NEARConfig {
    switch (networkName) {
      case Network.testnet:
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName:
            contractAddress ||
            this.constants?.FACTORY_CONTRACT_NAME ||
            FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
        }

      case Network.mainnet:
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          contractName:
            contractAddress ||
            this.constants?.FACTORY_CONTRACT_NAME ||
            FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.mainnet.near.org',
          helperUrl: 'https://helper.mainnet.near.org',
        }
      default:
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName:
            contractAddress ||
            this.constants?.FACTORY_CONTRACT_NAME ||
            FACTORY_CONTRACT_NAME,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
        }
    }
  }
}
