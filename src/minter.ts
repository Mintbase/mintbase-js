import {
  BASE_ARWEAVE_URI,
  FILE_UPLOAD_SIZE_LIMIT,
  REGEX_URL,
  VALID_FILE_FORMATS,
  ERROR_MESSAGES,
} from './constants'
import { Constants, MetadataField } from './types'
import { correctFileType } from './utils/files'
import { Storage } from './utils/storage'

interface MinterConfigProps {
  apiKey?: string
  constants?: Constants
}

/**
 * A programmatic metadata generator.
 */
export class Minter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public latestMints: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public currentMint: any

  public storage: Storage | undefined

  public apiKey: string
  public constants: Constants

  constructor(minterConfig: MinterConfigProps = {}) {
    this.latestMints = {}
    this.currentMint = {}

    this.constants = minterConfig.constants || {}
    this.apiKey = minterConfig.apiKey || 'anonymous'

    this.storage = new Storage({
      apiKey: this.apiKey,
      constants: this.constants,
    })
  }

  /**
   * Uploads the current metadata object and returns its content identifier.
   */
  public async getMetadataId(): Promise<string> {
    if (
      this.currentMint &&
      Object.keys(this.currentMint).length === 0 &&
      this.currentMint.constructor === Object
    )
      throw new Error(ERROR_MESSAGES.metadataEmpty)

    if (!this.storage) throw new Error('Storage not initialized')

    const id = await this.storage.uploadMetadata(this.currentMint)

    this.latestMints = { ...this.latestMints, [id]: this.currentMint }
    this.currentMint = {}

    return id
  }

  /**
   * Set a field in metadata.
   * @param key The field key.
   * @param value The field value.
   */
  public setField(
    key: MetadataField,
    value: unknown,
    override?: boolean
  ): void {
    try {
      this.fieldChecks(key, value)
    } catch (error) {
      throw new Error(error.message)
    }

    if (!this.currentMint[key]) this.currentMint[key] = value
    else if (override && !!this.currentMint[key]) this.currentMint[key] = value
  }

  public setMetadata(metadata: any, override?: boolean): void {
    try {
      Object.keys(metadata).forEach((field) => {
        this.setField(field as MetadataField, metadata[field], override)
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Uploads file and sets its corresponding URI to a field.
   * @param field The metadata field.
   * @param file The file to upload.
   */
  public async uploadField(field: string, file: File): Promise<void> {
    if (!VALID_FILE_FORMATS[field].includes(file.type))
      throw new Error(ERROR_MESSAGES.fileTypeNotAccepted)

    try {
      const url = await this.upload(file)

      this.currentMint[field] = url
    } catch (error) {
      throw new Error(ERROR_MESSAGES.uploadFileAndSet)
    }
  }

  /**
   * Uploads file and returns corresponding URI.
   * @param file The file to upload.
   */
  public async upload(
    file: File
  ): Promise<{
    data: { uri: string; hash: string } | null
    error: null | string
  }> {
    try {
      if (!this.storage) throw new Error('Storage not initialized')

      // corrects MIME type.
      const tFile = await correctFileType(file)

      if (
        tFile.size >
        (this.constants.FILE_UPLOAD_SIZE_LIMIT || FILE_UPLOAD_SIZE_LIMIT)
      )
        throw new Error(ERROR_MESSAGES.fileSizeExceeded)

      const result = await this.storage.uploadToArweave(file)

      return {
        data: {
          uri: `${this.constants.BASE_ARWEAVE_URI || BASE_ARWEAVE_URI}/${
            result?.id
          }`,
          hash: result?.id,
        },
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error.message,
      }
    }
  }

  // TODO: implement all checks
  private fieldChecks(key: MetadataField, value: any): void {
    switch (key) {
      // case MetadataField.Youtube_url:
      //   if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
      //   if (!value.match(REGEX_URL)) throw new Error(ERROR_MESSAGES.badUrl)
      //   break

      case MetadataField.Image:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        if (!value.match(REGEX_URL)) throw new Error(ERROR_MESSAGES.badUrl)
        break

      case MetadataField.Name:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        break

      case MetadataField.Description:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        break

      default:
        break
    }
  }
}
