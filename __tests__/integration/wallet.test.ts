import { Wallet } from '../../src/index'
import { Network, Chain } from '../../src/types'
import { STORE_FACTORY_CONTRACT_NAME } from '../../src/constants'

const wallet = new Wallet({
  networkName: Network.main,
  chain: Chain.near,
})

describe('integration test - wallet', () => {
  test('Logs in', async () => {
    const asd = await wallet.connect()
  })
})
