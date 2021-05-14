import { API } from '../../src/api'
import { Constants } from '../../src/types'
import { apiNearMock, arweaveMock } from '../../src/setupTest'
import { thingByIdMock, arweaveReplyMock } from '../../src/mocks'

describe('api', () => {
  const constants: Constants = {}
  arweaveMock.get(`/${thingByIdMock.thing[0].metaId}`).reply(200, arweaveReplyMock)
  const api = new API({ constants })

  test('fetchThingMetadata: should return ResponseData with arweave metadata', async () => {
    const thingId = 'id'
    apiNearMock.get(`/things/${thingId}`).reply(200, thingByIdMock)

    const result = await api.fetchThingMetadata('id')
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
