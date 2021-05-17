import { API } from '../../src/api'
import { Constants } from '../../src/types'
import { apiNearMock, arweaveMock } from '../../src/setupTest'
import {
  thingByIdMock,
  arweaveReplyMock,
  marketplaceAPIResponseMock,
  fetchMarketplaceReplyMock,
} from '../../src/mocks'

describe('api', () => {
  const constants: Constants = {}
  const api = new API({ constants })
  arweaveMock
    .persist()
    .get(/\/[-_0-9a-zA-Z]+/g)
    .reply(200, arweaveReplyMock)

  test('fetchMarketplace: should return ResponseData with arweave metadata', async () => {
    apiNearMock
      .get('/marketplace')
      .query({ limit: 20, offset: 0 })
      .reply(200, marketplaceAPIResponseMock)

    const result = await api.fetchMarketplace()
    const expectedResult = { data: fetchMarketplaceReplyMock, error: '' }

    expect(result).toStrictEqual(expectedResult)
  })

  test('fetchThingMetadata: should return ResponseData with arweave metadata', async () => {
    const thingId = 'id'
    apiNearMock.get(`/things/${thingId}`).reply(200, thingByIdMock)

    const result = await api.fetchThingMetadata(thingId)
    const expectedResult = { data: arweaveReplyMock, error: '' }

    expect(result).toStrictEqual(expectedResult)
  })

  test('fetchThingMetadata: should return ResponseData with error', async () => {
    const thingId = 'id'
    apiNearMock.get(`/things/${thingId}`).reply(404, { thing: [] })
    const result = await api.fetchThingMetadata('id')
    const expectedResult = {
      data: {},
      error: `${thingId} is not a valid thing.`,
    }

    expect(result).toStrictEqual(expectedResult)
  })
})
