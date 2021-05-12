import 'isomorphic-unfetch'
import { request } from 'graphql-request'
import urlcat from 'urlcat'

import { MintbaseAPIConfig, Network, Chain, Constants } from './types'
import { API_BASE_NEAR_MAINNET, API_BASE_NEAR_TESTNET } from './constants'
import { formatResponse, ResponseData } from './utils/responseBuilder'

/**
 * Mintbase API.
 * Main entry point for users read Mintbase data.
 */
export class API {
  public apiBaseUrl: string = API_BASE_NEAR_TESTNET
  public defaultLimit = 20
  public chainName: string = Chain.near
  public networkName: Network | undefined

  public constants: Constants

  constructor(apiConfig: MintbaseAPIConfig) {
    this.constants = apiConfig.constants

    this.networkName = apiConfig.networkName || Network.testnet

    switch (apiConfig.chain) {
      case Chain.near:
        if (this.networkName === Network.testnet) {
          this.apiBaseUrl =
            this.constants.API_BASE_NEAR_TESTNET ||
            apiConfig.apiBaseUrl ||
            API_BASE_NEAR_TESTNET
        } else if (this.networkName === Network.mainnet) {
          this.apiBaseUrl =
            this.constants.API_BASE_NEAR_MAINNET ||
            apiConfig.apiBaseUrl ||
            API_BASE_NEAR_MAINNET
        }
        this.chainName = Chain.near
        break
      default:
        this.apiBaseUrl =
          this.constants.API_BASE_NEAR_TESTNET ||
          apiConfig.apiBaseUrl ||
          API_BASE_NEAR_TESTNET
        this.chainName = apiConfig.chain || Chain.near
        break
    }
  }

  /**
   * Fetch marketplace and each token's metadata (w/ cursor offset pagination enabled).
   * @param limit number of results
   * @param offset number of records to skip
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchMarketplace(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/marketplace', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    console.log(url)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises = result.list.map(async (list: any) => {
      const baseUri = list.token.thing.store.baseUri
      const metaId = list.token.thing.metaId
      const metadataUri = urlcat(baseUri, metaId)
      const metadata = await this.fetchMetadata(metadataUri)

      return { ...list, metadata: metadata }
    })

    const data = await Promise.all(promises)

    return formatResponse({ data })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchAccount(accountId: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/accounts/:accountId', {
      accountId: accountId,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  public async fetchTokenApprovals(
    tokenKey: string,
    contractAddress: string
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/token-approvals', {
      accountId: contractAddress,
      tokenKey: tokenKey,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  public async fetchApprovals(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/approvals/', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  /**
   * Fetch thing metadata.
   * @param thingId Thing Id
   * @returns token metadata
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchThingMetadata(thingId: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/things/:id', {
      id: thingId,
    })

    const response = await fetch(url)
    const result = await response.json()

    if (result.thing.length === 0)
      return formatResponse({ error: `${thingId} is not a valid thing.` })

    const thing = result.token[0]

    const metadataUri = urlcat(thing.store.baseUri, thing.metaId)
    const metadata = await this.fetchMetadata(metadataUri)

    return formatResponse({ data: metadata })
  }

  /**
   * Fetch list by id.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchListById(id: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/lists/:id', {
      id: id,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchLists(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/lists/', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  /**
   * Fetch thing by Id
   * TODO: Not yet implemented
   */
  public async fetchThingById(thingId: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/things/:id', {
      id: thingId,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  /**
   * Fetch thing.
   */
  public async fetchThings(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/things/', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  /**
   * Fetch token
   * @param tokenId token id
   * @returns the token data
   */
  public async fetchTokenById(tokenId: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/tokens/:id', {
      id: tokenId,
    })

    const response = await fetch(url)
    const result = await response.json()

    if (result.token.length === 0)
      return formatResponse({ error: `${tokenId} is not a valid token` })

    const token = result.token[0]

    return formatResponse({ data: token })
  }

  public async fetchTokens(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/tokens/', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  public async fetchStoreById(storeId: string): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/stores/:id/', {
      id: storeId,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  public async fetchStores(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/stores/', {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  public async fetchCategories(): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/categories/')

    const response = await fetch(url)
    const result = await response.json()

    const categories = result.thing.map(
      (category: { memo: any }) => category.memo
    )

    return formatResponse({ data: categories })
  }

  public async fetchStats(): Promise<ResponseData<any>> {
    const url = urlcat(`${this.apiBaseUrl}/api/rest/`, '/stats/')

    const response = await fetch(url)
    const result = await response.json()

    return formatResponse({ data: result })
  }

  /**
   * Checks whether account owns a token or not.
   * @param tokenId token id
   * @param accountId account id
   * @returns whether an account owns a token or not.
   */
  public async isTokenOwner(
    accountId: string,
    tokenKey: string
  ): Promise<ResponseData<boolean>> {
    const { data: token } = await this.fetchTokenById(tokenKey)

    if (!token) {
      return formatResponse({ data: false })
    }

    const data = token?.ownerId === accountId

    return formatResponse({ data })
  }

  /**
   * Fetch metadata from Arweave
   * @param id arweave content identifier
   * @returns metadata
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchMetadata(url: string): Promise<ResponseData<any>> {
    const request = await fetch(url)
    const data = await request.json()
    return formatResponse({ data })
  }

  /**
   * Makes custom GraphQL query
   * @param query custom GraphQL query
   * @param variables object with variables passed to the query
   * @returns result of query
   */
  public async custom<T>(
    query: string,
    variables?: unknown
  ): Promise<ResponseData<T>> {
    const { data, error } = await request(
      `${this.apiBaseUrl}/v1/graphql`,
      query,
      variables
    )

    return formatResponse({ data, error })
  }
}
