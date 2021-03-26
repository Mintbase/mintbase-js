import { MintbaseAPI } from '../../src/index'
import { Network, Chain } from '../../src/types'
import { API_BASE_NEAR_MAINNET } from '../../src/constants'

const client = new MintbaseAPI({ networkName: Network.main, chain: Chain.near })

describe('unit test - api', () => {
  test('API has correct base url', () => {
    expect(client.apiBaseUrl).toBe(API_BASE_NEAR_MAINNET)
  })
})
