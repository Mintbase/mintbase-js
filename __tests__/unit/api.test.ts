import { API } from '../../src/index'
import { Network, Chain } from '../../src/types'
import { API_BASE_NEAR_MAINNET } from '../../src/constants'

const client = new API({ networkName: Network.main, chain: Chain.near })

describe('unit test - api', () => {
  test('API has correct base url', () => {
    expect(client.apiBaseUrl).toBe(API_BASE_NEAR_MAINNET)
  })
})
