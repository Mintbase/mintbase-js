import { API } from '../../src/index'
import { Network, Chain } from '../../src/types'

const client = new API({ networkName: Network.main, chain: Chain.near })

describe('integration test - api', () => {
  test('API fetches arweave metadata from id', async () => {
    const metadata = await client.fetchArweave(
      'cE11nA7dqUTlyI6jAQQbLRgXODMtANANVKhE1gQQiTE'
    )

    expect(metadata.name).toBe('AI Bot Reward')
    expect(metadata.forSale).toBe(true)
    // TODO: need to check more?
  })

  /*test('API fetches marketplace listing', async () => {
    const list = await client.fetchMarketplace()

    expect(list).toBe(typeof 'object')
  })

  test('', async () => {})
  test('', async () => {})*/
})
