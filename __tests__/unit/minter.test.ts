import { Minter } from '../../src/minter'
import { MetadataField } from '../../src/types'
import { ERROR_MESSAGES } from '../../src/constants'

const minter = new Minter()

const VALID_URL = 'https://url.test'
const INVALID_URL = 'INVALID_URL'

describe('unit test - minter', () => {
  test('set valid image metadata field', () => {
    minter.setField(MetadataField.Image, VALID_URL)
    expect(minter.currentMint[MetadataField.Image]).toBe(VALID_URL)
  })

  test('set invalid image metadata field', () => {
    expect(() => {
      minter.setField(MetadataField.Image, INVALID_URL)
    }).toThrow(ERROR_MESSAGES.badUrl)
  })

  test('set field', () => {
      minter.setField(MetadataField.Tags, 'test')
      expect(minter.currentMint[MetadataField.Tags]).toBe('test')
  })
})
