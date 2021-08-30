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
import { formatResponse, ResponseData } from './utils/responseBuilder'

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
  public async getMetadataId(): Promise<ResponseData<string>> {
    if (
      this.currentMint &&
      Object.keys(this.currentMint).length === 0 &&
      this.currentMint.constructor === Object
    )
      return formatResponse({ error: ERROR_MESSAGES.metadataEmpty })

    if (!this.storage)
      return formatResponse({ error: 'Storage not initialized' })

    const { data: uploadResult, error } = await this.storage.uploadMetadata(
      this.currentMint
    )

    if (error) return formatResponse({ error })

    const { id } = uploadResult

    this.latestMints = { ...this.latestMints, [id]: this.currentMint }
    this.currentMint = {}

    return formatResponse({ data: id })
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
  ): ResponseData<boolean> {
    try {
      this.fieldChecks(key, value)
    } catch (error: any) {
      return formatResponse({ error: error.message })
    }

    if (!this.currentMint[key]) this.currentMint[key] = value
    else if (override && !!this.currentMint[key]) this.currentMint[key] = value

    return formatResponse({ data: true })
  }

  public setMetadata(metadata: any, override?: boolean): ResponseData<boolean> {
    try {
      Object.keys(metadata).forEach((field) => {
        this.setField(field as MetadataField, metadata[field], override)
      })
      return formatResponse({ data: true })
    } catch (error: any) {
      return formatResponse({ error: error.message })
    }
  }

  /**
   * Uploads file and sets its corresponding URI to a field.
   * @param field The metadata field.
   * @param file The file to upload.
   */
  public async uploadField(
    field: MetadataField,
    file: File
  ): Promise<ResponseData<boolean>> {
    if (!VALID_FILE_FORMATS[field]?.includes(file.type))
      return formatResponse({ error: ERROR_MESSAGES.fileTypeNotAccepted })

    try {
      const { data, error } = await this.upload(file)

      if (error)
        return formatResponse({ error: ERROR_MESSAGES.uploadFileAndSet })

      const { uri, hash } = data

      const { hash: keyHash, url: keyUrl } =
        _determineUploadMetadataFields(field)

      if (keyHash && keyUrl) {
        this.currentMint[keyUrl] = uri
        this.currentMint[keyHash] = hash
      } else {
        this.currentMint[field] = uri
        this.currentMint[`${field}_hash`] = hash
      }

      return formatResponse({ data: true })
    } catch (error) {
      return formatResponse({ error: ERROR_MESSAGES.uploadFileAndSet })
    }
  }

  /**
   * Uploads file and returns corresponding URI.
   * @param file The file to upload.
   */
  public async upload(
    file: File
  ): Promise<ResponseData<{ uri: string; hash: string }>> {
    try {
      if (!this.storage) {
        return formatResponse({ error: 'Storage not initialized' })
      }

      // corrects MIME type.
      const tFile = await correctFileType(file)

      if (
        tFile.size >
        (this.constants.FILE_UPLOAD_SIZE_LIMIT || FILE_UPLOAD_SIZE_LIMIT)
      ) {
        formatResponse({ error: 'Storage not initialized' })
      }

      const { data: result, error } = await this.storage.uploadToArweave(file)

      if (!result || error) return formatResponse({ error })

      const data = {
        uri: `${this.constants.BASE_ARWEAVE_URI || BASE_ARWEAVE_URI}/${
          result?.id
        }`,
        hash: result?.id,
      }

      return formatResponse({ data })
    } catch (error: any) {
      return formatResponse({ error: error.message })
    }
  }

  // TODO: implement all checks
  private fieldChecks(key: MetadataField, value: any): void {
    switch (key) {
      case MetadataField.Media:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        if (!value.match(REGEX_URL)) throw new Error(ERROR_MESSAGES.badUrl)
        break

      case MetadataField.Title:
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

const _determineUploadMetadataFields: (type: MetadataField) => {
  url: string | null
  hash: string | null
} = (type) => {
  switch (type) {
    case MetadataField.Media:
    case MetadataField.Media_hash:
      return { url: MetadataField.Media, hash: MetadataField.Media_hash }

    case MetadataField.Animation_url:
    case MetadataField.Animation_hash:
      return {
        url: MetadataField.Animation_url,
        hash: MetadataField.Animation_hash,
      }

    default:
      return { url: null, hash: null }
  }
}
