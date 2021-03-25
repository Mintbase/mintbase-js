import 'isomorphic-unfetch'
import { request } from 'graphql-request'

import { MintbaseAPIConfig, Network, Chain, List, Token } from './types'
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
   * Fetch the marketplace
   * @param limit
   * @param offset
   */
  public async fetchMarketplace(limit?: number, offset?: number): Promise<any> {
    const result = await request(this.apiBaseUrl, FETCH_MARKETPLACE, {
      limit: limit || this.defaultLimit,
      offset: offset || 0,
    })

    const promises = result.list.map(async (element: any) => {
      const nft = await this.fetchArweave(element.token.thingId)
      return nft
    })

    const done = await Promise.all(promises)
    return done
  }

  public async fetchLists(id: string) {
    const list = await request(this.apiBaseUrl, GET_LATEST_LIST, {
      groupId: id,
    })

    return list
  }

  public async fetchThing() {}

  public async fetchToken(tokenId: string): Promise<Token> {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: tokenId,
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

  public async isOwner(tokenId: string, accountAddress: string) {
    const result = await request(this.apiBaseUrl, GET_TOKEN_BY_ID, {
      tokenId: tokenId,
    })

    if (result.token.length === 0) return false

    const token = result.token[0]

    return token.ownerId === accountAddress
  }

  public async fetchOwnerTokens(accountId: string) {
    const result = await request(this.apiBaseUrl, GET_TOKENS_BY_OWNER_ID, {
      ownerId: accountId,
    })

    return result.token
  }

  public async customQuery(query: string, variables: any) {}
}
