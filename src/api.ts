import 'isomorphic-unfetch'
import { request } from 'graphql-request'
import { MintbaseAPIConfig, Network, Chain, Token, Constants } from './types'
import {
  API_BASE_NEAR_MAINNET,
  API_BASE_NEAR_TESTNET,
  BASE_ARWEAVE_URI,
} from './constants'
import {
  FETCH_MARKETPLACE,
  GET_LATEST_LIST,
  GET_TOKENS_BY_OWNER_ID,
  GET_TOKEN_BY_ID,
} from './queries'
import { formatResponse, ResponseData } from './utils/responseBuilder'

/**
 * Mintbase API.
 * Main entry point for users read Mintbase data.
 */
export class API {
  public apiBaseUrl: string = API_BASE_NEAR_TESTNET
  public defaultLimit = 10
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
  public async fetchMarketplace(limit?: number, offset?: number): Promise<any> {
    const listings = await request(this.apiBaseUrl, FETCH_MARKETPLACE, {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises = listings.list.map(async (list: any) => {
      const metadata = await this.fetchMetadata(list.token.thingId)

      return { ...list, metadata: metadata }
    })

    const result = await Promise.all(promises)

    return result
  }

  /**
   * Fetch token metadata.
   * @param tokenId token id
   * @returns token metadata
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchTokenMetadata(
    tokenId: string,
    storeId: string
  ): Promise<any> {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: `${tokenId}:${storeId}`,
    })

    if (result.token.length === 0)
      return formatResponse({ error: `${tokenId} is not a valid token.` })
      // throw new Error(`${tokenId} is not a valid token.`)

    const token = result.token[0]

    const metadata = await this.fetchMetadata(token.thingId)

    return formatResponse({ data: metadata })
  }

  /**
   * Fetch lists without metadata.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchLists(id: string): Promise<any> {
    const list = await request(this.apiBaseUrl, GET_LATEST_LIST, {
      groupId: id,
    })

    return list
  }

  /**
   * Fetch thing.
   * TODO: Not yet implemented
   */
  public async fetchThing(): Promise<void> {
    throw new Error('Not yet implemented.')
  }

  /**
   * Fetch token
   * @param tokenId token id
   * @param storeId store id
   * @returns the token
   */
  public async fetchToken(tokenId: number, storeId: string): Promise<ResponseData<Token>> {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: `${tokenId}:${storeId}`,
    })

    if (result.token.length === 0)
      return formatResponse({ error: `${tokenId} is not a valid token` })
      // throw new Error(`${tokenId} is not a valid token`)

    const token = result.token[0]

    return formatResponse({ data: token })
  }

  /**
   * Fetch metadata from Arweave
   * @param id arweave content identifier
   * @returns metadata
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchMetadata(id: string): Promise<any> {
    const request = await fetch(
      `${this.constants.BASE_ARWEAVE_URI || BASE_ARWEAVE_URI}/${id}`
    )
    const result = await request.json()
    return result
  }

  /**
   * Fetch account owned tokens
   * @param accountId account id
   * @returns list of tokens
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchOwnerTokens(accountId: string): Promise<any> {
    const result = await request(this.apiBaseUrl, GET_TOKENS_BY_OWNER_ID, {
      ownerId: accountId,
    })

    return result.token
  }

  /**
   * Checks whether account owns a token or not.
   * @param tokenId token id
   * @param accountId account id
   * @returns whether an account owns a token or not.
   */
  public async isOwner(tokenId: number, accountId: string): Promise<boolean> {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: tokenId,
    })

    if (result.token.length === 0) return false

    const token = result.token[0]

    return token.ownerId === accountId
  }

  /**
   * Makes custom GraphQL query
   * @param query custom GraphQL query
   * @param variables object with variables passed to the query
   * @returns result of query
   */
  public async custom(query: string, variables?: unknown): Promise<unknown> {
    const result = await request(this.apiBaseUrl, query, variables)
    return result
  }
}
