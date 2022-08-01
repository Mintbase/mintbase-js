/**
 * @jest-environment jsdom
 */

import { getFileExtension } from '../../src/utils/files'

describe('unit test - file utils', () => {
  test('get file extension', () => {
    const name = `filename`
    const extension = `extension`
    const filename = `${name}.${extension}`

    const file = new File([''], filename, { type: 'text/plain' })
    const fileExtension = getFileExtension(file.name)

    expect(fileExtension).toBe('extension')
  })

  // test('set mime type', async () => {
  //   const name = `filename`
  //   const extension = `extension`

  //   const filename = `${name}.${extension}`

  //   const file = new File([''], filename, { type: 'text/plain' })

  //   console.log([new Blob([new ArrayBuffer(1024 * 1024)])])

  //   const transformedFile = await setMimeType('application/json', file)

  //   expect(transformedFile.type).toBe(file.type)
  // })

  // test('fails with file with no extension', () => {
  //   expect(async () => {
  //     const name = `sdfs`

  //     const file = new File([''], name, { type: 'text/plain' })

  //     try {
  //       await correctFileType(file)
  //     } catch (error) {
  //       throw new Error(error.message)
  //     }
  //   }).toThrow(ERROR_MESSAGES.fileNoExtension)
  // })
})
