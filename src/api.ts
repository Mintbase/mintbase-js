import 'isomorphic-unfetch'
import { request } from 'graphql-request'

import { MintbaseAPIConfig, Network, Chain, List } from './types'
import { API_BASE_NEAR_MAINNET, BASE_ARWEAVE_URI } from './constants'
import { FETCH_MARKETPLACE } from './queries'

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

  public async fetchThing() {}

  public async fetchToken() {}

  public async fetchArweave(id: string) {
    const request = await fetch(`${BASE_ARWEAVE_URI}/${id}`)
    const result = await request.json()
    return result
  }

  public async isOwner(tokenId: string, accountAddress: string) {}

  public async customQuery(query: string, variables: any) {}
}
