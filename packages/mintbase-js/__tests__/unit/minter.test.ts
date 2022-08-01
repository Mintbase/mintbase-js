import { Minter } from '../../src/minter'
import { MetadataField } from '../../src/types'
import { ERROR_MESSAGES } from '../../src/constants'

const VALID_URL = 'https://url.test'
const INVALID_URL = 'INVALID_URL'

describe('unit test - minter', () => {
  test('set valid image metadata field', () => {
    const minter = new Minter()

    minter.setField(MetadataField.Media, VALID_URL)
    expect(minter.currentMint[MetadataField.Media]).toBe(VALID_URL)
  })

  test('set invalid image metadata field', () => {
    const minter = new Minter()
    const { error } = minter.setField(MetadataField.Media, INVALID_URL)
    expect(error).toBe(ERROR_MESSAGES.badUrl)
  })

  test('set field', () => {
    const minter = new Minter()

    minter.setField(MetadataField.Tags, 'test')
    expect(minter.currentMint[MetadataField.Tags]).toBe('test')
  })

  test('reset field not overriding', () => {
    const minter = new Minter()

    minter.setField(MetadataField.Tags, 'test_1')
    minter.setField(MetadataField.Tags, 'test_2')
    expect(minter.currentMint[MetadataField.Tags]).toBe('test_1')
  })

  test('reset field overriding', () => {
    const minter = new Minter()

    minter.setField(MetadataField.Tags, 'test_1')
    minter.setField(MetadataField.Tags, 'test_2', true)
    expect(minter.currentMint[MetadataField.Tags]).toBe('test_2')
  })

  test('set metadata', () => {
    const minter = new Minter()
    const metadata = { hello: 'asd', world: 123 }

    minter.setMetadata(metadata)
    expect(minter.currentMint).toStrictEqual(metadata)
  })

  test('reset metadata not overriding', () => {
    const minter = new Minter()
    const metadata_1 = { hello: 'asd', world: 123 }

    minter.setMetadata(metadata_1)

    const metadata_2 = { hello: 'qwe', world: 456 }
    minter.setMetadata(metadata_2)
    expect(minter.currentMint).toStrictEqual(metadata_1)
  })

  test('reset metadata overriding', () => {
    const minter = new Minter()
    const metadata_1 = { hello: 'asd', world: 123 }

    minter.setMetadata(metadata_1)

    const metadata_2 = { hello: 'qwe', world: 456 }
    minter.setMetadata(metadata_2, true)
    expect(minter.currentMint).toStrictEqual(metadata_2)
  })
})
