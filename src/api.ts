import 'isomorphic-unfetch'
import { request } from 'graphql-request'
import { MintbaseAPIConfig, Network, Chain, Token } from './types'
import { API_BASE_NEAR_MAINNET, BASE_ARWEAVE_URI } from './constants'
import {
  FETCH_MARKETPLACE,
  GET_LATEST_LIST,
  GET_TOKENS_BY_OWNER_ID,
  GET_TOKEN_BY_ID,
} from './queries'

export class MintbaseAPI {
  public readonly apiBaseUrl: string

  public logger: (arg: string) => void

  public readonly defaultLimit: number = 10

  public chainName: string = Chain.near
  public networkName: string = Network.testnet

  constructor(config: MintbaseAPIConfig, logger?: (arg: string) => void) {
    switch (config.chain) {
      case Chain.near:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_NEAR_MAINNET
        this.chainName = Chain.near
        break
      default:
        this.apiBaseUrl = config.apiBaseUrl || API_BASE_NEAR_MAINNET
        this.chainName = config.chain
        break
    }

    this.logger = logger || ((arg: string) => arg)
  }

  /**
   * Fetches the marketplace and each token's metadata.
   * @param limit
   * @param offset
   */
  public async fetchMarketplace(limit?: number, offset?: number): Promise<any> {
    const listings = await request(this.apiBaseUrl, FETCH_MARKETPLACE, {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const promises = listings.list.map(async (list: any) => {
      const metadata = await this.fetchArweave(list.token.thingId)

      return { ...list, metadata: metadata }
    })

    const result = await Promise.all(promises)

    return result
  }

  /**
   * Fetches token metadata.
   * @param tokenId the token identifier
   *
   * @returns token metadata
   */
  public async fetchMetadata(tokenId: string, storeId: string) {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: `${tokenId}:${storeId}`,
    })

    if (result.token.length === 0)
      throw new Error(`${tokenId} is not a valid token.`)

    const token = result.token[0]

    const metadata = await this.fetchArweave(token.thingId)

    return metadata
  }

  /**
   * Fetches lists w/ no metadata.
   * @param limit
   * @param offset
   */
  public async fetchLists(id: string) {
    const list = await request(this.apiBaseUrl, GET_LATEST_LIST, {
      groupId: id,
    })

    return list
  }

  public async fetchThing() {
    throw new Error('Not yet implemented')
  }

  public async fetchToken(tokenId: number, storeId: string): Promise<Token> {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: `${tokenId}:${storeId}`,
    })

    if (result.token.length === 0)
      throw new Error(`${tokenId} is not a valid token`)

    const token = result.token[0]

    return token
  }

  public async fetchArweave(id: string) {
    const request = await fetch(`${BASE_ARWEAVE_URI}/${id}`)
    const result = await request.json()
    return result
  }

  public async fetchOwnerTokens(accountId: string) {
    const result = await request(this.apiBaseUrl, GET_TOKENS_BY_OWNER_ID, {
      ownerId: accountId,
    })

    return result.token
  }

  public async isOwner(tokenId: number, accountAddress: string) {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: tokenId,
    })

    if (result.token.length === 0) return false

    const token = result.token[0]

    return token.ownerId === accountAddress
  }

  public async custom(query: string, variables: any) {
    const result = await request(this.apiBaseUrl, query, variables)
    return result
  }
}
