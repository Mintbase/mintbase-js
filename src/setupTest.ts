import nock from 'nock'
import { API_BASE_NEAR_TESTNET } from './constants'
import 'isomorphic-unfetch'

export const apiNearMock = nock(`${API_BASE_NEAR_TESTNET}/api/rest`)
export const arweaveMock = nock('https://arweave.net')
